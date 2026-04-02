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

func (r *UserRepository) GetByLogin(login string) (*models.User, error) {
	var user models.User
	err := r.db.Where("login = ?", login).First(&user).Error
	if err == gorm.ErrRecordNotFound {
		return &models.User{}, nil
	}
	return &user, err
}

func (r *UserRepository) GetByToken(token string) (*models.User, error) {
	var user models.User
	err := r.db.Where("token = ?", token).First(&user).Error
	return &user, err
}
