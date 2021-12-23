package handler

import (
	"github.com/thoussei/antonio/api/common"
)

type tournamentViewModel struct {
	Uid               string                      `json:"uid"`
	Title             string                      `json:"title"`
	DateStart         string                      `json:"dateStart"`
	Description       string                      `json:"description"`
	Statut            string                      `json:"statut"`
	NumberParticipate int                         `json:"numberParticipate"`
	NumberTeam        int                         `json:"numberTeam"`
	Price             []string                    `json:"price"`
	DeadlineDate      string                      `json:"deadlineDate"`
	PriceParticipate  string                      `json:"priceParticipate"`
	Game              common.GameViewModel        `json:"game"`
	Plateform         []common.PlateformViewModel `json:"plateform"`
	Info              string                      `json:"info"`
	Rules             string                      `json:"rules"`
	IsPublic          bool                        `json:"isPublic"`
	IsTeam            bool                        `json:"isTeam"`
	Records           int                         `json:"records"`
	Format            string                      `json:"format"`
	Server            string                      `json:"server"`
	Tchat             string                      `json:"tchat"`
	Winners           []string                    `json:"winners"`
	Region            string                      `json:"region,omitempty"`
	Spectateur        string                      `json:"spectateur"`
	Laps              []string                    `json:"laps,omitempty"`
	Maps              string                      `json:"maps,omitempty"`
	GameWay           string                      `json:"gameWay"`
}

type TournamentViewModel struct {
	Uid               string                      `json:"uid"`
	Title             string                      `json:"title"`
	DateStart         string                      `json:"dateStart"`
	Description       string                      `json:"description"`
	Statut            string                      `json:"statut"`
	NumberParticipate int                         `json:"numberParticipate"`
	Price             []string                    `json:"price"`
	DeadlineDate      string                      `json:"deadlineDate"`
	PriceParticipate  string                      `json:"priceParticipate"`
	Game              common.GameViewModel        `json:"game"`
	Plateform         []common.PlateformViewModel `json:"plateform"`
	Rules             string                      `json:"rules"`
	IsPublic          bool                        `json:"isPublic"`
	Format            string                      `json:"format"`
	Server            string                      `json:"server"`
	Tchat             string                      `json:"tchat"`
	Winners           []string                    `json:"winners"`
	Region            string                      `json:"region,omitempty"`
	Spectateur        string                      `json:"spectateur"`
	Laps              []string                    `json:"laps,omitempty"`
	Maps              string                      `json:"maps,omitempty"`
	GameWay           string                      `json:"gameWay"`
	IsTeam            bool                        `json:"isTeam"`
}

type TournamentScortModel struct {
	Uid               string   `json:"uid"`
	Title             string   `json:"title"`
	DateStart         string   `json:"dateStart"`
	Description       string   `json:"description"`
	Statut            string   `json:"statut"`
	NumberParticipate int      `json:"numberParticipate"`
	Price             []string `json:"price"`
	DeadlineDate      string   `json:"deadlineDate"`
	PriceParticipate  string   `json:"priceParticipate"`
	IsPublic          bool     `json:"isPublic"`
	IsTeam            bool     `json:"isTeam"`
}
