package internal

import (
	"time"
)

type ProductData struct {
	DisplayName string    `json:"display_name"`
	Image       string    `json:"image"`
	Price       int       `json:"price"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"End_time"`
}
