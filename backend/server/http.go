package server

import (
	"backend/server/handlers"

	"github.com/gin-gonic/gin"
)

func InitHTTP() error {
	router := gin.Default()
	router.Use(CORSMiddleware())

	// TODO: add routes
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.POST("/login", handlers.LogInHandler)
	router.POST("/signup", handlers.SignUpHandler)

	// TODO: Authentication for user-only accessible features
	/*
		resource := router.Group("/")
		resource.Use(middleware.Authenticate())
		{
			resource.GET("/login", middleware.Authorize("resource", "read", roleAdapter), handlers.LogInHandler)
			resource.GET("/signup", middleware.Authorize("resource", "read", roleAdapter), handlers.SignUpHandler)
		}
	*/

	err := router.Run()
	if err != nil {
		return err
	}

	return nil
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "http://localhost:4000")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
