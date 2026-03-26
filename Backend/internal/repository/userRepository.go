package repository

import (
	"messanger-backend/internal/models"

	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) GetByToken(token string) (*models.User, error) {
	var user models.User
	err := r.db.Where("token = ?", token).First(&user).Error
	return &user, err
}
