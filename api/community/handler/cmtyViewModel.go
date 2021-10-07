package handler

import (
	game "github.com/thoussei/antonio/api/games/handler"
)

type CmtyViewModel struct {
	Uid       string             `json:"uid"`
	Streaming []string           `json:"streaming"`
	Game      game.GameViewModel `json:"game"`
}

type CmtyGameTwitchViewModel struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	BoxArtUrl string `json:"box_art_url"`
}

// for list stream
type cmtystreamingViewModelTwitch struct {
	Id           string `json:"id"`
	UserId       string `json:"user_id"`
	UserLogin    string `json:"user_login"`
	UserName     string `json:"user_name"`
	GameId       string `json:"game_id"`
	GameName     string `json:"game_name"`
	Type         string `json:"type"`
	Title        string `json:"title"`
	ViewerCount  int    `json:"viewer_count"`
	StartedAt    string `json:"started_at"`
	Language     string `json:"language"`
	ThumbnailUrl string `json:"thumbnail_url"`
	// TagIds       []string `json:"tag_ids"`
	IsMature bool `json:"is_mature"`
}

// list clips
type CmtystreamingViewModelTwitch struct {
	Id           string   `json:"id"`
	Url       string   `json:"url"`
	EmbedUrl    string   `json:"embed_url"`
	BroadcasterId     string   `json:"broadcaster_id"`
	BroadcasterName       string   `json:"broadcaster_name"`
	CreatorId     string   `json:"creator_id"`
	CreatorName         string   `json:"creator_name"`
	VideoId        string   `json:"video_id"`
	ViewerCount  int      `json:"viewer_count"`
	GameId    string   `json:"game_id"`
	Language     string   `json:"language"`
	Title string   `json:"title"`
	CreatedAt       string `json:"created_at"`
	ThumbnailUrl     string     `json:"thumbnail_url"`
	Duration     int     `json:"duration"`
}
