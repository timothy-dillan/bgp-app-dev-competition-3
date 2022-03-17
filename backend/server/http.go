package server

import (
	"backend/server/handlers"
	"backend/server/middleware"

	"github.com/gin-gonic/gin"
)

func InitHTTP() error {
	router := gin.Default()
	router.Use(middleware.CORSConfiguration())

	// General endpoints which can be access by all.
	router.POST("/login", handlers.LogInHandler)
	router.POST("/signup", handlers.SignUpHandler)
	router.GET("/user_id/from_session", middleware.Authenticate(), handlers.GetUserIDBySessionHandler)
	router.GET("/product/all", handlers.GetAllProductsHandler)

	// Product-related endpoints accessible only to users
	productEndpoints := router.Group("/product")
	productEndpoints.Use(middleware.Authenticate())
	{
		productEndpoints.POST("/add", handlers.AddProductHandler)
		productEndpoints.GET("/owner/:user_id", handlers.GetProductByUserIDHandler)
		productEndpoints.GET("/detail/:product_id", handlers.GetProductByIDHandler)
	}

	// Bid-related endpoints accessible only to users
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
