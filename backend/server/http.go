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
	router.GET("/user_id/from_session", handlers.GetUserIDBySessionHandler)
	router.GET("/product/all", handlers.GetAllProductsHandler)

	productEndpoints := router.Group("/product")
	productEndpoints.Use(middleware.Authenticate())
	{
		productEndpoints.POST("/add", handlers.AddProductHandler)
		productEndpoints.GET("/owner/:user_id", handlers.GetProductByUserIDHandler)
		productEndpoints.GET("/detail/:product_id", handlers.GetProductByIDHandler)
	}

	bidEndpoints := router.Group("/bid")
	bidEndpoints.Use(middleware.Authenticate())
	{
		bidEndpoints.POST("/add", handlers.AddBidHandler)
		bidEndpoints.GET("/product/:product_id", handlers.GetBidsByProductHandler)
		bidEndpoints.GET("/user/:user_id", handlers.GetBidsByUserHandler)
	}

	err := router.Run()
	if err != nil {
		return err
	}

	return nil
}
