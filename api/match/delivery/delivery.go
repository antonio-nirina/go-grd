package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/match/entity"
	"github.com/thoussei/antonio/api/match/handler"
	teamHandler "github.com/thoussei/antonio/api/teams/handler"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MatchResolver interface {
	CreatedMatchTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	FindMatchResolver(params graphql.ResolveParams) (interface{}, error)
}

type resolverMatch struct {
	matchHandler      handler.UsecaseMatch
	matchUserHandler  userHandler.Usecase
	team              teamHandler.UsecaseTeam
	tournamentHandler tournamentHandler.UsecaseTournament
}

func NewMatchResolver(
	matchUseCase handler.UsecaseMatch,
	userMatch userHandler.Usecase,
	team teamHandler.UsecaseTeam,
	tournament tournamentHandler.UsecaseTournament) MatchResolver {
	return &resolverMatch{
		matchHandler:      matchUseCase,
		matchUserHandler:  userMatch,
		team:              team,
		tournamentHandler: tournament,
	}
}

func (r *resolverMatch) CreatedMatchTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	tournament, _ := params.Args["tournament"].(string)
	isTeam, _ := params.Args["isTeam"].(bool)
	step , _ := params.Args["step"].(string)
	var userHome string
	var userGuest string
	var teamHomeUid string
	var teamGuestUid string
	var err error

	if isTeam {
		teamHomeUid, _ = params.Args["teamHome"].(string)
		teamGuestUid, _ = params.Args["teamGuest"].(string)
		_, err = r.team.FindOneTeamHandler(teamHomeUid)
		_, err = r.team.FindOneTeamHandler(teamGuestUid)
	} else {
		userHome, _ = params.Args["userHome"].(string)
		userGuest, _ = params.Args["userGuest"].(string)
		_, err = r.matchUserHandler.FindOneUserById(userHome)
		_, err = r.matchUserHandler.FindOneUserById(userGuest)
	}

	if err != nil {
		return nil, err
	}

	count ,_ := r.matchHandler.CountMatchHandler()
	var arrayBracket []entity.Bracket
	bracket := entity.Bracket{
		Step: step,
		UserHome:   userHome,
		UserGuest:  userGuest,
		TeamHome:   teamHomeUid,
		TeamGuest:  teamGuestUid,
	}
	arrayBracket = append(arrayBracket, bracket)
	match := &entity.Match{
		Uid:        primitive.NewObjectID(),
		Number:     count + 1,
		Tournament: tournament,
		Wagger:     "",
		Statut:     true,
		IsTeam:     isTeam,
		Brackets: arrayBracket,
	}

	result, err := r.matchHandler.SavedMatchHandler(match)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *resolverMatch) FindMatchResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	match, err := r.matchHandler.FindMatchHandler(uid)

	if err != nil {
		return nil, err
	}

	return match, nil
}
