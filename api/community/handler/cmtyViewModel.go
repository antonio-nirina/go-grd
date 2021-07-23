package handler

import (
	"github.com/thoussei/antonio/api/user/entity"
)

type CmtyViewModel struct {
	Uid       string 			`json:"uid"`
	Title     string             `json:"title"`
	User      entity.User             `json:"user"`
	Content   string             `json:"Content"`
}