package entity

import (
	game "github.com/thoussei/antonio/api/games/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Tournament struct {
	Uid           			primitive.ObjectID 	`bson:"uid"`
	Title 		  			string 				`json:"title"`
	Date 		  			string            	`json:"date"`
	Game 	 	  			game.Game 	   		`json:"game,omitempty"`
	Plateform 	  			game.GamePlatform 	 `json:"plateform,omitempty"`
	Description   			string            	`json:"description"`
	NumberParticipate 		float32            	`json:"numberParticipate"`
	NumberTeam 		  		int            		`json:"numberTeam"`
	Price 		  			float32             `json:"price"`
	DeadlineDate 		  	string            	`json:"deadlineDate"`
	PriceParticipate 		float32            `json:"priceParticipate"`
	Statut 		  			bool 				`json:"statut"`
}