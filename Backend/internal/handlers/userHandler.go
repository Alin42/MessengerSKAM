package handlers

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	UserService *service.UserService
}

func NewUserHandler(s *service.UserService) *UserHandler {
	return &UserHandler{UserService: s}
}

func (h *UserHandler) Register(c *gin.Context) {
	var req models.Register
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{Login: req.Login}
	if err := h.UserService.RegisterUser(&user); err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
		"login":   user.Login,
		"token":   user.Token,
	})
}

func (h *UserHandler) Login(c *gin.Context) {
	var req models.Login

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	user, err := h.UserService.LoginUser(req.Token)
	if err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal error",
			"debug": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Success",
		"user": gin.H{
			"login":         user.Login,
			"session_token": user.SessionToken,
		},
	})
}

func (h *UserHandler) Me(c *gin.Context) {
	userRaw, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found in context"})
		return
	}

	user := userRaw.(*models.User)

	c.JSON(http.StatusOK, gin.H{
		"id":       user.ID,
		"login":    user.Login,
		"username": user.Username,
	})
}
