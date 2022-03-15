package common

// const for cache-related operations
const (
	CACHE_SESSION_KEY      = "bid:session:%s"
	CACHE_USER_DATA_KEY    = "bid:user_details:%s"
	CACHE_PRODUCT_DATA_KEY = "bid:product:%d"
)

// const for db-related operations
const (
	DB_GET_USER_DATA_FROM_USERNAME_QUERY = "SELECT id, display_name, username, password FROM users WHERE username = $1"
	DB_INSERT_USER_QUERY                 = "INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING id;"
	DB_INSERT_PRODUCT_QUERY              = "INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING id;"
)
