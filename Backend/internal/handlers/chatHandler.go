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
}

type AddUserRequest struct {
	ChatID uint `json:"chat_id"`
	UserID uint `json:"user_id"`
}

//RESPONSES

type ChatsResponse struct {
	Chats []models.Chat `json:"chats"`
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
	user := userRaw.(*models.User)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	chats, err := h.service.GetChats(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, ChatsResponse{
		Chats: chats,
	})
}

func (h *ChatHandler) createChat(c *gin.Context, chatType models.ChatType) {
	var req AddChatRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
		return
	}

	if chatType == models.Group && req.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Incorrect chat name",
		})
		return
	}

	chat, err := h.service.AddChat(req.Name, chatType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}

	c.JSON(http.StatusCreated, chat)
}

func (h *ChatHandler) addUser(c *gin.Context, chatID uint) {
	var req AddUserRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
		return
	}

	user := c.MustGet(middleware.UserContextKey).(*models.User)

	err := h.service.JoinChat(chatID, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}

	c.Status(http.StatusCreated)
}

func (h *ChatHandler) AddChat(c *gin.Context) {
	h.createChat(c, models.Group)
}

func (h *ChatHandler) AddContact(c *gin.Context) {
	h.createChat(c, models.Contact)
}
