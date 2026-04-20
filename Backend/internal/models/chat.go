package models

import "time"

type ChatType string

const (
	Group   ChatType = "Group"
	Contact ChatType = "Contact"
	Any     ChatType = "Any"
)

type Chat struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Type          ChatType  `json:"type"`
	ChatToken     string    `json:"invite_token"`
	Name          string    `json:"name"`
	CreatedAt     time.Time `json:"created_at"`
	LastMessageAt time.Time `json:"last_message_at"`
}

type ChatParticipants struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	ChatID     uint      `json:"chat_id" gorm:"uniqueIndex:idx_user_chat"`
	UserID     uint      `json:"user_id" gorm:"uniqueIndex:idx_user_chat"`
	JoinedAt   time.Time `json:"joined_at"`
	LastViewed time.Time `json:"last_viewed"`
}

type Messages struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ChatID    uint      `json:"chat_id"`
	SenderId  uint      `json:"user_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}