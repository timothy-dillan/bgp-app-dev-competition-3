package common

// const for cache-related operations
const (
	CACHE_SESSION_KEY       = "bid:session:%s"
	CACHE_USER_DATA_KEY     = "bid:user_details:%s"
	CACHE_PRODUCT_DATA_KEY  = "bid:product:%d"
	CACHE_PRODUCTS_KEY      = "bid:products"
	CACHE_USER_PRODUCTS_KEY = "bid:products:user:%d"
)

// const for db-related operations
const (
	DB_GET_USER_DATA_FROM_USERNAME_QUERY = "SELECT id, display_name, username, password FROM users WHERE username = $1"
	DB_INSERT_USER_QUERY                 = "INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING id;"
	DB_INSERT_PRODUCT_QUERY              = "INSERT INTO products (name, description, image, price_determinant, owner, original_owner, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;"
	DB_GET_PRODUCTS_QUERY                = "SELECT id, original_owner, owner, image, price_determinant, name, description, start_time, end_time FROM products"
	DB_GET_PRODUCT_BY_ID_QUERY           = DB_GET_PRODUCTS_QUERY + " WHERE id = $1"
	DB_GET_PRODUCT_BY_USER_ID_QUERY      = DB_GET_PRODUCTS_QUERY + " WHERE owner = $1 or original_owner = $1"
)
