package handler

import (
	thandler "github.com/thoussei/antonio/api/tournament/handler"
	user "github.com/thoussei/antonio/api/user/handler"
)

type partViewModel struct {
	Uid         string 							`json:"uid"`
	Date 		string            				`json:"date"`
	User 		user.UserViewModel 				`json:"user"`
	Tournament  thandler.TournamentViewModel 	`json:"tournament"`
}