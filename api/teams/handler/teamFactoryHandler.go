package handler

import (
	"github.com/thoussei/antonio/api/teams/entity"
	userHandler "github.com/thoussei/antonio/api/user/handler"
)

func handleTeamToViewModel(team *entity.Team,t *teamUsecase) TeamViewModel {
	var teamRes TeamViewModel
	var players []userHandler.UserViewModel

	for _,value := range team.Players{
		user,_ := t.userUsecase.FindOneUserByUid(value)
		pls := userHandler.UserViewModel{
			Uid:user.Uid.Hex(),
			FirstName:user.FirstName,
			LastName:user.LastName,
			Email:user.Email,
			Username:user.Username,
			IsBanned:user.IsBanned,
			Avatar:user.Avatar,
			Language:user.Language,
			Point:user.Point,
			Roles:user.Roles,
			TypeConnexion:user.TypeConnexion,
			Created:user.Created,
		}

		players = append(players,pls)
	}

	teamRes = TeamViewModel{
		Uid:team.Uid.Hex(),
		Name:team.Name,
		CreationDate:team.CreationDate,
		Players: players,
		Description:team.Description,
		IsBlocked:team.IsBlocked,
		Logo:team.Logo,
		Creator:team.Creator.Username,
		Records:0, 
		Tag: team.Tag,
		Banniere: team.Banniere,   		
	}

	return teamRes
}