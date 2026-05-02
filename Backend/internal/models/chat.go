package models

import "time"

type ChatType string

const (
	Group   ChatType = "group"
	Contact ChatType = "contact"
	Any     ChatType = "any"
)

// ---------- SQL tables ----------

type Chat struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Type          ChatType  `json:"type"`
	ChatToken     string    `json:"chat_token"`
	Name          string    `json:"name"`
	CreatedAt     time.Time `json:"created_at"`
	LastMessageAt time.Time `json:"last_message_at"`
}

type ChatParticipant struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	ChatID     uint      `json:"chat_id" gorm:"uniqueIndex:idx_user_chat"`
	UserID     uint      `json:"user_id" gorm:"uniqueIndex:idx_user_chat"`
	JoinedAt   time.Time `json:"joined_at"`
	LastViewed time.Time `json:"last_viewed"`
}

type Message struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ChatID    uint      `json:"chat_id"`
	SenderID  uint      `json:"sender_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

// ---------- Responses ----------

type ChatAPI struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Type          ChatType  `json:"type"`
	ChatToken     string    `json:"chat_token"`
	Name          string    `json:"name"`
	LastMessageAt time.Time `json:"last_message_at"`
	LastMessage   string    `json:"last_message"`
}

type MessageAPI struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	ChatID     uint      `json:"chat_id"`
	SenderName string    `json:"sender_name"`
	Content    string    `json:"content"`
	CreatedAt  time.Time `json:"created_at"`
}
