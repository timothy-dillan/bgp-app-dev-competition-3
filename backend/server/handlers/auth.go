package handlers

import (
	auth "backend/internal/auth"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoginHandler(c *gin.Context) {
	session, err := c.Cookie("bid_auth_session")
	if err != nil {
		log.Println(err)
	}

	loggedIn, err := auth.IsUserLoggedIn(session)
	if err != nil {
		log.Println(err)
	}

	if loggedIn {
		c.JSON(http.StatusOK, gin.H{"message": "loggedin"})
		return
	}

	var loginData auth.LoginData
	if err := c.BindJSON(&loginData); err != nil {
		log.Println(err, "error when unmarshalling login data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "cannot unmarshall data"})
		return
	}

	isValidLogin, err := auth.CheckPassword(loginData.Username, loginData.Password)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when authorizing user"})
		return
	}

	if !isValidLogin {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "invalid username or password"})
		return
	}

	createdSession, err := auth.CreateSession(loginData.Username)
	if err != nil {
		log.Println(err, "error when creating session")
	}

	// Send session back to client in cookie
	c.SetCookie("bid_auth_session", createdSession, 30*60, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "successfully logged in"})
}

func SignUpHandler(c *gin.Context) {
	session, err := c.Cookie("bid_auth_session")
	if err != nil {
		log.Println(err)
	}

	loggedIn, err := auth.IsUserLoggedIn(session)
	if err != nil {
		log.Println(err)
	}

	if loggedIn {
		c.JSON(http.StatusOK, gin.H{"message": "loggedin"})
		return
	}

	var signUpData auth.SignUpData
	if err := c.BindJSON(&signUpData); err != nil {
		log.Println(err, "error when unmarshalling signup data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "cannot unmarshall data"})
		return
	}

	// TODO: validate form data

	// TODO: create new user

	createdSession, err := auth.CreateSession(signUpData.Username)
	if err != nil {
		log.Println(err, "error when creating session")
	}

	// Send session back to client in cookie
	c.SetCookie("bid_auth_session", createdSession, 30*60, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "successfully signed up"})
}
