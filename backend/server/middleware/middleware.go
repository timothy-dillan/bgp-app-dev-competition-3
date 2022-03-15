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

func CORSConfiguration() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH,GET,PUT")
		c.Next()
		if c.Request.Method == "OPTIONS" {
			c.JSON(http.StatusOK, "")
			return
		}
	}
}
