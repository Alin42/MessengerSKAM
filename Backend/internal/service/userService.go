package service

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"
)

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
