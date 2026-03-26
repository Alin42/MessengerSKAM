package handlers

import (
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	UserSevice *service.UserSevice
}

func NewUserHandler(s *service.UserSevice) *UserHandler {
	return &UserHandler{UserSevice: s}
}

func (h *UserHandler) Register(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.UserSevice.RegisterUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "user created success"})
}
