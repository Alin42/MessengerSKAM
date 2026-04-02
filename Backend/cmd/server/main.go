package main

import (
	"log"
	"messanger-backend/internal/config"
	"messanger-backend/internal/handlers"
	"messanger-backend/internal/repository"
	"messanger-backend/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()
	db, err := repository.NewPostgresDB(cfg)
	if err != nil {
		log.Fatal(err)
	}

	userRepo := repository.NewUserRepository(db)
	userServ := service.NewUserService(userRepo)
	userHand := handlers.NewUserHandler(userServ)

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())
	r.SetTrustedProxies(nil)
	r.Use(cors.Default())

	api := r.Group("api")
	{
		api.POST("/register", userHand.Register)
		api.POST("/login", userHand.Login)
	}

	r.Run(":8080")
}
