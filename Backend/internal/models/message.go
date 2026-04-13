package models

import "time"

type Message struct {
	ID        uint      `gorm:"primaryKey"`
	FromID    uint      `json:"from_id"`
	ToID      uint      `json:"to_id"`
	Text      string    `json:"text"`
	CreatedAt time.Time `json:"created_at"`
}