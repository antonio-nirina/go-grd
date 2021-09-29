package handler

import (
	"github.com/thoussei/antonio/api/group/entity"
	"github.com/thoussei/antonio/api/group/repository"
	userHandler "github.com/thoussei/antonio/api/user/handler"
)

type UsecaseGroup interface {
	SavedGroupHandler(group *entity.Group) (interface{}, error)
}

type GroupViewModel struct {
	Uid           			string 						`json:"uid"`
	Name 		  			string 						`json:"name"`
	Lead      				userHandler.UserViewModel    `json:"lead"`
	Users     				[]userHandler.UserViewModel  `json:"users"`
	Subject   				string    					`json:"subject"`
}

type groupUsecase struct {
	groupRepository repository.RepositoryGroup
}

func NewUsecaseGroup(g repository.RepositoryGroup) UsecaseGroup {
	return &groupUsecase{
		groupRepository: g,
	}
}

func (g *groupUsecase) SavedGroupHandler(group *entity.Group) (interface{}, error) {
	_,err := g.groupRepository.SavedGroup(group)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}