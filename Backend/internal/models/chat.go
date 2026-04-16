package models

import (
	"time"
)

type Chat struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	ChatToken string    `json:"chattoken"`
	CreatedAt time.Time `json:"created_at"`
}

type ChatParticipants struct {
	ID       uint `json:"id" gorm:"primaryKey"`
	UserID   uint
	JoinedAt time.Time `json:"joined_at"`
}

type ChatMessages struct {
	ChatToken string    `json:"chattoken"`
	SenderID  string    `json:"senderid"`
	Content   string    `json:"content"`
	SendAt    time.Time `json:"sendat"`
}
