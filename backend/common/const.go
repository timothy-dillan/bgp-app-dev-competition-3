package common

// const for cache-related operations
const (
	// auth-related
	CACHE_SESSION_KEY            = "bid:session:%s"
	CACHE_USER_FROM_USERNAME_KEY = "bid:user_details:username:%s"
	CACHE_USER_FROM_ID_KEY       = "bid:user_details:id:%d"

	// product-related
	CACHE_PRODUCT_DATA_KEY  = "bid:product:%d"
	CACHE_PRODUCTS_KEY      = "bid:products"
	CACHE_USER_PRODUCTS_KEY = "bid:products:user:%d"

	// bid-related
	CACHE_BID_KEY          = "bid:bidding:%d"
	CACHE_PRODUCT_BIDS_KEY = "bid:bidding:product:%d"
	CACHE_USER_BIDS_KEY    = "bid:bidding:user:%d"
)

// const for db-related operations
const (
	// auth queries
	DB_GET_USER_DATA_QUERY               = "SELECT id, display_name, username, password FROM users"
	DB_GET_USER_DATA_FROM_USERNAME_QUERY = DB_GET_USER_DATA_QUERY + " WHERE username = $1"
	DB_GET_USER_DATA_FROM_USER_ID_QUERY  = DB_GET_USER_DATA_QUERY + " WHERE id = $1"
	DB_INSERT_USER_QUERY                 = "INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING id;"

	// products query
	DB_GET_PRODUCTS_QUERY           = "SELECT id, original_owner, owner, image, price_determinant, name, description, start_time, end_time FROM products"
	DB_GET_PRODUCT_BY_ID_QUERY      = DB_GET_PRODUCTS_QUERY + " WHERE id = $1 ORDER BY id desc;"
	DB_GET_PRODUCT_BY_USER_ID_QUERY = DB_GET_PRODUCTS_QUERY + " WHERE owner = $1 or original_owner = $1 ORDER BY id desc;"
	DB_INSERT_PRODUCT_QUERY         = "INSERT INTO products (name, description, image, price_determinant, owner, original_owner, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;"

	// bids query
	DB_GET_BIDS_QUERY              = "SELECT id, bidder, product_id, bidding_price FROM biddings"
	DB_GET_BID_BY_ID_QUERY         = DB_GET_BIDS_QUERY + " WHERE id = $1 ORDER BY id desc;"
	DB_GET_BID_BY_PRODUCT_ID_QUERY = DB_GET_BIDS_QUERY + " WHERE product_id = $1 ORDER BY id desc;"
	DB_GET_BID_BY_USER_ID_QUERY    = "SELECT id, bidder, product_id, bidding_price from biddings b1 WHERE bidder = $1 and id = (select max(id) from biddings where b1.bidder = biddings.bidder) order by id desc;"
	DB_INSERT_BID_QUERY            = "INSERT INTO biddings (bidder, product_id, bidding_price) VALUES ($1, $2, $3) RETURNING id;"
)
