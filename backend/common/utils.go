package common

import "golang.org/x/crypto/bcrypt"

func GetHashedPassword(password string) string {
	bytePass := []byte(password)
	hPass, _ := bcrypt.GenerateFromPassword(bytePass, bcrypt.DefaultCost)
	return string(hPass)
}

func ComparePassword(hashedPassword, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)) == nil
}

func ValidatePassword() {
	panic("implement me")
}

func ValidateUsername() {
	panic("implement me")
}