package internal

import (
	auth_repository "backend/repository/auth"
	bid_repository "backend/repository/bid"
	product_repository "backend/repository/product"
	"errors"
	"fmt"
)

func CreateBid(bid *bid_repository.Bid) error {
	// TODO : validate bid data

	existingBids, err := bid_repository.GetBidsByProductID(bid.ProductID)
	if err != nil {
		return err
	}

	for _, existingBid := range existingBids {
		if bid.BiddingPrice <= existingBid.BiddingPrice {
			return errors.New("Your bid must be higher than the previous bid.")
		}
	}

	err = bid_repository.StoreBid(bid)
	if err != nil {
		fmt.Println(err)
		return errors.New("Couldn't create bid. If this issue reoccurs, please relogin.")
	}

	return nil
}

func GetBidsByProductID(productID int64) ([]BidData, error) {
	bids, err := bid_repository.GetBidsByProductID(productID)
	if err != nil {
		return []BidData{}, err
	}

	var bidDatas []BidData
	for _, bid := range bids {
		bidData, err := getBidData(bid)
		if err != nil {
			return []BidData{}, err
		}
		bidDatas = append(bidDatas, bidData)
	}

	return bidDatas, nil
}

func GetBidsByUserID(userID int64) ([]BidData, error) {
	bids, err := bid_repository.GetBidsByUserID(userID)
	if err != nil {
		return []BidData{}, err
	}

	var bidDatas []BidData
	for _, bid := range bids {
		bidData, err := getBidData(bid)
		if err != nil {
			return []BidData{}, err
		}
		bidDatas = append(bidDatas, bidData)
	}

	return bidDatas, nil
}

func getBidData(bid bid_repository.Bid) (BidData, error) {
	userData, err := auth_repository.GetUserDataByID(bid.Bidder)
	if err != nil {
		return BidData{}, err
	}
	productData, err := product_repository.GetProductByID(bid.ProductID)
	if err != nil {
		return BidData{}, err
	}
	productBids, err := bid_repository.GetBidsByProductID(bid.ProductID)
	if err != nil {
		return BidData{}, err
	}
	var latestBiddingPrice float64
	if len(productBids) >= 0 {
		latestBiddingPrice = productBids[0].BiddingPrice
	}
	bidData := BidData{
		Bid:                bid,
		BidderName:         userData.DisplayName,
		ProductName:        productData.Name,
		ProductStartTime:   productData.StartTime,
		ProductEndTime:     productData.EndTime,
		ProductImage:       productData.Image,
		LatestBiddingPrice: latestBiddingPrice,
	}
	return bidData, nil
}
