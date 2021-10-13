package entity

import (
	"bytes"
	"crypto/sha512"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	game "github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

const (
	POINT = 20
)

type User struct {
	Uid               primitive.ObjectID `bson:"uid"`
	FirstName         string             `json:"firstname,omitempty"`
	LastName          string             `json:"lastname,omitempty"`
	Password          string             `json:"password"`
	Email             string             `json:"email"`
	Username          string             `json:"username"`
	IsBanned          bool               `json:"isBanned"`
	Avatar            string             `json:"avatar,omitempty"`
	Language          string             `json:"language,omitempty"`
	IdGameAccount     []game.GameAccount `json:"idGameAccount,omitempty"`
	Point             int                `json:"point"`
	Roles             []string           `json:"roles"`
	TypeConnexion     string             `json:"type_connexion"`
	Created           string             `json:"created"`
	Country           string             `json:"country,omitempty"`
	ConfirmationToken string             `json:"confirmation_token,omitempty"`
	Friends           []User             `json:"friends,omitempty"`
	Accounts          []Accounts         `json:"accounts,omitempty"`
	Games             []game.Game        `json:"games,omitempty"`
	BirtDate          string             `json:"birtDate,omitempty"`
}

func (u *User) CreatedHash(plainText string) (hashText string) {
	preparedPlainText := preparePasswordInput(plainText)
	passwordHashInBytes, err := bcrypt.GenerateFromPassword([]byte(preparedPlainText), bcrypt.DefaultCost)

	if err != nil {
		external.Logger("encrypted err")
		fmt.Println(err)
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
