package common

import (
	"math"
	"strings"

	"regexp"

	"golang.org/x/crypto/bcrypt"
)

var (
	USERNAME_VALIDATION_REGEXP = regexp.MustCompile(`^[\w-]+$`)
	PASSWORD_VALIDATION_REGEXP = regexp.MustCompile(`^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$`)
)

func GetHashedPassword(password string) string {
	bytePass := []byte(password)
	hPass, _ := bcrypt.GenerateFromPassword(bytePass, bcrypt.DefaultCost)
	return string(hPass)
}

func ComparePassword(hashedPassword, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)) == nil
}

func ValidateUsername(username string) bool {
	return USERNAME_VALIDATION_REGEXP.MatchString(username)
}

func ValidatePassword(username string) bool {
	return !PASSWORD_VALIDATION_REGEXP.MatchString(username)
}

func MaskName(name string) string {
	split := strings.Split(name, " ")
	outputArr := []string{}
	for _, text := range split {
		length := len(text)
		halfLengthRoundUp := int(math.Ceil(float64(length) / float64(2)))
		if halfLengthRoundUp > 4 {
			// Get first 4 char
			res := text[0:4]
			asterisk := strings.Repeat("*", length-4)
			outputArr = append(outputArr, res+asterisk)
		} else {
			// Get first half length char
			res := text[0:halfLengthRoundUp]
			asterisk := strings.Repeat("*", length-halfLengthRoundUp)
			outputArr = append(outputArr, res+asterisk)
		}
	}
	return strings.Join(outputArr, " ")
}
