package product_repository

import "time"

type Product struct {
	PriceDeterminant int       `json:"price_determinant"`
	ID               int64     `json:"id"`
	OriginalOwner    int64     `json:"original_owner"`
	Owner            int64     `json:"owner"`
	Image            string    `json:"image"`
	Name             string    `json:"name"`
	Description      string    `json:"description"`
	StartTime        time.Time `json:"start_time"`
	EndTime          time.Time `json:"end_time"`
}
