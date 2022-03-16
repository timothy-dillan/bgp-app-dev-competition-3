package internal

import bid_repository "backend/repository/bid"

func CreateBid(product *bid_repository.Bid) error {
	// TODO : validate bid data
	err := bid_repository.StoreBid(product)
	if err != nil {
		return err
	}

	return nil
}

func GetBidsByProductID(productID int64) ([]bid_repository.Bid, error) {
	bids, err := bid_repository.GetBidsByProductID(productID)
	if err != nil {
		return bids, err
	}

	return bids, nil
}

func GetBidsByUserID(userID int64) ([]bid_repository.Bid, error) {
	bids, err := bid_repository.GetBidsByUserID(userID)
	if err != nil {
		return bids, err
	}

	return bids, nil
}