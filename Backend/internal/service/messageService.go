package service

import (
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"
)

type MessageService struct {
	repo *repository.MessageRepository
}

func NewMessageService(repo *repository.MessageRepository) *MessageService {
	return &MessageService{repo: repo}
}

func (s *MessageService) Send(fromID, toID uint, text string) error {
	msg := &models.Message{
		FromID: fromID,
		ToID:   toID,
		Text:   text,
	}

	return s.repo.Create(msg)
}

func (s *MessageService) GetChat(user1, user2 uint) ([]models.Message, error) {
	return s.repo.GetChat(user1, user2)
}
