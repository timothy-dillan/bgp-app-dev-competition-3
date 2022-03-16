package internal

import (
	product_repository "backend/repository/product"
)

type ProductData struct {
	product_repository.Product
	OwnerName    string  `json:"owner"`
	BiddingPrice float64 `json:"bidding_price"`
}
