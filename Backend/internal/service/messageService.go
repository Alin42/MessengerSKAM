package service

import (
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"
	"time"
)

type MessageService struct {
	repo *repository.MessageRepository
}

func NewMessageService(repo *repository.MessageRepository) *MessageService {
	return &MessageService{repo: repo}
}

func (s *MessageService) Send(chatID, userID uint, content string) error {
	msg := &models.Message{
		ChatId:    chatID,
		UserId:    userID,
		Content:   content,
		Timestamp: time.Now(),
	}

	return s.repo.Create(msg)
}

func (s *MessageService) GetMessages(chat uint) ([]models.Message, error) {
	return s.repo.GetMessages(chat)
}
