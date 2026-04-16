package main

import (
	"log"
	"time"

	"messanger-backend/cmd/server"
	"messanger-backend/internal/config"
	"messanger-backend/internal/handlers"
	"messanger-backend/internal/middleware"
	"messanger-backend/internal/repository"
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

	// User layer
	userRepo := repository.NewUserRepository(db)
	userService := service.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	// Message layer
	messageRepo := repository.NewMessageRepository(db)
	messageService := service.NewMessageService(messageRepo)
	messageHandler := handlers.NewMessageHandler(messageService)

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	r.Use(gin.Logger(), gin.Recovery())

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Public routes
	api := r.Group("/api")
	{
		api.POST("/register", userHandler.Register)
		api.POST("/login", userHandler.Login)
	}

	// Protected routes
	auth := api.Group("/")
	auth.Use(middleware.AuthMiddleware(userService))
	{
		auth.GET("/me", userHandler.Me)

		// messages (chat)
		auth.POST("/messages", messageHandler.Send)
		auth.GET("/messages", messageHandler.GetChat)
	}
	
	server.Run(":8080", r, func() {
		sqlDB, _ := db.DB()
		sqlDB.Close()
	})
}