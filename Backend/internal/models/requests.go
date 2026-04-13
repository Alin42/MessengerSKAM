package models

type Register struct {
	Login string `json:"login" binding:"required"`
}

type Login struct {
	Token string `json:"token" binding:"required"`
}
