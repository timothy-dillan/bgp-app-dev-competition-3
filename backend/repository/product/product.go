package product_repository

import (
	"backend/common"
	"backend/datastore"
	"database/sql"
	"fmt"
	"log"

	jsoniter "github.com/json-iterator/go"
)

func GetProductByID(productID int64) (Product, error)  {
	// get product data from cache
	product, err := getProductByIDFromCache(productID)
	if err == nil {
		return product, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get user data from db
	product, err = getProductByIDFromDB(productID)
	if err != nil {
		return product, nil
	}

	product.storeProductCache()
	return product, nil
}

func getProductByIDFromCache(productID int64) (Product, error) {
	var product Product
	recProduct, err := datastore.Cache.Get(fmt.Sprintf("bid:product:%d", productID))
	if err != nil {
		return Product{}, err
	}

	err = jsoniter.Unmarshal(recProduct, &product)
	if err != nil {
		return Product{}, err
	}

	return product, nil
}

func getProductByIDFromDB(productID int64) (Product, error) {
	var product Product
	err := datastore.DB.QueryRow("SELECT id, original_owner, owner, image, price_determinant, name, description, start_time, end_time FROM products WHERE id = $1", productID).Scan(&product.ID, &product.OriginalOwner, &product.Owner, &product.Image, &product.PriceDeterminant, &product.Name, &product.Description, &product.StartTime, &product.EndTime)
	switch {
	case err == sql.ErrNoRows:
		log.Printf("no product with id %d\n", productID)
	case err != nil:
		log.Fatalf("query error: %v\n", err)
		return Product{}, err
	}
	return product, nil
}

func StoreProduct(p *Product) error {
	err := p.storeProductDB()
	if err != nil {
		return err
	}
	p.storeProductCache()
	return nil
}

func (p Product) storeProductCache() error {
	parsedProduct, err := jsoniter.Marshal(p)
	if err != nil {
		return err
	}
	err = datastore.Cache.Set(fmt.Sprintf(common.CACHE_PRODUCT_DATA_KEY, p.ID), parsedProduct)
	if err != nil {
		return err
	}
	return nil
}

func (p *Product) storeProductDB() error {
	err := datastore.DB.QueryRow(common.DB_INSERT_PRODUCT_QUERY, p.Name, p.Description, p.Image, p.PriceDeterminant, p.Owner, p.OriginalOwner, p.StartTime, p.EndTime).Scan(&p.ID)
	if err != nil {
		return err
	}
	return nil
}
