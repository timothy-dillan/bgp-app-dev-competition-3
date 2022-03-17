package handlers

import (
	bid "backend/internal/bid"
	bid_repository "backend/repository/bid"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddBidHandler(c *gin.Context) {
	var bidData bid_repository.Bid
	if err := c.BindJSON(&bidData); err != nil {
		log.Println(err, "error when unmarshalling product data")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "cannot unmarshall data"})
		return
	}

	err := bid.CreateBid(&bidData)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": fmt.Sprintf("%s", err)})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully placed bid."})
}

func GetBidsByProductHandler(c *gin.Context) {
	productID, err := strconv.ParseInt(c.Param("product_id"), 10, 64)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when retrieving product id"})
		return
	}

	bids, err := bid.GetBidsByProductID(productID)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when retrieving products"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully retrieved data", "data": bids})
}

func GetBidsByUserHandler(c *gin.Context) {
	userID, err := strconv.ParseInt(c.Param("user_id"), 10, 64)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when retrieving user id"})
		return
	}

	bids, err := bid.GetBidsByUserID(userID)
	if err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "error occurred when retrieving bids"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "successfully retrieved data", "data": bids})
}
