package handler

import (
	"github.com/thoussei/antonio/api/games/handler"
)
type UserViewModel struct {
	Uid           string 			`json:"uid"`
	FirstName     string             `json:"firstname"`
	LastName      string             `json:"lastname"`
	Email         string             `json:"email"`
	Username      string             `json:"username"`
	IsBanned      bool               `json:"isBanned"`
	Avatar        string             `json:"avatar"`
	Language      string             `json:"language"`
	Point         int                `json:"point"`
	Roles      	 []string             `json:"roles"`
	TypeConnexion   string            `json:"type_connexion"`
	Created 		string 			`json:"created"`
}

type UserViewModelGame struct {
	Uid string 			`json:"uid"`
	Email         string             `json:"email"`
	Game 	[]handler.GameViewModel `json:"game"`
}