package models

import "time"

type User struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Login        string    `json:"login" gorm:"unique;not null"`
	Token        string    `json:"token"`
	SessionToken string    `json:"session_token"`
	CreatedAt    time.Time `json:"created_at"`
	LastActive   time.Time `json:"last_active"`
}
