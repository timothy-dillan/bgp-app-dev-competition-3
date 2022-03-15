package internal

import (
	"backend/common"
	auth_repository "backend/repository/auth"
	"errors"
	"strings"

	"github.com/google/uuid"
)

func IsUserLoggedIn(session string) (bool, error) {
	if strings.TrimSpace(session) == "" {
		return false, nil
	}

	_, err := auth_repository.GetSession(session)
	if err != nil {
		return false, err
	}

	return true, nil
}

func CheckPassword(username, password string) (bool, error) {
	if strings.TrimSpace(username) == "" || strings.TrimSpace(password) == "" {
		return false, errors.New("empty username or password")
	}

	hashedPassword, err := auth_repository.GetPassword(username)
	if err != nil {
		return false, err
	}

	return common.ComparePassword(hashedPassword, password), nil
}

func CreateSession(username string) (string, error) {
	if strings.TrimSpace(username) == "" {
		return "", errors.New("empty username")
	}

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

func CreateUser(userData auth_repository.UserData) error {
	if strings.TrimSpace(userData.DisplayName) == "" {
		return errors.New("display name is empty")
	}
	
	if !common.ValidateUsername(userData.Username) || !common.ValidatePassword(userData.Password) {
		return errors.New("invalid username or email format")
	}

	err := auth_repository.StoreUser(userData)
	if err != nil {
		return err
	}
	
	return nil
}
