package models

import "time"

type Message struct {
	ID        uint      `gorm:"primaryKey"`
	ChatId    uint      `json:"chat_id"`
	UserId    uint      `json:"user_id"`
	Content   string    `json:"content"`
	Timestamp time.Time `json:"timestamp"`
}
