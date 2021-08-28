package handler

import (
	tournament "github.com/thoussei/antonio/api/tournament/handler"
)


type leagueViewModel struct {
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
	Game 				tournament.GameViewModel `json:"game"`
	Plateform  			tournament.PlateformViewModel `json:"plateform"`
	Info				string            	`json:"info"`
	Rules   			string            	`json:"rules"`
	IsPublic 			bool `json:"isPublic"`
	Records   			int   `json:"records"`
	IsTeam 				bool `json:"IsTeam"`
	NumberGroup 		int `json:"numberGroup"`
	Organizer   		string `json:"organizer"`
}