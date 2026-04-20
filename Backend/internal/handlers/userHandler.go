package handlers

import (
	"errors"
	"net/http"

	"messanger-backend/internal/middleware"
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"

	"github.com/gin-gonic/gin"
)

//REQUESTS

type RegisterRequest struct {
	Login string `json:"login" binding:"required"`
}

type LoginRequest struct {
	Token string `json:"token" binding:"required"`
}

//RESPONSES

type AuthResponse struct {
	Message string `json:"message"`
	Token   string `json:"token"`
}

//USER_HANDLERS

type UserHandler struct {
	UserService *service.UserService
}

func NewUserHandler(s *service.UserService) *UserHandler {
	return &UserHandler{UserService: s}
}

func (h *UserHandler) Register(c *gin.Context) {
	var req RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
		return
	}

	user := models.User{
		Login: req.Login,
	}

	if err := h.UserService.Register(&user); err != nil {
		if errors.Is(err, service.UserAlreadyExist) {
			c.JSON(http.StatusConflict, gin.H{
				"error": "User already exists",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}

	c.JSON(http.StatusCreated, AuthResponse{
		Message: "User autheticated",
		Token:   user.SessionToken,
	})
}

func (h *UserHandler) Login(c *gin.Context) {
	var req LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request",
		})
		return
	}

	user, err := h.UserService.Login(req.Token)
	if err != nil {
		if errors.Is(err, service.UserNotFound) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, AuthResponse{
		Message: "User authenticated",
		Token:   user.SessionToken,
	})
}

func (h *UserHandler) Logout(c *gin.Context) {
	//TODO
}

func (h *UserHandler) Delete(c *gin.Context) {
	//TODO
}

func (h *UserHandler) Me(c *gin.Context) {
	userRaw, exists := c.Get(middleware.UserContextKey)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
		return
	}

	user, ok := userRaw.(*models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Internal server error",
		})
		return
	}

	c.JSON(http.StatusOK, models.User{
		ID:    user.ID,
		Login: user.Login,
	})
}
