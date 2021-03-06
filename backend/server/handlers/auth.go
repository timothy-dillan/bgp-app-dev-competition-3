package handlers

import (
	auth "backend/internal/auth"
	auth_repository "backend/repository/auth"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func LogInHandler(c *gin.Context) {
	session, err := c.Cookie("bid_auth_session")
	if err != nil {
		log.Println(err)
	}

	session, err = auth.GetSession(session)
	if err != nil {
		log.Println(err, "session may be empty or error returned")
	}

	// a non-empty session indicates that a user is logged in.
	if strings.TrimSpace(session) != "" {
		c.JSON(http.StatusOK, gin.H{"message": "Already logged in."})
		return
	}

	var loginData auth_repository.UserData
	if err := c.BindJSON(&loginData); err != nil {
		log.Println(err, "error when unmarshalling login data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Cannot unmarshall data."})
		return
	}

	isValidLogin, err := auth.CheckPassword(loginData.Username, loginData.Password)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when authorizing user."})
		return
	}

	if !isValidLogin {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Invalid username or password."})
		return
	}

	userData, err := auth_repository.GetUserDataByUsername(loginData.Username)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when retrieving user information."})
		return
	}

	createdSession, err := auth.CreateSession(userData.ID)
	if err != nil {
		log.Println(err, "error when creating session")
	}

	// Send session back to client in cookie
	c.SetCookie("bid_auth_session", createdSession, 30*60, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Successfully logged in."})
}

func SignUpHandler(c *gin.Context) {
	session, err := c.Cookie("bid_auth_session")
	if err != nil {
		log.Println(err)
	}

	session, err = auth.GetSession(session)
	if err != nil {
		log.Println(err, "session may be empty or error returned")
	}

	// a non-empty session indicates that a user is logged in.
	if strings.TrimSpace(session) != "" {
		c.JSON(http.StatusOK, gin.H{"message": "Already logged in."})
		return
	}

	var signUpData auth_repository.UserData
	if err := c.BindJSON(&signUpData); err != nil {
		log.Println(err, "error when unmarshalling signup data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Cannot unmarshall data."})
		return
	}

	if err := auth.CreateUser(&signUpData); err != nil {
		log.Println(err, "error when signing up")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to sign up. Try again?"})
		return
	}

	createdSession, err := auth.CreateSession(signUpData.ID)
	if err != nil {
		log.Println(err, "error when creating session")
	}

	// Send session back to client in cookie
	c.SetCookie("bid_auth_session", createdSession, 30*60, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Successfully signed up."})
}

func GetUserIDBySessionHandler(c *gin.Context) {
	session, err := c.Cookie("bid_auth_session")
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{"message": "not logged in"})
		return
	}

	session, err = auth.GetSession(session)
	if err != nil {
		log.Println(err, "session may be empty or error returned")
		c.JSON(http.StatusInternalServerError, gin.H{"data": "Session may be empty or internal error occurred."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": session})
}
