package handlers

import (
	"fmt"
	"net/http"

	"messanger-backend/internal/models"
	"messanger-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type MessageHandler struct {
	service *service.MessageService
}

func NewMessageHandler(s *service.MessageService) *MessageHandler {
	return &MessageHandler{service: s}
}

type SendMessageRequest struct {
	ToID uint   `json:"to_id"`
	Text string `json:"text"`
}

func (h *MessageHandler) Send(c *gin.Context) {
	var req SendMessageRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
		return
	}

	userRaw, _ := c.Get("user")
	user := userRaw.(*models.User)

	err := h.service.Send(user.ID, req.ToID, req.Text)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot send message"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func (h *MessageHandler) GetChat(c *gin.Context) {
	userRaw, _ := c.Get("user")
	user := userRaw.(*models.User)

	toIDStr := c.Query("to_id")

	var toID uint
	if _, err := fmt.Sscanf(toIDStr, "%d", &toID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid to_id"})
		return
	}

	messages, err := h.service.GetChat(user.ID, toID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot get chat"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"messages": messages,
	})
}