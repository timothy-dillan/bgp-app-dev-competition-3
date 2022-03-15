package middleware

import (
	auth "backend/internal/auth"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Authenticate determines if current subject has logged in.
func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get session id
		session, err := c.Cookie("bid_auth_session")
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "error occurred when authorizing user"})
			return
		}

		loggedIn, err := auth.IsUserLoggedIn(session)
		if err != nil || !loggedIn {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "user is not logged in"})
			return
		}

		c.Next()
	}
}
