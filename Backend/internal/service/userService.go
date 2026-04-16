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
		return errors.New("user already exists")
	}

	return s.repo.Create(user)
}

func (s *UserService) LoginUser(token string) (*models.User, error) {
	user, err := s.repo.GetByToken(token)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	newToken, err := s.repo.UpdateSessionToken(user.ID)
	if err != nil {
		return nil, err
	}
	user.SessionToken = newToken

	return user, nil
}

func (s *UserService) GetBySessionToken(token string) (*models.User, error) {
	return s.repo.GetBySessionToken(token)
}
