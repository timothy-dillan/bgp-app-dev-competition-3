package middleware

import (
	auth "backend/internal/auth"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// Authenticate determines if current subject has logged in.
func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := c.Cookie("bid_auth_session")
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "error occurred when authorizing user"})
			return
		}

		session, err = auth.GetSession(session)
		if err != nil || strings.TrimSpace(session) == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "user is not logged in"})
			return
		}

		c.Next()
	}
}
