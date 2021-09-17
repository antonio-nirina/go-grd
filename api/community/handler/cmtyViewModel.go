package handler

import (
	game "github.com/thoussei/antonio/api/games/handler"
)

type CmtyViewModel struct {
	Uid       string 						`json:"uid"`
	Streaming     []string             			`json:"streaming"`
	Game 	  game.GameViewModel 			`json:"game"`
}