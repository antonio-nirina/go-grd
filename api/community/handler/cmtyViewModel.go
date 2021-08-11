package handler

import (
	game "github.com/thoussei/antonio/api/games/handler"
	userViewModel "github.com/thoussei/antonio/api/user/handler"
)

type CmtyViewModel struct {
	Uid       string 						`json:"uid"`
	Title     string             			`json:"title"`
	User      userViewModel.UserViewModel   `json:"user"`
	Content   string             			`json:"content"`
	Game 	  game.GameViewModel 			`json:"game"`
}