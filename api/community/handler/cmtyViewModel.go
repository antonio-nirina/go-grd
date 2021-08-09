package handler

import (
	"github.com/thoussei/antonio/api/user/entity"
	"github.com/thoussei/antonio/api/handler/userViewModel"
)

type CmtyViewModel struct {
	Uid       string 			`json:"uid"`
	Title     string             `json:"title"`
	User      userViewModel.UserViewModel            `json:"user"`
	Content   string             `json:"Content"`
}