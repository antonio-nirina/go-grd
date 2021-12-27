package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type HistoryChat struct {
	Uid         primitive.ObjectID `bson:"uid"`
	UserFrom    string             `json:"userfrom"`
	UserTo      string             `json:"userto"`
	ContentFrom []DataContent      `json:"contentfrom"`
	ContentTo   []DataContent      `json:"contentTo"`
}

type DataContent struct {
	Created string `json:"created"`
	Updated string `json:"updated"`
	Content string `json:"contentTo"`
}
