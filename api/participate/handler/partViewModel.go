package handler

import (
	team "github.com/thoussei/antonio/api/teams/handler"
	thandler "github.com/thoussei/antonio/api/tournament/handler"
	user "github.com/thoussei/antonio/api/user/handler"
	whandler "github.com/thoussei/antonio/api/wagger/handler"
)

type partViewModel struct {
	Uid                 string                       `json:"uid"`
	Date                string                       `json:"date"`
	User                user.UserViewModel           `json:"user"`
	Team                []team.TeamViewModel         `json:"team"`
	IsWin               bool                         `json:"isWin"`
	Wagger              whandler.WaggerViewModel     `json:"wagger"`
	Tournament          thandler.TournamentViewModel `json:"tournament"`
	NumberPartConfirmed bool                         `json:"numberPartConfirmed"`
}

type partViewModelTournament struct {
	Uid                 string                       `json:"uid"`
	Date                string                       `json:"date"`
	User                user.UserViewModel           `json:"user"`
	IsWin               bool                         `json:"isWin"`
	Tournament          thandler.TournamentViewModel `json:"tournament"`
	NumberPartConfirmed bool                         `json:"numberPartConfirmed"`
}

type ReacordsPartModel struct {
	RecordsPart                 int `json:"recordsPart"`
	ReacordsnumberPartConfirmed int `json:"reacordsnumberPartConfirmed"`
}

type partWaggerViewModel struct {
	Uid                 string                   `json:"uid"`
	Date                string                   `json:"date"`
	User                []user.UserViewModel     `json:"user"`
	IsWin               bool                     `json:"isWin"`
	Wagger              whandler.WaggerViewModel `json:"wagger"`
	NumberPartConfirmed bool                     `json:"numberPartConfirmed"`
}
