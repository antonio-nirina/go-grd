package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	GEntity "github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/participate/entity"
	"github.com/thoussei/antonio/api/participate/handler"
	tEntity "github.com/thoussei/antonio/api/tournament/entity"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
	userEntity "github.com/thoussei/antonio/api/user/entity"
	userHandler "github.com/thoussei/antonio/api/user/handler"

	leagueEntity "github.com/thoussei/antonio/api/league/entity"
	leagueHandler "github.com/thoussei/antonio/api/league/handler"

	teamEntity "github.com/thoussei/antonio/api/teams/entity"
	teamHandler "github.com/thoussei/antonio/api/teams/handler"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PartResolver interface {
	SavedPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartByUseResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedPartByUseResolver(params graphql.ResolveParams) (interface{}, error)
}

type participate struct {
	partHandler handler.UsecasePart
	user        userHandler.Usecase
	tournament  tournamentHandler.UsecaseTournament
	league      leagueHandler.UsecaseLeague
	team        teamHandler.UsecaseTeam
}

type teamsElements struct {
	Uid []string `json:"uid"`
}

func NewResolverPart(
	partUseCase handler.UsecasePart,
	user userHandler.Usecase,
	tournament tournamentHandler.UsecaseTournament,
	team teamHandler.UsecaseTeam,
	league leagueHandler.UsecaseLeague,
) PartResolver {
	return &participate{
		partHandler: partUseCase,
		user:        user,
		tournament:  tournament,
		league:      league,
		team:        team,
	}
}

func (p *participate) SavedPartResolver(params graphql.ResolveParams) (interface{}, error) {
	date, _ := params.Args["date"].(string)
	userUid, _ := params.Args["uidUser"].(string)
	tournamentUid, _ := params.Args["tournamentUid"].(string)
	leagueUid, _ := params.Args["leagueUid"].(string)
	jsonString, _ := json.Marshal(params.Args["teamsUid"])
	teams := teamsElements{}
	json.Unmarshal([]byte(jsonString), &teams)

	tournamentObject := tEntity.Tournament{}
	leagueObject := leagueEntity.League{}
	teamObject := []teamEntity.Team{}
	userObject := userEntity.User{}

	if userUid != "" {
		user, err := p.user.FindOneUserByUid(userUid)
		if err != nil {
			return nil, err
		}

		userObject.Uid = user.Uid
		userObject.FirstName = user.FirstName
		userObject.LastName = user.LastName
		userObject.Password = user.Password
		userObject.Email = user.Email
		userObject.Username = user.Username
		userObject.IsBanned = user.IsBanned
		userObject.Avatar = user.Avatar
		userObject.Language = user.Language
		userObject.IdGameAccount = user.IdGameAccount
		userObject.Point = user.Point
		userObject.Roles = user.Roles
		userObject.TypeConnexion = user.TypeConnexion
		userObject.Created = user.Created
		userObject.ConfirmationToken = user.ConfirmationToken
		userObject.Friends = user.Friends
		userObject.Accounts = user.Accounts
	}

	if tournamentUid != "" {
		tournament, err := p.tournament.FindTournamentHandler(tournamentUid)

		if err != nil {
			return nil, err
		}

		objectId, _ := primitive.ObjectIDFromHex(tournament.Uid)
		objectIdGame, _ := primitive.ObjectIDFromHex(tournament.Game.Uid)
		objectIdPlt, _ := primitive.ObjectIDFromHex(tournament.Plateform.Uid)
		tournamentObject.Uid = objectId
		tournamentObject.Title = tournament.Title
		tournamentObject.Date = tournament.Date
		tournamentObject.Game = GEntity.Game{
			Uid:   objectIdGame,
			Name:  tournament.Game.Name,
			Image: tournament.Game.Image,
			Slug:  tournament.Game.Slug,
			Logo:  tournament.Game.Logo,
		}
		tournamentObject.Plateform = GEntity.GamePlatform{Uid: objectIdPlt, Name: tournament.Plateform.Name, Description: tournament.Plateform.Description}
		tournamentObject.NumberParticipate = tournament.NumberParticipate
		tournamentObject.NumberTeam = tournament.NumberTeam
		tournamentObject.Price = tournament.Price
		tournamentObject.DeadlineDate = tournament.DeadlineDate
		tournamentObject.PriceParticipate = tournament.PriceParticipate
		tournamentObject.Statut = tournament.Statut
		tournamentObject.Info = tournament.Info
		tournamentObject.Rules = tournament.Rules
		tournamentObject.IsPublic = tournament.IsPublic
	}

	if leagueUid != "" {
		league, err := p.league.FindOneLeagueHandler(leagueUid)
		if err != nil {
			return nil, err
		}

		leagueObject.Uid = league.Uid
		leagueObject.Title = league.Title
		leagueObject.Date = league.Date
		leagueObject.Game = league.Game
		leagueObject.Plateform = league.Plateform
		leagueObject.NumberParticipate = league.NumberParticipate
		leagueObject.NumberTeam = league.NumberTeam
		leagueObject.Price = league.Price
		leagueObject.DeadlineDate = league.DeadlineDate
		leagueObject.PriceParticipate = league.PriceParticipate
		leagueObject.Statut = league.Statut
		leagueObject.Info = league.Info
		leagueObject.Rules = league.Rules
		leagueObject.IsPublic = league.IsPublic
		leagueObject.IsTeam = league.IsTeam
		leagueObject.NumberGroup = league.NumberGroup
		leagueObject.Organizer = league.Organizer
	}

	if len(teams.Uid) > 0 {
		for _, val := range teams.Uid {
			team, err := p.team.FindOneTeamHandler(val)
			if err != nil {
				return nil, err
			}

			teamInput := teamEntity.Team{
				Uid:          team.Uid,
				Name:         team.Name,
				CreationDate: team.CreationDate,
				Players:      team.Players,
				Description:  team.Description,
				IsBlocked:    team.IsBlocked,
				Logo:         team.Logo,
				Creator:      team.Creator,
			}

			teamObject = append(teamObject, teamInput)
		}
	}

	part := &entity.Participate{
		Uid:        primitive.NewObjectID(),
		Date:       date,
		User:       userObject,
		Tournament: tournamentObject,
		Team:       teamObject,
		League:     leagueObject,
		IsWin:      false,
	}

	res, err := p.partHandler.SavedPartHandler(part)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindPartResolver(params graphql.ResolveParams) (interface{}, error) {

	uid, _ := params.Args["uid"].(string)
	res, err := p.partHandler.FindPartHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}
func (p *participate) FindAllPartResolver(params graphql.ResolveParams) (interface{}, error) {

	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0 {
		pageNumber = 1
	}

	res, err := p.partHandler.FindAllPartHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindPartByUseResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0 {
		pageNumber = 1
	}

	userUid, _ := params.Args["uidUser"].(string)
	user, err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	res, err := p.partHandler.FindPartUserHandler(int64(pageNumber), int64(limit), user.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) UpdatedPartByUseResolver(params graphql.ResolveParams) (interface{}, error) {
	userUid, _ := params.Args["uidUser"].(string)
	userPartUid, _ := params.Args["uidPart"].(string)
	user, err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	res, err := p.partHandler.UpdatedPartUserHandler(userPartUid, user.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}
