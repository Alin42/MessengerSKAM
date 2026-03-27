package models

import "time"

type User struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Login       string    `json:"login" gorm:"unique;not null"`
	Username    string    `json:"username" binding:"required"`
	Token       string    `json:"token"`
	InviteToken string    `json:"invitetoken"`
	CreatedAt   time.Time `json:"created_at"`
}
