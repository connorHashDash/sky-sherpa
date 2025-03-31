package encrypt

import (
	"crypto/rand"
	"encoding/base64"
	"log"

	"golang.org/x/crypto/bcrypt"
)

/*
	Any sort of logice pertaining to the user auth, token generation and general
	encryption/decryption goes in here.
*/

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

func ValidatePassword(hash string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func SessionTokenGenerate(len int) string {
	bytes := make([]byte, len)
	if _, err := rand.Read(bytes); err != nil {
		log.Fatalf("Failed to Generate Token\n %T", err)
	}

	return base64.RawURLEncoding.EncodeToString(bytes)
}
