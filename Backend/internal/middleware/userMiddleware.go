package middleware

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/service"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const UserContextKey = "user"

const ChatContextKey = "chat"

type AuthToken struct {
	Type  string
	Value string
}

// AUTHMIDDLEWARE
func ParseAuthHeader(header string) (*AuthToken, error) {
	if header == "" {
		return nil, errors.New("Empty header")
	}

	parts := strings.SplitN(header, " ", 2)
	if len(parts) != 2 {
		return nil, errors.New("Invalid format")
	}

	return &AuthToken{
		Type:  strings.ToLower(parts[0]),
		Value: parts[1],
	}, nil
}

func AuthMiddleware(userService *service.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		token, err := ParseAuthHeader(authHeader)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid authorization header",
			})
			return
		}

		if token.Type != "bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unsupported auth type",
			})
			return
		}

		user, err := userService.AuthByToken(token.Value)
		if err != nil || user == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid session token",
			})
			return
		}

		c.Set(UserContextKey, user)
		c.Next()
	}
}

// HELPER
func MustGetUser(c *gin.Context) *models.User {
	u, exists := c.Get(UserContextKey)
	if !exists {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return nil
	}

	user, ok := u.(*models.User)
	if !ok {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type"})
		return nil
	}

	return user
}