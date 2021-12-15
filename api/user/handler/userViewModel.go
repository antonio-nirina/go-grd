package handler

import (
	"github.com/thoussei/antonio/api/games/handler"
)
type UserViewModel struct {
	Uid           string 			`json:"uid"`
	FirstName     string             `json:"firstname,omitempty"`
	LastName      string             `json:"lastname,omitempty"`
	Email         string             `json:"email,omitempty"`
	Username      string             `json:"username,omitempty"`
	IsBanned      bool               `json:"isBanned,omitempty"`
	Avatar        string             `json:"avatar,omitempty"`
	Language      string             `json:"language,omitempty"`
	Point         int                `json:"point,omitempty"`
	Roles      	 []string             `json:"roles,omitempty"`
	TypeConnexion   string            `json:"type_connexion,omitempty"`
	Created 		string 			`json:"created,omitempty"`
}

type UserViewModelGame struct {
	Uid string 			`json:"uid"`
	Email         string             `json:"email"`
	Game 	[]handler.GameViewModel `json:"game"`
}