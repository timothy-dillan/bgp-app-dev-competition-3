package main

import (
	"backend/datastore"
	"backend/server"
	"log"
	"time"
)

func main() {
	// TODO: initialize logging

	err := datastore.InitializeDB("postgres", "postgres://user:pass@localhost/bidsys?sslmode=disable")
	if err != nil {
		log.Fatal(err, "couldn't initialize DB connection")
		return
	}
	defer func() {
		if err := datastore.DB.Close(); err != nil {
			log.Println(err, "couldn't close DB connection")
		}
	}()

	err = datastore.InitializeCache(10 * time.Minute)
	if err != nil {
		log.Fatal(err, "couldn't initialize DB connection")
		return
	}
	defer func() {
		if err := datastore.Cache.Close(); err != nil {
			log.Println(err, "couldn't close cache connection")
		}
	}()
	
	err = server.InitHTTP()
	if err != nil {
		log.Fatal(err, "couldn't initialize HTTP endpoints")
		return
	}
}
