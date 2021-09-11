package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Wagger struct {
	Uid           			primitive.ObjectID 	`bson:"uid"`
	Date 					string `json:"date"`
	Title 					string `json:"title"`
	Description 			string `json:"description"`
	Price 					float64 `json:"price"`
	DeadlineDate 			string `json:"deadlineDate"`
	GameWay 				string `json:"gameWay"`
	Entry 					string `json:"entry"`
	PriceParticipate 		float64  `json:"priceParticipate"`
	Format 					string `json:"format"`
	IsPublic 				bool `json:"IsPublic"`
	Statut 		  			bool `json:"statut"`
}

