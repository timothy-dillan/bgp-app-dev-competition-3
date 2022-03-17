package handlers

import (
	product "backend/internal/product"
	product_repository "backend/repository/product"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddProductHandler(c *gin.Context) {
	var productData product_repository.Product
	if err := c.BindJSON(&productData); err != nil {
		log.Println(err, "error when unmarshalling product data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Cannot unmarshall data."})
		return
	}

	err := product.CreateProduct(&productData)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when storing product."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully stored"})
}

func GetAllProductsHandler(c *gin.Context) {
	products, err := product.GetProducts()
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when retrieving products."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully retrieved products.", "data": products})
}

func GetProductByUserIDHandler(c *gin.Context) {
	userID, err := strconv.ParseInt(c.Param("user_id"), 10, 64)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when retrieving user ID."})
		return
	}

	products, err := product.GetProductsOwnedByUser(userID)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when retrieving products."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully retrieved products.", "data": products})
}

func GetProductByIDHandler(c *gin.Context) {
	productID, err := strconv.ParseInt(c.Param("product_id"), 10, 64)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when retrieving product ID."})
		return
	}

	product, err := product.GetProductByID(productID)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Error occurred when retrieving products."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully retrieved products.", "data": product})
}
