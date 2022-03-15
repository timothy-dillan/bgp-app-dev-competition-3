package handlers

import (
	product "backend/internal/product"
	product_repository "backend/repository/product"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddProductHandler(c *gin.Context) {
	var productData product_repository.Product
	if err := c.BindJSON(&productData); err != nil {
		log.Println(err, "error when unmarshalling product data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "cannot unmarshall data"})
		return
	}

	err := product.CreateProduct(&productData)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when storing product"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully stored"})
}

func GetProductsHandler(c *gin.Context) {
	products, err := product.GetProducts()
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when retrieving products"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully retrieved data", "data": products})
}
