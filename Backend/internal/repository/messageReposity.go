package repository

import (
	"messanger-backend/internal/models"

	"gorm.io/gorm"
)

type MessageRepository struct {
	db *gorm.DB
}

func NewMessageRepository(db *gorm.DB) *MessageRepository {
	return &MessageRepository{db: db}
}

func (r *MessageRepository) Create(msg *models.Message) error {
	return r.db.Create(msg).Error
}

func (r *MessageRepository) GetMessages(chat uint) ([]models.Message, error) {
	var messages []models.Message

	err := r.db.
		Where("chat_id == ?", chat).
		Order("created_at asc").
		Find(&messages).Error

	return messages, err
}
