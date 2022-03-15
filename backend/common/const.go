package common

// const for cache-related operations
const (
	CACHE_SESSION_KEY  = "bid:session:%s"
	CACHE_PASSWORD_KEY = "bid:%s:password"
)

// const for db-related operations
const (
	DB_GET_PASSWORD_FROM_USERNAME_QUERY = "SELECT password FROM users WHERE username = $1"
	DB_INSERT_USER_QUERY                = "INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3);"
)
