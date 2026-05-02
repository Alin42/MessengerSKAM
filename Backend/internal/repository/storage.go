package repository

import (
	"fmt"
	"messanger-backend/internal/config"
	"messanger-backend/internal/models"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewPostgresDB(cfg *config.Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=require TimeZone=UTC",
		cfg.DBHost,
		cfg.DBUser,
		cfg.DBPass,
		cfg.DBName,
		cfg.DBPort,
	)

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{
		PrepareStmt: false,
	})

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(50)
	sqlDB.SetConnMaxLifetime(time.Hour)

	return db, err
}

func RunMigrations(db *gorm.DB) error {
	fmt.Println("Running migrations...")

	err := db.AutoMigrate(
		&models.User{},
		&models.Chat{},
		&models.ChatParticipant{},
		&models.Message{},
	)

	fmt.Println("Create tables in Supabase...")
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		return fmt.Errorf("migration failed: %v", err)
	}

	fmt.Println("Database ready!")
	return nil
}
