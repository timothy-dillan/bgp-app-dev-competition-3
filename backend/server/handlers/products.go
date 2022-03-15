package handlers

import (
	pr "backend/internal/product"
	auth "backend/internal/auth"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ProductAddHandler(c *gin.Context) {
	session, err := c.Cookie("bid_auth_session")
	if err != nil {
		log.Println(err)
	}

	user, err := auth.GetUserFromSession(session)
	if err != nil {
		log.Println(err)
	}

	var productData pr.ProductData
	if err := c.BindJSON(&productData); err != nil {
		log.Println(err, "error when unmarshalling product data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "cannot unmarshall data"})
		return
	}

	isStored, err := pr.StoreProduct(productData, user)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when storing product"})
		return
	}

	if !isStored {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "product failed to save"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully stored"})
}
