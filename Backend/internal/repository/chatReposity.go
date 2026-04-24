package repository

import (
	"errors"
	"messanger-backend/internal/models"

	"gorm.io/gorm"
)

type ChatRepository struct {
	db *gorm.DB
}

func NewChatRepository(db *gorm.DB) *ChatRepository {
	return &ChatRepository{db: db}
}

func (r *ChatRepository) CreateСhat(chat *models.Chat) error {
	return r.db.Create(chat).Error
}

func (r *ChatRepository) CreateParticipant(chatParticipant *models.ChatParticipants) error {
	return r.db.Create(chatParticipant).Error
}

func (r *ChatRepository) CreateMessage(msg *models.Messages) error {
	return r.db.Create(msg).Error
}

func (r *ChatRepository) DeleteChat(chatID uint) error {
	return r.db.Delete(&models.Chat{}, chatID).Error
}

func (r *ChatRepository) DeleteParticipant(chatID, userID uint) error {
	return r.db.
		Where("chat_id = ? AND user_id = ?", chatID, userID).
		Delete(&models.ChatParticipants{}).Error
}

func (r *ChatRepository) DeleteMessage(msgID uint) error {
	return r.db.Delete(&models.Messages{}, msgID).Error
}

// GETS

func (r *ChatRepository) GetByChats(userID uint, chatType models.ChatType) ([]models.Chat, error) {
	var chats []models.Chat

	db := r.db.Model(&models.Chat{}).
		Joins("JOIN chat_participants ON chat_participants.chat_id = chats.id").
		Where("chat_participants.user_id = ?", userID)

	if chatType != models.Any {
		db = db.Where("chats.type = ?", chatType)
	}

	err := db.Find(&chats).Error
	return chats, err
}

func (r *ChatRepository) GetContactChat(userID, friendID uint) (*models.Chat, error) {
	var chat models.Chat

	err := r.db.
		Model(&models.Chat{}).
		Distinct("chats.*").
		Joins("JOIN chat_participants cp1 ON cp1.chat_id = chats.id").
		Joins("JOIN chat_participants cp2 ON cp2.chat_id = chats.id").
		Where("cp1.user_id = ?", userID).
		Where("cp2.user_id = ?", friendID).
		Where("chats.type = ?", models.Contact).
		First(&chat).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &chat, nil
}

func (r *ChatRepository) GetChatByToken(token string) (*models.Chat, error) {
	var chat models.Chat

	err := r.db.
		Where("chat_token = ? AND type = ?", token, models.Group).
		First(&chat).Error

	return &chat, err
}

func (r *ChatRepository) GetByChatParticipants(chatID uint) ([]models.User, error) {
	var users []models.User

	err := r.db.Model(&models.User{}).
		Joins("JOIN chat_participants ON chat_participants.user_id = users.id").
		Where("chat_participants.chat_id = ?", chatID).
		Find(&users).Error

	return users, err
}

func (r *ChatRepository) GetByMessages(chatID uint) ([]models.Messages, error) {
	var messages []models.Messages

	err := r.db.Model(&models.Messages{}).
		Where("chat_id = ?", chatID).
		Find(&messages).Error

	return messages, err
}

func (r *ChatRepository) IsChatParticipant(chatID uint, userID uint) (bool, error) {
	var count int64

	err := r.db.Model(&models.ChatParticipants{}).
		Where("chat_id = ?", chatID).
		Where("user_id = ?", userID).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}