package handlers

import (
	"net/http"
	"strconv"

	"messanger-backend/internal/middleware"
	"messanger-backend/internal/service"

	"github.com/gin-gonic/gin"
)

// ---------- REQUESTS ----------

type SendMessageRequest struct {
	Content string `json:"content"`
}

// ---------- MESSAGE HANDLER ----------

type MessageHandler struct {
	service *service.ChatService
}

func NewMessageHandler(s *service.ChatService) *MessageHandler {
	return &MessageHandler{service: s}
}

func (h *MessageHandler) SendMessage(c *gin.Context) {
	var req SendMessageRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	user := middleware.MustGetUser(c)
	if user == nil {
		return
	}

	chatID, err := strconv.Atoi(c.Param("chat_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid chat id"})
		return
	}

	err = h.service.AddMessage(uint(chatID), user.ID, req.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func (h *MessageHandler) GetMessages(c *gin.Context) {
	chatIDStr := c.Param("chat_id")

	chatID, err := strconv.Atoi(chatIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid chat id"})
		return
	}

	messages, err := h.service.GetMessages(uint(chatID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot get messages"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"messages": messages,
	})
}
