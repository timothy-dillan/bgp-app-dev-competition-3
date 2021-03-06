package auth_repository

import (
	"backend/common"
	"backend/datastore"
	"database/sql"
	"fmt"
	"log"

	jsoniter "github.com/json-iterator/go"
)

func GetUserDataByUsername(username string) (UserData, error) {
	// get user data from cache
	userData, err := getUserDataByUsernameCache(username)
	if err == nil {
		return userData, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get user data from db
	userData, err = getUserDataByUsernameDB(username)
	if err != nil {
		return UserData{}, nil
	}

	userData.storeUserDataCache()
	return userData, nil
}

func GetUserDataByID(userID int64) (UserData, error) {
	// get user data from cache
	userData, err := getUserDataByIDCache(userID)
	if err == nil {
		return userData, nil
	}

	log.Println(err, "got error from cache, retrieving from DB")

	// get user data from db
	userData, err = getUserDataByIDDB(userID)
	if err != nil {
		return UserData{}, nil
	}

	userData.storeUserDataCache()
	return userData, nil
}

func StoreSession(userID, session string) error {
	err := datastore.Cache.Set(fmt.Sprintf(common.CACHE_SESSION_KEY, session), []byte(userID))
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

func StoreUserData(user *UserData) error {
	err := user.storeUserDataDB()
	if err != nil {
		return err
	}
	user.storeUserDataCache()
	return nil
}

func (u UserData) storeUserDataCache() error {
	parsedUserData, err := jsoniter.Marshal(u)
	if err != nil {
		return err
	}
	err = datastore.Cache.Set(fmt.Sprintf(common.CACHE_USER_FROM_USERNAME_KEY, u.Username), parsedUserData)
	if err != nil {
		return err
	}
	err = datastore.Cache.Set(fmt.Sprintf(common.CACHE_USER_FROM_ID_KEY, u.ID), parsedUserData)
	if err != nil {
		return err
	}
	return nil
}

func getUserDataByUsernameCache(username string) (UserData, error) {
	var data UserData
	userData, err := datastore.Cache.Get(fmt.Sprintf(common.CACHE_USER_FROM_USERNAME_KEY, username))
	if err != nil {
		return UserData{}, err
	}
	err = jsoniter.Unmarshal(userData, &data)
	if err != nil {
		return UserData{}, err
	}
	return data, nil
}

func getUserDataByIDCache(userID int64) (UserData, error) {
	var data UserData
	userData, err := datastore.Cache.Get(fmt.Sprintf(common.CACHE_USER_FROM_ID_KEY, userID))
	if err != nil {
		return UserData{}, err
	}
	err = jsoniter.Unmarshal(userData, &data)
	if err != nil {
		return UserData{}, err
	}
	return data, nil
}

func (u *UserData) storeUserDataDB() error {
	u.Password = common.GetHashedPassword(u.Password)
	err := datastore.DB.QueryRow(common.DB_INSERT_USER_QUERY, u.DisplayName, u.Username, u.Password).Scan(&u.ID)
	if err != nil {
		return err
	}
	return nil
}

func getUserDataByUsernameDB(username string) (UserData, error) {
	var data UserData
	err := datastore.DB.QueryRow(common.DB_GET_USER_DATA_FROM_USERNAME_QUERY, username).Scan(&data.ID, &data.DisplayName, &data.Username, &data.Password)
	switch {
	case err == sql.ErrNoRows:
		log.Printf("no user with username %s\n", username)
	case err != nil:
		log.Fatalf("query error: %v\n", err)
		return UserData{}, err
	}
	return data, nil
}

func getUserDataByIDDB(userID int64) (UserData, error) {
	var data UserData
	err := datastore.DB.QueryRow(common.DB_GET_USER_DATA_FROM_USER_ID_QUERY, userID).Scan(&data.ID, &data.DisplayName, &data.Username, &data.Password)
	switch {
	case err == sql.ErrNoRows:
		log.Printf("no user with id %d\n", userID)
	case err != nil:
		log.Fatalf("query error: %v\n", err)
		return UserData{}, err
	}
	return data, nil
}
