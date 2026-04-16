package repository

import (
	"messanger-backend/internal/models"

	"gorm.io/gorm"
)

type ChatRepository struct {
	db *gorm.DB
}

func NewChatRepository(db *gorm.DB) *ChatRepository {
	return &ChatRepository{db: db}
}

func (r *ChatRepository) Create(msg *models.Chat) error {
	return r.db.Create(msg).Error
}

func (r *ChatRepository) GetChats(user uint) ([]models.Chat, error) {
	var chats []models.Chat

	err := r.db.InnerJoins("JOIN chat_participants ON chat_participants.chat_id = chats.id").
		Where("chat_participants.user_id = ?", user).
		Order("last_active asc").
		Find(&chats).Error

	return chats, err
}
