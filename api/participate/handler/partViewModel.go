package handler

import (
	thandler "github.com/thoussei/antonio/api/tournament/handler"
	user "github.com/thoussei/antonio/api/user/handler"
	team "github.com/thoussei/antonio/api/teams/handler"
)

type partViewModel struct {
	Uid         string 							`json:"uid"`
	Date 		string            				`json:"date"`
	User 		user.UserViewModel 				`json:"user"`
	Team 		[]team.TeamViewModel 			`json:"team"`
	Tournament  thandler.TournamentViewModel 	`json:"tournament"`
	NumberPartConfirmed bool 					`json:"numberPartConfirmed"`
}

type ReacordsPartModel struct {
	RecordsPart int `json:"recordsPart"`
	ReacordsnumberPartConfirmed  int `json:"reacordsnumberPartConfirmed"`
}