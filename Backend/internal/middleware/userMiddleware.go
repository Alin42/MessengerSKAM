package middleware

import (
	"messanger-backend/internal/service"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(userService *service.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "no token"})
			return
		}

		// "Bearer xxx"
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token format"})
			return
		}

		sessionToken := parts[1]

		user, err := userService.GetBySessionToken(sessionToken)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "server error"})
			return
		}

		if user.ID == 0 {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}

		c.Set("user", user)

		c.Next()
	}
}
