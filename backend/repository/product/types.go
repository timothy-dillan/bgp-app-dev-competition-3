package auth_repository
import (
	"time"
)

type ProductData struct {
	DisplayName string `json:"display_name"`
	Image    string `json:"image"`
	Price    string `json:"price"`
	Rate    string `json:"rate"`
	StartTime string `json:"start_time"`
	CreatedBy string `json:"created_by"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedBy string `json:"updated_by"`
	UpdatedAt  time.Time `json:"updated_at"`
}