package repository

import (
	"errors"
	"messanger-backend/internal/models"

	"gorm.io/gorm"
)

// USER_REPOSITORY

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *UserRepository) Delete(userID uint) error {
	return r.db.Delete(&models.User{}, userID).Error
}

// UPDATES

func (r *UserRepository) UpdateSessionToken(userID uint, sessionToken string) error {
	return r.db.Model(&models.User{}).
		Where("id = ?", userID).
		Update("session_token", sessionToken).Error
}

// GETS

func (r *UserRepository) GetByLogin(login string) (*models.User, error) {
	var user models.User

	err := r.db.
		Where("login = ?", login).
		First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetByToken(token string) (*models.User, error) {
	var user models.User

	err := r.db.
		Where("token = ?", token).
		First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetBySessionToken(token string) (*models.User, error) {
	var user models.User

	err := r.db.
		Where("session_token = ?", token).
		First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) GetByInviteToken(token string) (*models.User, error) {
	var user models.User

	err := r.db.
		Where("invite_token = ?", token).
		First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}