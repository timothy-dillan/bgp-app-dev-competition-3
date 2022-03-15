package server

import (
	"backend/server/handlers"
	"backend/server/middleware"

	"github.com/gin-gonic/gin"
)

func InitHTTP() error {
	router := gin.Default()
	router.Use(middleware.CORSConfiguration())

	// TODO: add routes
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.POST("/login", handlers.LogInHandler)
	router.POST("/signup", handlers.SignUpHandler)

	productEndpoints := router.Group("/product")
	productEndpoints.Use(middleware.Authenticate())
	{
		productEndpoints.POST("/add", handlers.AddProductHandler)
		productEndpoints.GET("/all", handlers.GetProductsHandler)
	}

	err := router.Run()
	if err != nil {
		return err
	}

	return nil
}
