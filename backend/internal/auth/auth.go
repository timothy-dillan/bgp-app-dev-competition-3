package internal

import (
	"backend/common"
	auth_repository "backend/repository/auth"

	"github.com/google/uuid"
)

func IsUserLoggedIn(session string) (bool, error) {
	_, err := auth_repository.GetSession(session)
	if err != nil {
		return false, err
	}
	return true, nil
}

func CheckPassword(username, password string) (bool, error) {
	hashedPassword, err := auth_repository.GetPassword(username)
	if err != nil {
		return false, err
	}
	return common.ComparePassword(hashedPassword, password), nil
}

func CreateSession(username string) (string, error) {
	uuid, err := uuid.NewRandom()
	if err != nil {
		return "", err
	}

	err = auth_repository.StoreSession(username, uuid.String())
	if err != nil {
		return "", err
	}

	return uuid.String(), nil
}
