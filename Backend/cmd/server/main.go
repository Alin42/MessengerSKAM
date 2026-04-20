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

const enableMigrations = false

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

	// Message layer
	// messageRepo := repository.NewMessageRepository(db)
	// messageService := service.NewMessageService(messageRepo)
	// messageHandler := handlers.NewMessageHandler(messageService)

	// User layer
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	// Chat layer
	chatRepo := repository.NewChatRepository(db)
	chatService := service.NewChatService(chatRepo, userRepo)
	chatHandler := handlers.NewChatHandler(chatService)

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

	// OpenAPI
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

	// API
	api := r.Group("/api")

	// ---------- PUBLIC ----------
	auth := api.Group("/auth")
	{
		auth.POST("/register", userHandler.Register)
		auth.POST("/login", userHandler.Login)
	}

	// ---------- PROTECTED ----------
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware(userService))

	// USERS
	users := protected.Group("/users")
	{
		users.GET("/me", userHandler.Me)
		// users.DELETE("/me", userHandler.Delete)
	}

	// CHATS
	chats := protected.Group("/chats")
	{
		chats.GET("", chatHandler.GetChats)
	}

	// MESSAGES
	// messages := protected.Group("/chats/:chat_id/messages")
	// {
	// 	messages.GET("", chatHandler....)
	// }

	server.Run(":8080", r, func() {
		sqlDB, _ := db.DB()
		sqlDB.Close()
	})

}
