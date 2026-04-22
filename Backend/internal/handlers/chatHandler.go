package handlers

import (
	"net/http"

	"messanger-backend/internal/middleware"
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"

	"github.com/gin-gonic/gin"
)

// REQUESTS

type SendChatRequest struct {
	ToID uint   `json:"to_id"`
	Text string `json:"text"`
}

type AddChatRequest struct {
	Name string `json:"name"`
	ChatType models.ChatType `json:"type"`
}

type AddUserRequest struct {
	ChatID uint `json:"chat_id"`
	UserID uint `json:"user_id"`
}

//RESPONSES

type ChatResponse struct {
	ID     uint `json:"chat_id"`
	Status string
}

type AddChatResponse struct {
	Message   string `json:"message"`
	ChatToken string `json:"chat_token"`
}

type AddUserResponse struct {
	ChatID uint `json:"chat_id"`
	UserID uint `json:"user_id"`
}

//CHAT_HANDLERS

type ChatHandler struct {
	service *service.ChatService
}

func NewChatHandler(s *service.ChatService) *ChatHandler {
	return &ChatHandler{service: s}
}

func (h *ChatHandler) GetChats(c *gin.Context) {
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

	chats, err := h.service.GetChats(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, chats)
}

func (h *ChatHandler) CreateChat(c *gin.Context) {
	var req AddChatRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
		return
	}

	if req.ChatType == models.Group && req.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Incorrect chat name",
		})
		return
	}

	chat, err := h.service.AddChat(req.Name, req.ChatType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}

	c.JSON(http.StatusCreated, ChatResponse{
		ID:     chat.ID,
		Status: "Chat created",
	})
}

func (h *ChatHandler) JoinChat(c *gin.Context) {
	var req AddUserRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
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

	err := h.service.AddParticipant(req.ChatID, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}

	c.Status(http.StatusCreated)
}
