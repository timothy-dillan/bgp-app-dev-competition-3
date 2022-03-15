package auth_repository

import (
	"backend/common"
	"backend/datastore"
	"database/sql"
	"fmt"
	"log"
)

func GetPassword(username string) (string, error) {
	hashedPassword, err := getPasswordFromUsernameCache(username)
	if err == nil {
		return hashedPassword, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	hashedPassword, err = getPasswordFromUsernameDB(username)
	if err != nil {
		return "", err
	}

	_ = storePasswordCache(username, hashedPassword)

	return hashedPassword, nil
}

func StoreSession(username, session string) error {
	err := datastore.Cache.Set(fmt.Sprintf(common.CACHE_SESSION_KEY, session), []byte(username))
	if err != nil {
		return err
	}
	return nil
}

func GetSession(session string) (string, error) {
	retrievedSession, err := datastore.Cache.Get(fmt.Sprintf(common.CACHE_SESSION_KEY, session))
	if err != nil {
		return "", err
	}
	return string(retrievedSession), nil
}

func getPasswordFromUsernameCache(username string) (string, error) {
	hashedPassword, err := datastore.Cache.Get(fmt.Sprintf(common.CACHE_PASSWORD_KEY, username))
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func storePasswordCache(username, password string) error {
	err := datastore.Cache.Set(fmt.Sprintf(common.CACHE_PASSWORD_KEY, username), []byte(password))
	if err != nil {
		return err
	}
	return nil
}

func getPasswordFromUsernameDB(username string) (string, error) {
	var hashedPassword string
	err := datastore.DB.QueryRow(common.DB_GET_PASSWORD_FROM_USERNAME_QUERY, username).Scan(&hashedPassword)
	switch {
	case err == sql.ErrNoRows:
		log.Printf("no user with username %s\n", username)
	case err != nil:
		log.Fatalf("query error: %v\n", err)
		return "", err
	}
	return hashedPassword, nil
}

func StoreUser(user UserData) error {
	_, err := datastore.DB.Exec(common.DB_INSERT_USER_QUERY, user.DisplayName, user.Username, user.Password)
	if err != nil {
		return err
	}
	return nil
}
