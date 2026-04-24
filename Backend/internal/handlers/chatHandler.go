package handlers

import (
	"net/http"
	"strings"

	"messanger-backend/internal/middleware"
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"

	"github.com/gin-gonic/gin"
)

// ---------- QUERY ----------

type GetChatsQuery struct {
	Type string `form:"type"`
}

// ---------- REQUESTS ----------

type SendChatRequest struct {
	ToID uint   `json:"to_id"`
	Text string `json:"text"`
}

type AddChatRequest struct {
	Name     string          `json:"name"`
	ChatType models.ChatType `json:"type"`
}

type AddUserRequest struct {
	ChatID uint `json:"chat_id" gorm:"uniqueIndex:idx_user_chat"`
	UserID uint `json:"user_id"`
}

// ---------- RESPONES ----------

type ChatResponse struct {
	ID     uint `json:"chat_id"`
	Status string
}

type JoinChatRequest struct {
	Token string `json:"chat_token"`
}

type AddChatResponse struct {
	Message   string `json:"message"`
	ChatToken string `json:"chat_token"`
}

type AddUserResponse struct {
	ChatID uint `json:"chat_id"`
	UserID uint `json:"user_id"`
}

// ---------- CHAT HANDLERS ----------

type ChatHandler struct {
	service *service.ChatService
}

func NewChatHandler(s *service.ChatService) *ChatHandler {
	return &ChatHandler{service: s}
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

func (h *ChatHandler) GetChats(c *gin.Context) {
	user := middleware.MustGetUser(c)
	if user == nil {
		return
	}

	var q GetChatsQuery
	if err := c.ShouldBindQuery(&q); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	t := models.Any

	if q.Type != "" {
		switch strings.ToLower(q.Type) {
		case "contact":
			t = models.Contact
		case "group":
			t = models.Group
		default:
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid type"})
			return
		}
	}

	chats, err := h.service.GetChats(user.ID, t)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}
	c.JSON(http.StatusOK, chats)
}

func (h *ChatHandler) GetChatByID(c *gin.Context) {
	user := middleware.MustGetUser(c)
	if user == nil {
		return
	}

	chat_type := c.Query("type")
	chats, err := h.service.GetChats(user.ID, models.ChatType(chat_type))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}
	c.JSON(http.StatusOK, chats)
}



func (h *ChatHandler) JoinChat(c *gin.Context) {
	var req JoinChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	user := middleware.MustGetUser(c)
	if user == nil {
		return
	}

	if err := h.service.JoinChat(req.Token, user.ID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal error"})
		return
	}

	c.Status(http.StatusOK)
}