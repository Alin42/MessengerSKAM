package service

import (
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"
	"time"
)

type ChatService struct {
	repo *repository.ChatRepository
}

func NewChatService(repo *repository.ChatRepository) *ChatService {
	return &ChatService{repo: repo}
}

func (s *ChatService) Create(name, chatToken string) error {
	msg := &models.Chat{
		Name:       name,
		ChatToken:  chatToken,
		CreatedAt:  time.Now(),
		LastActive: time.Now(),
	}

	return s.repo.Create(msg)
}

func (s *ChatService) GetChats(user uint) ([]models.Chat, error) {
	return s.repo.GetChats(user)
}
