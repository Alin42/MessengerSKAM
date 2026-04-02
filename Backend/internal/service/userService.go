package service

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"

	"gorm.io/gorm"
)

var ErrUserNotFound = errors.New("user not found")

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) RegisterUser(user *models.User) error {
	existing, err := s.repo.GetByLogin(user.Login)
	if err != nil {
		return err
	}

	if existing.ID != 0 {
		return errors.New("duplicate login")
	}

	return s.repo.Create(user)
}

func (s *UserService) LoginUser(token string) (*models.User, error) {
	existing, err := s.repo.GetByToken(token)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	return existing, nil
}
