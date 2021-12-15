package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/participate/entity"
	"github.com/thoussei/antonio/api/participate/handler"
	rateHandler "github.com/thoussei/antonio/api/rate/handler"
	tEntity "github.com/thoussei/antonio/api/tournament/entity"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	waggerEntity "github.com/thoussei/antonio/api/wagger/entity"
	waggerHandler "github.com/thoussei/antonio/api/wagger/handler"

	// leagueEntity "github.com/thoussei/antonio/api/league/entity"
	// leagueHandler "github.com/thoussei/antonio/api/league/handler"

	teamHandler "github.com/thoussei/antonio/api/teams/handler"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PartResolver interface {
	SavedPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllPartResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartByUseResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartByUseLeagueResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartByUseTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedPartByUseResolver(params graphql.ResolveParams) (interface{}, error)
	RemovedPartByResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedNumberPartConfResolver(params graphql.ResolveParams) (interface{}, error)
	GetNumberPartByResolver(params graphql.ResolveParams) (interface{}, error)
	FindPartByUserWaggerResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllPartUserWaggerHandler(params graphql.ResolveParams) (interface{}, error)
	FindPartByTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	LeavePartTournamentResolver(params graphql.ResolveParams) (interface{}, error)
}

type participate struct {
	partHandler handler.UsecasePart
	user        userHandler.Usecase
	tournament  tournamentHandler.UsecaseTournament
	// league      leagueHandler.UsecaseLeague
	team   teamHandler.UsecaseTeam
	wagger waggerHandler.UsecaseWagger
	rate rateHandler.UsecaseRate
}

type teamsElements struct {
	Uid []string `json:"uid"`
}

func NewResolverPart(
	partUseCase handler.UsecasePart,
	user userHandler.Usecase,
	tournament tournamentHandler.UsecaseTournament,
	team teamHandler.UsecaseTeam,
	wagger waggerHandler.UsecaseWagger,
	rate rateHandler.UsecaseRate,
	// league leagueHandler.UsecaseLeague,
) PartResolver {
	return &participate{
		partHandler: partUseCase,
		user:        user,
		tournament:  tournament,
		// league:      league,
		team:   team,
		wagger: wagger,
		rate:rate,
	}
}

func (p *participate) SavedPartResolver(params graphql.ResolveParams) (interface{}, error) {
	date, _ := params.Args["date"].(string)
	userUid, _ := params.Args["uidUser"].(string)
	tournamentUid, _ := params.Args["tournamentUid"].(string)
	waggerUid, _ := params.Args["waggerUid"].(string)
	// leagueUid, _ := params.Args["leagueUid"].(string)
	teams := params.Args["teamsUid"].(string)
	var uidUser string
	tournamentObject := tEntity.Tournament{}
	waggerObject := waggerEntity.Wagger{}
	IsTournament := false
	isWagger := false

	if userUid != "" {
		user, err := p.user.FindOneUserByUid(userUid)
		if err != nil {
			return nil, err
		}
		uidUser = user.Uid.Hex()
	}
	
	// IsTournament
	if tournamentUid != "" {
		IsTournament = true
		tournament, err := p.tournament.FindOneTournamentHandler(tournamentUid)

		if err != nil {
			return nil, err
		}

		tournamentObject = tournament
	}
	// IsWager
	if waggerUid != "" {
		isWagger = true
		wagger, err := p.wagger.FindOneWaggerHandler(waggerUid)

		if err != nil {
			return nil, err
		}
		waggerObject = wagger
	}
		// IsTeam
	if teams != "" {
		_, err := p.team.FindOneTeamHandler(teams)
			if err != nil {
				return nil, err
			}
	}

	part := &entity.Participate{
		Uid:        primitive.NewObjectID(),
		Date:       date,
		User:       uidUser,
		Tournament: tournamentObject,
		Team:       teams,
		//League:     leagueObject,
		IsWin:               false,
		IsTournament:        IsTournament,
		Wagger:              waggerObject,
		NumberPartConfirmed: false,
		IsWager:             isWagger,
	}

	res, err := p.partHandler.SavedPartHandler(part)
	_,err = p.rate.FindRateCreateOrUpdatedHandler(uidUser,"")

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
	res, err := p.partHandler.FindAllPartHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindPartByUseResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)
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

func (p *participate) FindPartByUseLeagueResolver(params graphql.ResolveParams) (interface{}, error) {
	userUid, _ := params.Args["uidUser"].(string)
	leagueUid, _ := params.Args["uidLeague"].(string)
	user, err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	/*_, err = p.league.FindOneLeagueHandler(leagueUid)

	if err != nil {
		return nil, err
	}*/

	res, err := p.partHandler.FindPartUserLeagueHandler(user.Uid, leagueUid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindPartByUseTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	userUid, _ := params.Args["uidUser"].(string)
	tournamentUid, _ := params.Args["uidTournament"].(string)
	user, err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	_, err = p.tournament.FindTournamentHandler(tournamentUid)

	if err != nil {
		return nil, err
	}

	res, err := p.partHandler.FindPartUserTournamentHandler(user.Uid, tournamentUid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) RemovedPartByResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	_, err := p.partHandler.FindPartHandler(uid)

	if err != nil {
		return nil, err
	}

	part, err := p.partHandler.RemovedPartHandler(uid)

	return part, nil
}

func (p *participate) UpdatedNumberPartConfResolver(params graphql.ResolveParams) (interface{}, error) {
	userPartUid, _ := params.Args["uidPart"].(string)
	partConfirmed, _ := params.Args["partConfirmed"].(bool)
	_, err := p.partHandler.FindPartHandler(userPartUid)

	if err != nil {
		return nil, err
	}

	res, err := p.partHandler.UpdatedPartNumberConfirmedHandler(userPartUid, partConfirmed)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) GetNumberPartByResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	_, err := p.tournament.FindTournamentHandler(uid)

	if err != nil {
		return nil, err
	}

	part, err := p.partHandler.GetNumberPartHandler(uid)

	return part, nil
}

func (p *participate) FindPartByUserWaggerResolver(params graphql.ResolveParams) (interface{}, error) {
	userUid, _ := params.Args["uidUser"].(string)
	uidWagger, _ := params.Args["uidWagger"].(string)
	user, err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	wagger, err := p.wagger.FindOneWaggerHandler(uidWagger)

	if err != nil {
		return nil, err
	}

	res, err := p.partHandler.FindPartUserWaggerHandler(user.Uid, wagger.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindAllPartUserWaggerHandler(params graphql.ResolveParams) (interface{}, error) {
	userUid, _ := params.Args["uidUser"].(string)
	pageNumber, _ := params.Args["pageNumber"].(int)
	limit, _ := params.Args["limit"].(int)
	user, err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	part, err := p.partHandler.FindAllPartUserWaggerHandler(user.Uid, int64(pageNumber), int64(limit))

	return part, nil
}

func (p *participate) FindPartByTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	tournament, err := p.tournament.FindTournamentHandler(uid)

	if err != nil {
		return nil, err
	}
	part,err := p.partHandler.FindPartTournamentHandler(tournament)

	if err != nil {
		return nil, err
	}

	return part,nil
}

func (p *participate) LeavePartTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	userUId,_ := params.Args["userUid"].(string)
	leave,err := p.partHandler.LeavePartTournamentHandler(uid,userUId)

	if err != nil {
		return nil, err
	}

	return leave,nil
}