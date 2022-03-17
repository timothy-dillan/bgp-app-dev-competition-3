package internal

import (
	bid_repository "backend/repository/bid"
	"time"
)

type BidData struct {
	bid_repository.Bid
	BidderName         string    `json:"bidder_name"`
	ProductName        string    `json:"product_name"`
	ProductStartTime   time.Time `json:"product_start_time"`
	ProductEndTime     time.Time `json:"product_end_time"`
	ProductImage       string    `json:"product_image"`
	LatestBiddingPrice float64   `json:"latest_bidding_price"`
}
