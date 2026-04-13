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

func (r *MessageRepository) GetChat(user1, user2 uint) ([]models.Message, error) {
	var messages []models.Message

	err := r.db.
		Where("(from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?)",
			user1, user2, user2, user1).
		Order("created_at asc").
		Find(&messages).Error

	return messages, err
}
