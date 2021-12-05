package handler

import (
	"github.com/thoussei/antonio/api/common"
)


type LeagueViewModel struct {
	Uid           		string  `json:"uid"`
	Title     			string  `json:"title"`
	Date     			string  `json:"date"`
	Description      	string  `json:"description"`
	Statut 				bool `json:"statut"`
	NumberParticipate 	int `json:"numberParticipate"`
	NumberTeam 			int `json:"numberTeam"`
	Price     			float64  `json:"price"`
	DeadlineDate     	string  `json:"deadlineDate"`
	PriceParticipate    float64  `json:"priceParticipate"`
	Game 				common.GameViewModel `json:"game"`
	Plateform  			common.PlateformViewModel `json:"plateform"`
	Info				string            	`json:"info"`
	Rules   			string            	`json:"rules"`
	IsPublic 			bool `json:"isPublic"`
	Records   			int   `json:"records"`
	IsTeam 				bool `json:"IsTeam"`
	NumberGroup 		int `json:"numberGroup"`
	Organizer   		string `json:"organizer"`
}