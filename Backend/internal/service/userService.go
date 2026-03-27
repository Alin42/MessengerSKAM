package service

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"
)

type UserSevice struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserSevice {
	return &UserSevice{repo: repo}
}

func (s *UserSevice) RegisterUser(user *models.User) error {
	existing, err := s.repo.GetByLogin(user.Login)
	if err != nil {
		return err
	}

	if existing.ID != 0 {
		return errors.New("duplicate login")
	}

	return s.repo.Create(user)
}
