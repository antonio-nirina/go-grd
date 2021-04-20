package entity

import (
	"bytes"
	"crypto/sha512"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

const POINT = 20

type User struct {
	Uid       primitive.ObjectID `bson:"uid"`
	FirstName string             `json:"firstname"`
	LastName  string             `json:"lastname"`
	Password  string             `json:"password"`
	Email     string             `json:"email"`
	Username  string             `json:"username"`
	IsBanned  bool               `json:"isBanned"`
	Avatar    string             `json:"avatar,omitempty"`
	Language  string             `json:"language"`
	Point     int                `json:"point"`
}

func (u *User) CreatedHash(plainText string) (hashText string) {
	preparedPlainText := preparePasswordInput(plainText)
	passwordHashInBytes, err := bcrypt.GenerateFromPassword([]byte(preparedPlainText), bcrypt.DefaultCost)

	if err != nil {
		panic(err)
	}

	hashText = string(passwordHashInBytes)

	return hashText
}

func (u *User) VerifyPassword(plainText string, hashText string) (err error) {
	preparedPlainText := preparePasswordInput(plainText)
	plainTextInBytes := []byte(preparedPlainText)
	hashTextInBytes := []byte(hashText)
	err = bcrypt.CompareHashAndPassword(hashTextInBytes, plainTextInBytes)

	return
}

func preparePasswordInput(plainText string) (preparedPasswordInput string) {
	hashedInput := sha512.Sum512_256([]byte(plainText))
	trimmedHash := bytes.Trim(hashedInput[:], "\x00")
	preparedPasswordInput = string(trimmedHash)

	return preparedPasswordInput
}
