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
