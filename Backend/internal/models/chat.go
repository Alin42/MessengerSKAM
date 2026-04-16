package models

import (
	"time"
)

type Chat struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	Name       string    `json:"name"`
	ChatToken  string    `json:"chat_token"`
	CreatedAt  time.Time `json:"created_at"`
	LastActive time.Time `json:"last_active"`
}

type ChatParticipants struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	ChatId     uint      `json:"chat_id"`
	UserId     uint      `json:"user_id"`
	JoinedAt   time.Time `json:"joined_at"`
	LastActive time.Time `json:"last_active"`
}
