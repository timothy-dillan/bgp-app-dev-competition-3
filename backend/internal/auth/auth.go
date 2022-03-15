package internal

import (
	"backend/common"
	auth_repository "backend/repository/auth"
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
)

func GetSession(session string) (string, error) {
	if strings.TrimSpace(session) == "" {
		return "", errors.New("session is empty")
	}

	session, err := auth_repository.GetSession(session)
	if err != nil {
		return "", err
	}

	return session, nil
}

func CheckPassword(username, password string) (bool, error) {
	if strings.TrimSpace(username) == "" || strings.TrimSpace(password) == "" {
		return false, errors.New("empty username or password")
	}

	retUserData, err := auth_repository.GetUserData(username)
	if err != nil {
		return false, err
	}

	return common.ComparePassword(retUserData.Password, password), nil
}

func CreateSession(userID int64) (string, error) {
	if userID <= 0 {
		return "", errors.New("empty user id")
	}

	uuid, err := uuid.NewRandom()
	if err != nil {
		return "", err
	}

	err = auth_repository.StoreSession(fmt.Sprint(userID), uuid.String())
	if err != nil {
		return "", err
	}

	return uuid.String(), nil
}

func CreateUser(userData *auth_repository.UserData) error {
	if strings.TrimSpace(userData.DisplayName) == "" {
		return errors.New("display name is empty")
	}

	if !common.ValidateUsername(userData.Username) || !common.ValidatePassword(userData.Password) {
		return errors.New("invalid username or email format")
	}

	err := auth_repository.StoreUserData(userData)
	if err != nil {
		return err
	}

	return nil
}

func GetUserFromSession(session string) (string, error) {
	if strings.TrimSpace(session) == "" {
		return "", nil
	}

	ss, err := auth_repository.GetSession(session)
	if err != nil {
		return "", err
	}

	return ss, nil
}
