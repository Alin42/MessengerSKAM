package service

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"
	"time"

	"github.com/google/uuid"
)

// ---------- ERRORS ----------

var UserNotFound = errors.New("user not found")
var UserAlreadyExist = errors.New("user already exist")

// ---------- USER SERVICE ----------

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) Register(login string) (*models.User, error) {
	existing, err := s.repo.GetByLogin(login)
	if err != nil {
		return nil, err
	}

	if existing != nil {
		return nil, UserAlreadyExist
	}

	createdAt := time.Now()
	token := uuid.NewString()
	session_token := uuid.NewString()
	invite_token := uuid.NewString()
	user := &models.User {
		Login: login,
		Token: token,
		Username: login,
		SessionToken: session_token,
		InviteToken: invite_token,
		CreatedAt: createdAt,
	}

	return user, s.repo.Create(user)
}

func (s *UserService) Login(token string) (*models.User, error) {
	user, err := s.repo.GetByToken(token)
	if err != nil {
		return nil, err
	}

	if user == nil {
		return nil, UserNotFound
	}

	sessionToken := uuid.NewString()

	err = s.repo.UpdateSessionToken(user.ID, sessionToken)
	if err != nil {
		return nil, err
	}

	user.SessionToken = sessionToken

	return user, nil
}

func (s UserService) AuthByToken(session_token string) (*models.User, error) {
	user, err := s.repo.GetBySessionToken(session_token)
	if err != nil {
		return nil, err
	}

	if user == nil {
		return nil, UserNotFound
	}

	return user, nil

}
