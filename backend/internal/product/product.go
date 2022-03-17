package internal

import (
	auth_repository "backend/repository/auth"
	bid_repository "backend/repository/bid"
	product_repository "backend/repository/product"
)

func CreateProduct(product *product_repository.Product) error {
	// TODO : validate product data
	err := product_repository.StoreProduct(product)
	if err != nil {
		return err
	}

	return nil
}

func GetProducts() ([]ProductData, error) {
	products, err := product_repository.GetProducts()
	if err != nil {
		return []ProductData{}, err
	}

	var productDatas []ProductData
	for _, product := range products {
		productData, err := getProductData(product)
		if err != nil {
			return nil, err
		}
		productDatas = append(productDatas, productData)
	}

	return productDatas, nil
}

func GetProductsOwnedByUser(userID int64) ([]product_repository.Product, error) {
	products, err := product_repository.GetProductsOwnedByUser(userID)
	if err != nil {
		return products, err
	}

	return products, nil
}

func GetProductByID(productID int64) (ProductData, error) {
	product, err := product_repository.GetProductByID(productID)
	if err != nil {
		return ProductData{}, err
	}

	productData, err := getProductData(product)
	if err != nil {
		return ProductData{}, err
	}

	return productData, nil
}

func getProductData(product product_repository.Product) (ProductData, error) {
	userData, err := auth_repository.GetUserDataByID(product.Owner)
	if err != nil {
		return ProductData{}, err
	}
	bidData, err := bid_repository.GetBidsByProductID(product.ID)
	if err != nil {
		return ProductData{}, err
	}
	var biddingPrice float64
	if len(bidData) > 0 {
		biddingPrice = bidData[0].BiddingPrice
	}
	productData := ProductData{
		Product:      product,
		OwnerName:    userData.DisplayName,
		BiddingPrice: biddingPrice,
	}
	return productData, nil
}
