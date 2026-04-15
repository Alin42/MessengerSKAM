package repository

import (
	"fmt"
	"messanger-backend/internal/config"
	"messanger-backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewPostgresDB(cfg *config.Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf("host=%s user=%s password='%s' dbname=%s port=%s sslmode=require",
		cfg.DBHost, cfg.DBUser, cfg.DBPass, cfg.DBName, cfg.DBPort)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Supabase: %v", err)
	}

	fmt.Println("Create tables in Supabase...")
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		return nil, fmt.Errorf("migration failed: %v", err)
	}

	fmt.Println("Supabase ready!")
	return db, nil
}
