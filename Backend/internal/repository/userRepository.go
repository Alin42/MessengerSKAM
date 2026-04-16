package repository

import (
	"messanger-backend/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) error {
	user.Token = uuid.NewString()
	user.InviteToken = uuid.NewString()
	return r.db.Create(user).Error
}

func (r *UserRepository) UpdateSessionToken(userID uint) (string, error) {
	sessionToken := uuid.NewString()

	err := r.db.Model(&models.User{}).
		Where("id = ?", userID).
		Update("session_token", sessionToken).Error

	return sessionToken, err
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
	if err == gorm.ErrRecordNotFound {
		return &models.User{}, nil
	}
	return &user, err
}

func (r *UserRepository) GetBySessionToken(token string) (*models.User, error) {
	var user models.User

	err := r.db.Where("session_token = ?", token).First(&user).Error
	if err == gorm.ErrRecordNotFound {
		return &models.User{}, nil
	}

	return &user, err
}
