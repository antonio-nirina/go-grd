package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Communauty struct {
	Uid       primitive.ObjectID `bson:"uid"`
	Streaming []DataStreaming    `json:"streaming"`
	Game      TwitchGame         `json:"game"`
	Statut    bool               `json:"statut"`
}

type DataStreaming struct {
	Id           string `json:"id"`
	CreatorName  string `json:"creatorName"`
	VideoId      string `json:"videoId"`
	ViewerCount  int    `json:"viewerCount"`
	GameId       string `json:"gameId"`
	Title        string `json:"title"`
	GameName     string `json:"gameName"`
	ThumbnailUrl string `json:"thumbnailUrl"`
}
