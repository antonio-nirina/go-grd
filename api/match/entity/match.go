package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Match struct {
	Uid        primitive.ObjectID `bson:"uid"`
	Number     int                `json:"number"`
	Tournament string             `json:"tournament"`
	Wagger     string             `json:"wagger"`
	Statut     bool               `json:"statut"`
	IsTeam     bool               `json:"isTeam"`
	UserHome   string             `json:"userHome"`
	UserGuest  string             `json:"userGuest"`
	TeamHome   string             `json:"teamHome"`
	TeamGuest  string             `json:"teamGuest"`
}
