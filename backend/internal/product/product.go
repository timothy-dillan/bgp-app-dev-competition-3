package internal

import product_repository "backend/repository/product"

func CreateProduct(product *product_repository.Product) error {
	// TODO : validate product data
	err := product_repository.StoreProduct(product)
	if err != nil {
		return err
	}

	return nil
}

func GetProducts() ([]product_repository.Product, error) {
	products, err := product_repository.GetProducts()
	if err != nil {
		return products, err
	}

	return products, nil
}

func GetProductsOwnedByUser(userID int64) ([]product_repository.Product, error) {
	products, err := product_repository.GetProductsOwnedByUser(userID)
	if err != nil {
		return products, err
	}

	return products, nil
}
