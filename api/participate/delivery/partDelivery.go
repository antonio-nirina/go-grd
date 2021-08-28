package delivery

import (
	"github.com/graphql-go/graphql"
	GEntity "github.com/thoussei/antonio/api/games/entity"
	"github.com/thoussei/antonio/api/participate/entity"
	"github.com/thoussei/antonio/api/participate/handler"
	tEntity "github.com/thoussei/antonio/api/tournament/entity"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
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
	user userHandler.Usecase
	tournament tournamentHandler.UsecaseTournament
	league leagueHandler.UsecaseLeague
	team teamHandler.UsecaseTeam
}

func NewResolverPart(
	partUseCase handler.UsecasePart,
	user userHandler.Usecase,
	tournament tournamentHandler.UsecaseTournament
	team teamHandler.UsecaseTeam,
	league leagueHandler.UsecaseLeague
) PartResolver {
	return &participate{
		partHandler: partUseCase,
		user:user,
		tournament:tournament,
		league:league,
		team:team,
	}
}

func (p *participate) SavedPartResolver(params graphql.ResolveParams) (interface{}, error){
	date, _ := params.Args["date"].(string)
	userUid, _ := params.Args["uidUser"].(string)
	tournamentUid, _ := params.Args["tournamentUid"].(string)
	leagueUid, _ := params.Args["leagueUid"].(string)
	leagueUid, _ := params.Args["leagueUid"].(string)
	// jerena raims
	user,err := p.user.FindOneUserByUid(userUid)
	tournament,err := p.tournament.FindTournamentHandler(tournamentUid)

	if leagueUid != "" {
		league,err := p.tournament.FindLeagueHandler(leagueUid)
	}
	

	tournament,err := p.tournament.FindTournamentHandler(tournamentUid)

	if err != nil {
		return nil, err
	}

	objectId, _ := primitive.ObjectIDFromHex(tournament.Uid)
	objectIdGame, _ := primitive.ObjectIDFromHex(tournament.Game.Uid)
	objectIdPlt, _ := primitive.ObjectIDFromHex(tournament.Plateform.Uid)

	tournamentObject := tEntity.Tournament{
		Uid:objectId,
		Title:tournament.Title,
		Date:tournament.Date,
		Game:GEntity.Game{
			Uid:objectIdGame,
			Name: tournament.Game.Name,
			Image: tournament.Game.Image,
			Slug: tournament.Game.Slug,
			Logo: tournament.Game.Logo,
		} ,
		Plateform:GEntity.GamePlatform{Uid: objectIdPlt,Name: tournament.Plateform.Name,Description: tournament.Plateform.Description},
		NumberParticipate:tournament.NumberParticipate,
		NumberTeam:tournament.NumberTeam,
		Price:tournament.Price,
		DeadlineDate:tournament.DeadlineDate,
		PriceParticipate:tournament.PriceParticipate,
		Statut:tournament.Statut,
		Info:tournament.Info,
		Rules:tournament.Rules,
		IsPublic:tournament.IsPublic,
	}
	part := &entity.Participate{
		Uid:primitive.NewObjectID(),
		Date:date,
		User:user,
		Tournament:tournamentObject,
		IsWin: false,
	}

	res, err := p.partHandler.SavedPartHandler(part)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindPartResolver(params graphql.ResolveParams) (interface{}, error){

	uid, _ := params.Args["uid"].(string)
	res, err := p.partHandler.FindPartHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}
func (p *participate) FindAllPartResolver(params graphql.ResolveParams) (interface{}, error){

	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0{
		pageNumber = 1
	}

	res, err := p.partHandler.FindAllPartHandler(int64(pageNumber),int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) FindPartByUseResolver(params graphql.ResolveParams) (interface{}, error){
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0{
		pageNumber = 1
	}

	userUid, _ := params.Args["uidUser"].(string)
	user,err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	res, err := p.partHandler.FindPartUserHandler(int64(pageNumber),int64(limit),user.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (p *participate) UpdatedPartByUseResolver(params graphql.ResolveParams) (interface{}, error) {
	userUid, _ := params.Args["uidUser"].(string)
	userPartUid, _ := params.Args["uidPart"].(string)
	user,err := p.user.FindOneUserByUid(userUid)

	if err != nil {
		return nil, err
	}

	res, err := p.partHandler.UpdatedPartUserHandler(userPartUid,user.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}
