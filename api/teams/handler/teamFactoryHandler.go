package handler

import (
	"github.com/thoussei/antonio/api/teams/entity"
	userHandler "github.com/thoussei/antonio/api/user/handler"
)

func handleTeamToViewModel(team *entity.Team) TeamViewModel {
	var teamRes TeamViewModel
	var players []userHandler.UserViewModel

	for _,value := range team.Players{
		pls := userHandler.UserViewModel{
			Uid:value.Uid.Hex(),
			FirstName:value.FirstName,
			LastName:value.LastName,
			Email:value.Email,
			Username:value.Username,
			IsBanned:value.IsBanned,
			Avatar:value.Avatar,
			Language:value.Language,
			Point:value.Point,
			Roles:value.Roles,
			TypeConnexion:value.TypeConnexion,
			Created:value.Created,
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