package main

import (
	"log"
	"time"

	"messanger-backend/internal/config"
	"messanger-backend/internal/handlers"
	"messanger-backend/internal/middleware"
	"messanger-backend/internal/repository"
	"messanger-backend/internal/server"
	"messanger-backend/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const enableMigrations = true

func main() {

	cfg := config.LoadConfig()

	db, err := repository.NewPostgresDB(cfg)
	if err != nil {
		log.Fatal("db error:", err)
	}

	if enableMigrations {
		if err := repository.RunMigrations(db); err != nil {
			log.Println("migration warning:", err)
		}
	}

	// ---------- USER LAYER ----------

	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	// ---------- CHAT LAYER ----------

	chatRepo := repository.NewChatRepository(db)
	chatService := service.NewChatService(chatRepo, userRepo)
	chatHandler := handlers.NewChatHandler(chatService)

	// ---------- MESSAGE LAYER ----------

	messageHandler := handlers.NewMessageHandler(chatService)

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	r.Use(gin.Logger(), gin.Recovery())

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}))

	// ---------- OPENAPI ----------

	r.GET("/openapi.yaml", func(c *gin.Context) {
		c.File("openapi/openapi.yaml")
	})

	docs := r.Group("/docs")
	{
		docs.GET("/swagger", func(c *gin.Context) {
			c.File("docs/swagger.html")
		})
		docs.GET("/redoc", func(c *gin.Context) {
			c.File("docs/redoc.html")
		})
	}

	// ---------- API ----------

	api := r.Group("/api")

	// ---------- PUBLIC ----------

	auth := api.Group("/auth")
	{
		auth.POST("/register", userHandler.Register)
		auth.POST("/login", userHandler.Login)
		// auth.DELETE("/register", userHandler.Delete)
	}

	// ---------- PROTECTED ----------

	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware(userService))

	// ---------- USERS ----------

	users := protected.Group("/users")
	{
		users.GET("/me", userHandler.Me)
	}

	// ---------- CHATS ----------

	chats := protected.Group("/chats")
	{
		chats.GET("", chatHandler.GetChats)
		chats.POST("", chatHandler.CreateChat)
		chats.POST("/join", chatHandler.JoinChat)
		// chats.DELETE("", chatHandler.DeleteChat)
	}

	// ---------- MESSAGES----------
	messages := chats.Group("/:chat_id/messages")
	{
		messages.GET("", messageHandler.GetMessages)
		messages.POST("", messageHandler.SendMessage)
	}

	/*contents := chats.Group("/:chat_id/:message_id/content")
	{
		messages.GET("", contentHandler.GetContent)
		messages.POST("", contentHandler.SendContent)
	}*/

	server.Run(":8080", r, func() {
		sqlDB, _ := db.DB()
		sqlDB.Close()
	})

}
