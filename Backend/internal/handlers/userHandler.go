package handlers

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserHandler struct {
	UserService *service.UserService
}

func NewUserHandler(s *service.UserService) *UserHandler {
	return &UserHandler{UserService: s}
}

type RegisterRequest struct {
	Login string `json:"login" binding:"required"`
}

type LoginRequest struct {
	Token string `json:"token" binding:"required"`
}

func (h *UserHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token := uuid.NewString()
	user := models.User{
		Login: req.Login,
		Token: token,
	}

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
		"token":   token,
	})
}

func (h *UserHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	user, err := h.UserService.LoginUser(req.Token)

	if err != nil {
		if errors.Is(err, service.ErrUserNotFound) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not found"})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal error",
			"debug": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Success", "login": user.Login})
}
