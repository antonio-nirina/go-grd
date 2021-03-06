package entity

import (
	user "github.com/thoussei/antonio/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Team struct {
	Uid           			primitive.ObjectID 	`bson:"uid"`
	Name 		  			string 				`json:"name"`
	CreationDate 		  	string            	`json:"creationDate"`
	Players 	 	  		[]string 	   	`json:"players"`
	Description 		  	string            	`json:"description"`
	IsBlocked 		  		bool 				`json:"isBlocked"`
	Logo   					string            	`json:"logo"`
	Banniere   					string            	`json:"banniere"`
	Creator   				user.User            `json:"creator"`
	Tag 					string            	`json:"tag"`
}