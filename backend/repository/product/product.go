package product_repository

import (
	"backend/common"
	"backend/datastore"
	"database/sql"
	"fmt"
	"log"

	jsoniter "github.com/json-iterator/go"
)

func GetProducts() ([]Product, error) {
	// get product data from cache
	products, err := getProductsFromCache(common.CACHE_PRODUCTS_KEY)
	if err == nil {
		return products, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get product data from db
	products, err = getProductsFromDB(common.DB_GET_PRODUCTS_QUERY)
	if err != nil {
		return products, nil
	}

	storeProductsCache(common.CACHE_PRODUCTS_KEY, products)
	return products, nil
}

func GetProductsOwnedByUser(userID int64) ([]Product, error) {
	// get product data from cache
	key := fmt.Sprintf(common.CACHE_USER_PRODUCTS_KEY, userID)
	products, err := getProductsFromCache(key)
	if err == nil {
		return products, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get product data from db
	products, err = getProductsFromDB(common.DB_GET_PRODUCT_BY_USER_ID_QUERY, userID)
	if err != nil {
		return products, nil
	}

	storeProductsCache(key, products)
	return products, nil
}

func getProductsFromCache(key string) ([]Product, error) {
	var product []Product
	recProducts, err := datastore.Cache.Get(key)
	if err != nil {
		return []Product{}, err
	}

	err = jsoniter.Unmarshal(recProducts, &product)
	if err != nil {
		return []Product{}, err
	}

	return product, nil
}

func getProductsFromDB(query string, args ...interface{}) ([]Product, error) {
	var products []Product
	rows, err := datastore.DB.Query(query, args...)
	switch {
	case err == sql.ErrNoRows:
		log.Printf("no products")
	case err != nil:
		log.Fatalf("query error: %v\n", err)
		return []Product{}, err
	}

	for rows.Next() {
		var product Product
		err = rows.Scan(&product.ID, &product.OriginalOwner, &product.Owner, &product.Image, &product.PriceDeterminant, &product.Name, &product.Description, &product.StartTime, &product.EndTime)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	return products, nil
}

func GetProductByID(productID int64) (Product, error) {
	// get product data from cache
	product, err := getProductByIDFromCache(productID)
	if err == nil {
		return product, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get product data from db
	product, err = getProductByIDFromDB(productID)
	if err != nil {
		return product, nil
	}

	product.storeProductCache()
	return product, nil
}

func getProductByIDFromCache(productID int64) (Product, error) {
	var product Product
	recProduct, err := datastore.Cache.Get(fmt.Sprintf(common.CACHE_PRODUCT_DATA_KEY, productID))
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
	err := datastore.DB.QueryRow(common.DB_GET_PRODUCT_BY_ID_QUERY, productID).Scan(&product.ID, &product.OriginalOwner, &product.Owner, &product.Image, &product.PriceDeterminant, &product.Name, &product.Description, &product.StartTime, &product.EndTime)
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
	// invalidate cache to refresh overall data
	datastore.Cache.Delete(common.CACHE_PRODUCTS_KEY)
	datastore.Cache.Delete(fmt.Sprintf(common.CACHE_USER_PRODUCTS_KEY, p.OriginalOwner))
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

func storeProductsCache(key string, p []Product) error {
	parsedProduct, err := jsoniter.Marshal(p)
	if err != nil {
		return err
	}
	err = datastore.Cache.Set(key, parsedProduct)
	if err != nil {
		return err
	}
	return nil
}
