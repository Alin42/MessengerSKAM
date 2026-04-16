package handlers

import (
	"net/http"

	"messanger-backend/internal/models"
	"messanger-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type ChatHandler struct {
	service *service.ChatService
}

func NewChatHandler(s *service.ChatService) *ChatHandler {
	return &ChatHandler{service: s}
}

type SendChatRequest struct {
	ToID uint   `json:"to_id"`
	Text string `json:"text"`
}

func (h *ChatHandler) GetChats(c *gin.Context) {
	userRaw, _ := c.Get("user")
	user := userRaw.(*models.User)

	/*toIDStr := c.Query("to_id")

	var toID uint
	if _, err := fmt.Sscanf(toIDStr, "%d", &toID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid to_id"})
		return
	}*/

	chats, err := h.service.GetChats(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot get chat"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"chats": chats,
	})
}
