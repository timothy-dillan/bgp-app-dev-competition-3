package server

import (
	"backend/server/handlers"

	"github.com/gin-gonic/gin"
)

func InitHTTP() error {
	router := gin.Default()

	// TODO: add routes
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.GET("/login", handlers.LoginHandler)
	router.GET("/signup", handlers.SignUpHandler)

	// TODO: Authentication for user-only accessible features
	/*
		resource := router.Group("/")
		resource.Use(middleware.Authenticate())
		{
			resource.GET("/login", middleware.Authorize("resource", "read", roleAdapter), handlers.LoginHandler)
			resource.GET("/signup", middleware.Authorize("resource", "read", roleAdapter), handlers.SignUpHandler)
		}
	*/

	err := router.Run()
	if err != nil {
		return err
	}

	return nil
}
