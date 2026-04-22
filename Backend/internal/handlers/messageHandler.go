package handlers

import (
	"net/http"

	"messanger-backend/internal/middleware"
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type MessageHandler struct {
	service *service.ChatService
}

func NewMessageHandler(s *service.ChatService) *MessageHandler {
	return &MessageHandler{service: s}
}

type SendMessageRequest struct {
	ChatID  uint   `json:"chat_id"`
	Content string `json:"content"`
}

func (h *MessageHandler) SendMessage(c *gin.Context) {
	var req SendMessageRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	userRaw, exists := c.Get(middleware.UserContextKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	user, ok := userRaw.(*models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type"})
		return
	}

	err := h.service.AddMessage(req.ChatID, user.ID, req.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func (h *MessageHandler) GetMessages(c *gin.Context) {
	chatRaw, _ := c.Get("chat")
	chat := chatRaw.(*models.Chat)

	messages, err := h.service.GetMessages(chat.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot get chat"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"messages": messages,
	})
}
