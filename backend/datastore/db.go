package datastore

import (
	"database/sql"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitializeDB(database, dsn string) error {
	var err error
	DB, err = sql.Open(database, dsn)
	if err != nil {
		return err
	}
	return DB.Ping()
}