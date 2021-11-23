package delivery

import (
	"errors"
	"strings"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/teams/entity"
	"github.com/thoussei/antonio/api/teams/handler"
	userEntity "github.com/thoussei/antonio/api/user/entity"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TeamResolver interface {
	SavedTeamResolver(params graphql.ResolveParams) (interface{}, error)
	FindTeamResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllTeamResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedTeamByBannedResolver(params graphql.ResolveParams) (interface{}, error)
	TeamByUserResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedTeamResolver(params graphql.ResolveParams) (interface{}, error)
	DeleteTeamResolver(params graphql.ResolveParams) (interface{}, error)
}

type team struct {
	teamHandler     handler.UsecaseTeam
	teamUserHandler userHandler.Usecase
}

func NewResolverTeam(teamUseCase handler.UsecaseTeam, userTeam userHandler.Usecase) TeamResolver {
	return &team{
		teamHandler:     teamUseCase,
		teamUserHandler: userTeam,
	}
}

func (t *team) SavedTeamResolver(params graphql.ResolveParams) (interface{}, error) {
	var users []userEntity.User
	name, _ := params.Args["name"].(string)
	creationDate, _ := params.Args["creationDate"].(string)
	players, _ := params.Args["players"].(string)
	creator, _ := params.Args["creator"].(string)
	tag, _ := params.Args["tag"].(string)
	description, _ := params.Args["description"].(string)
	user, err := t.teamUserHandler.FindOneUserByUid(creator)

	if err != nil {
		return nil, err
	}

	if players != "" {
		arrays := strings.SplitAfter(players, "_")

		for _, val := range arrays {
			player, err := t.teamUserHandler.FindOneUserByUid(val)

			if err != nil {
				return nil, err
			}
			users = append(users, player)
		}
	}

	
	team := &entity.Team{
		Uid:          primitive.NewObjectID(),
		Name:         name,
		CreationDate: creationDate,
		Players:      users,
		Description:  description,
		IsBlocked:    false,
		Logo:         "",
		Banniere:"",
		Creator:      user,
		Tag: tag,
	}

	res, err := t.teamHandler.SavedTeamHandler(team)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (t *team) FindTeamResolver(params graphql.ResolveParams) (interface{}, error) {
	uidTeam, _ := params.Args["uid"].(string)
	team, err := t.teamHandler.FindTeamHandler(uidTeam)

	if err != nil {
		return nil, err
	}

	return team, nil
}

func (t *team) FindAllTeamResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)
	teams, err := t.teamHandler.FindAllTeamHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return teams, nil
}

func (t *team) UpdatedTeamByBannedResolver(params graphql.ResolveParams) (interface{}, error) {
	var users []userEntity.User
	uid, _ := params.Args["uid"].(string)
	objectId, err := primitive.ObjectIDFromHex(uid)
	team, err := t.teamHandler.FindTeamHandler(uid)
	user, err := t.teamUserHandler.FindUserByUsername(team.Creator)

	if err != nil {
		return nil, err
	}

	for _, val := range team.Players {
		userPl, err := t.teamUserHandler.FindOneUserByUid(val.Uid)

		if err != nil {
			return nil, err
		}

		players := userEntity.User{
			Uid:               userPl.Uid,
			FirstName:         userPl.FirstName,
			LastName:          userPl.LastName,
			Password:          userPl.Password,
			Email:             userPl.Email,
			Username:          userPl.Username,
			IsBanned:          userPl.IsBanned,
			Avatar:            userPl.Avatar,
			Language:          userPl.Language,
			IdGameAccount:     userPl.IdGameAccount,
			Point:             userPl.Point,
			Roles:             userPl.Roles,
			TypeConnexion:     userPl.TypeConnexion,
			Created:           userPl.Created,
			ConfirmationToken: userPl.ConfirmationToken,
			Friends:           userPl.Friends,
			Accounts:          userPl.Accounts,
		}
		users = append(users, players)
	}

	newTeam := &entity.Team{
		Uid:          objectId,
		Name:         team.Name,
		CreationDate: team.CreationDate,
		Players:      users,
		Description:  team.Description,
		IsBlocked:    true,
		Logo:         team.Logo,
		Creator:      user,
	}

	_, err = t.teamHandler.UpdatedTeamHandler(newTeam)

	return team, nil
}

func (t *team) TeamByUserResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	_, err := t.teamUserHandler.FindOneUserByUid(uid)

	if err != nil {
		return nil, err
	}

	team, err := t.teamHandler.FindTeamByUserHandler(uid)

	if err != nil {
		return nil, err
	}

	return team, nil
}

func (t *team) UpdatedTeamResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	name, _ := params.Args["name"].(string)
	players, _ := params.Args["players"].(string)
	logo, _ := params.Args["logo"].(string)
	logoType, _ := params.Args["logoType"].(string)
	bann, _ := params.Args["bann"].(string)
	bannType, _ := params.Args["bannType"].(string)
	creator, _ := params.Args["creator"].(string)
	tag, _ := params.Args["tag"].(string)
	description, _ := params.Args["description"].(string)
	team, err := t.teamHandler.FindTeamHandler(uid)

	var user userEntity.User

	if err != nil {
		return nil, errors.New("team not found")
	}

	objectId, _ := primitive.ObjectIDFromHex(team.Uid)

	if creator != ""{
		user, _ = t.teamUserHandler.FindOneUserByUid(creator)
	} else {
		user, _ = t.teamUserHandler.FindUserByUsername(team.Creator)
	}

	var arrayPlayers []userEntity.User
	
	if players != "" {
		arrayUsers := strings.Split(players, "_")
	
		for _,item := range arrayUsers {
			if item != "" {
				userPlayers, err := t.teamUserHandler.FindOneUserByUid(item)
				if err != nil {
					return nil, errors.New("User not found")
				}

				arrayPlayers = append(arrayPlayers, userPlayers)
			}
		}
	}

	for _,userItem := range team.Players {
		userPlayer, err := t.teamUserHandler.FindUserByUsername(userItem.Username)
		if err != nil {
			return nil, errors.New("User not found")
		}

		arrayPlayers = append(arrayPlayers, userPlayer)
	}
	
	if err != nil {
		return nil, err
	}
	var urlFile string
	var urlBann string
	var nameUpdated = team.Name
	var tagUpdated = team.Tag
	var descriptionUpdated = team.Description 
	upl := &external.FileUpload{}
	urlFile = team.Logo

	if logo != "" {
		url, _ := upl.HandleFileInBBApi(logo, logoType)
		urlFile = url
	}
	
	urlBann = team.Banniere

	if bann != "" {
		urlBan, _ := upl.HandleFileInBBApi(bann, bannType)
		urlBann = urlBan
	}

	if name != "" {
		nameUpdated = name
	}

	if tag != "" {
		tagUpdated = tag
	}

	if description != "" {
		descriptionUpdated = description
	}
	
	teamUpdated := &entity.Team{
		Uid:          objectId,
		Name:         nameUpdated,
		CreationDate: team.CreationDate,
		Players:      arrayPlayers,
		Description:  descriptionUpdated,
		IsBlocked:    team.IsBlocked,
		Logo:         urlFile,
		Banniere:urlBann,
		Creator:      user,
		Tag: tagUpdated,
	}

	teamNew, err := t.teamHandler.UpdatedAllTeamHandler(teamUpdated)

	if err != nil {
		return nil, err
	}

	return teamNew, nil
}

func (t *team) DeleteTeamResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	_, err := t.teamHandler.FindTeamByUserHandler(uid)

	if err != nil {
		return nil, err
	}

	res,err := t.teamHandler.DeleteTeamHandler(uid)

	if err != nil {
		return nil, err
	}

	return res,err
}