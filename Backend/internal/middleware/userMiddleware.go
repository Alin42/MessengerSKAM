package middleware

import (
	"errors"
	"messanger-backend/internal/service"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const UserContextKey = "user"

type AuthToken struct {
	Type  string
	Value string
}

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