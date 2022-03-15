package internal

import "fmt"

// pr_repository "backend/repository/product"

func StoreProduct(product ProductData, userID string) (bool, error) {
	fmt.Println(product, userID)
	// err := pr_repository.Store(product, userID)
	// if err != nil {
	// 	return false, err
	// }

	return true, nil
}
