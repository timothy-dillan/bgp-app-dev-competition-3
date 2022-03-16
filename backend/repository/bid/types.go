package bid_repository

type Bid struct {
	ID           int64   `json:"id"`
	Bidder       int64   `json:"bidder"`
	ProductID    int64   `json:"owner"`
	BiddingPrice float64 `json:"bidding_price"`
}
