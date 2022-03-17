package bid_repository

import (
	"backend/common"
	"backend/datastore"
	"database/sql"
	"fmt"
	"log"

	jsoniter "github.com/json-iterator/go"
)

func GetBidsByProductID(productID int64) ([]Bid, error) {
	// get bid data from cache
	key := fmt.Sprintf(common.CACHE_PRODUCT_BIDS_KEY, productID)
	products, err := getBidsFromCache(key)
	if err == nil {
		return products, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get bid data from db
	products, err = getBidsFromDB(common.DB_GET_BID_BY_PRODUCT_ID_QUERY, productID)
	if err != nil {
		return products, nil
	}

	storeBidsCache(key, products)
	return products, nil

}

func GetBidByID(bidID int64) (Bid, error) {
	// get bid data from cache
	bid, err := getBidByIDFromCache(bidID)
	if err == nil {
		return bid, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get bid data from db
	bid, err = getBidByIDFromDB(bidID)
	if err != nil {
		return bid, nil
	}

	bid.storeBidCache()
	return bid, nil
}

func GetBidsByUserID(userID int64) ([]Bid, error) {
	// get bid data from cache
	key := fmt.Sprintf(common.CACHE_USER_BIDS_KEY, userID)
	products, err := getBidsFromCache(key)
	if err == nil {
		return products, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get bid data from db
	products, err = getBidsFromDB(common.DB_GET_BID_BY_USER_ID_QUERY, userID)
	if err != nil {
		return products, nil
	}

	storeBidsCache(key, products)
	return products, nil
}

func getBidsFromCache(key string) ([]Bid, error) {
	var bids []Bid
	recBids, err := datastore.Cache.Get(key)
	if err != nil {
		return []Bid{}, err
	}

	err = jsoniter.Unmarshal(recBids, &bids)
	if err != nil {
		return []Bid{}, err
	}

	return bids, nil
}

func getBidsFromDB(query string, args ...interface{}) ([]Bid, error) {
	var bids []Bid
	rows, err := datastore.DB.Query(query, args...)
	switch {
	case err == sql.ErrNoRows:
		log.Printf("no bids")
	case err != nil:
		log.Fatalf("query error: %v\n", err)
		return []Bid{}, err
	}

	for rows.Next() {
		var bid Bid
		err = rows.Scan(&bid.ID, &bid.Bidder, &bid.ProductID, &bid.BiddingPrice)
		if err != nil {
			return nil, err
		}
		bids = append(bids, bid)
	}

	return bids, nil
}

func getBidByIDFromCache(bidID int64) (Bid, error) {
	var product Bid
	recBid, err := datastore.Cache.Get(fmt.Sprintf(common.CACHE_BID_KEY, bidID))
	if err != nil {
		return Bid{}, err
	}

	err = jsoniter.Unmarshal(recBid, &product)
	if err != nil {
		return Bid{}, err
	}

	return product, nil
}

func getBidByIDFromDB(bidID int64) (Bid, error) {
	var bid Bid
	err := datastore.DB.QueryRow(common.DB_GET_PRODUCT_BY_ID_QUERY, bidID).Scan(&bid.ID, &bid.Bidder, &bid.ProductID, &bid.BiddingPrice)
	switch {
	case err == sql.ErrNoRows:
		log.Printf("no bid with id %d\n", bidID)
	case err != nil:
		log.Fatalf("query error: %v\n", err)
		return Bid{}, err
	}
	return bid, nil
}

func StoreBid(b *Bid) error {
	err := b.storeBidDB()
	if err != nil {
		return err
	}
	// invalidate cache to refresh overall data
	datastore.Cache.Delete(fmt.Sprintf(common.CACHE_PRODUCT_BIDS_KEY, b.ProductID))
	b.storeBidCache()
	return nil
}

func (b Bid) storeBidCache() error {
	parsedBid, err := jsoniter.Marshal(b)
	if err != nil {
		return err
	}
	err = datastore.Cache.Set(fmt.Sprintf(common.CACHE_BID_KEY, b.ID), parsedBid)
	if err != nil {
		return err
	}
	return nil
}

func (b *Bid) storeBidDB() error {
	err := datastore.DB.QueryRow(common.DB_INSERT_BID_QUERY, b.Bidder, b.ProductID, b.BiddingPrice).Scan(&b.ID)
	if err != nil {
		return err
	}
	return nil
}

func storeBidsCache(key string, b []Bid) error {
	parsedBid, err := jsoniter.Marshal(b)
	if err != nil {
		return err
	}
	err = datastore.Cache.Set(key, parsedBid)
	if err != nil {
		return err
	}
	return nil
}
