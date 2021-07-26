package delivery

import (
	"github.com/graphql-go/graphql"
	gameHandler "github.com/thoussei/antonio/api/games/handler"
	"github.com/thoussei/antonio/api/tournament/entity"
	"github.com/thoussei/antonio/api/tournament/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TournamentResolver interface {
	SavedTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	FindTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllTournamentResolver(params graphql.ResolveParams) (interface{}, error)
	FindTournamentGameResolver(params graphql.ResolveParams) (interface{}, error)
}

type tournament struct {
	tournamentHandler handler.UsecaseTournament
	gameTournamentHandler gameHandler.UsecaseGameInterface
	plateformTournamentHandler gameHandler.UsecasePlateformInterface
}

func NewResolverTournament(tournamentUseCase handler.UsecaseTournament,tournamentGame gameHandler.UsecaseGameInterface,tournamentPlateform gameHandler.UsecasePlateformInterface) TournamentResolver {
	return &tournament{
		tournamentHandler: tournamentUseCase,
		gameTournamentHandler:tournamentGame,
		plateformTournamentHandler:tournamentPlateform,
	}
}

func (t *tournament) SavedTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	title, _ := params.Args["title"].(string)
	date, _ := params.Args["date"].(string)
	gameUid, _ := params.Args["uidGame"].(string)
	plateformUid, _ := params.Args["uidPalteforme"].(string)
	description, _ := params.Args["description"].(string)
	numberParticipate, _ := params.Args["numberParticipate"].(int)
	numberTeam, _ := params.Args["numberTeam"].(int)
	price, _ := params.Args["price"].(float64)
	deadlineDate, _ := params.Args["deadlineDate"].(string)
	priceParticipate, _ := params.Args["priceParticipate"].(float64)
	rules, _ := params.Args["rules"].(string)
	game,err := t.gameTournamentHandler.FindOneGameByUidHandler(gameUid)
	plateform,err := t.plateformTournamentHandler.FindOnePlateformByUidHandler(plateformUid)

	if err != nil {
		return nil,err
	}

	tournament := &entity.Tournament{
		Uid:primitive.NewObjectID(),
		Title:title,
		Date:date,
		Game: game,
		Plateform: plateform,
		NumberParticipate:numberParticipate,
		NumberTeam:numberTeam,
		Price:price,
		DeadlineDate:deadlineDate,
		PriceParticipate:priceParticipate,
		Statut:true,
		Info:description,
		Rules:rules,
		IsPublic:true,
	}

	res, err := t.tournamentHandler.SavedTournamentHandler(tournament)

	if err != nil {
		return nil, err
	}

	return res, nil
} 

func (t *tournament) FindTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	res, err := t.tournamentHandler.FindTournamentHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
} 

func (t *tournament) FindAllTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0{
		pageNumber = 1
	}

	res, err := t.tournamentHandler.FindAllTournamentHandler(int64(pageNumber),int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
} 

func (t *tournament) FindTournamentGameResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0{
		pageNumber = 1
	}

	gameUid, _ := params.Args["slugGame"].(string)
	game,err := t.gameTournamentHandler.FindOneGameBySlugHandler(gameUid)

	if err != nil {
		return nil, err
	}

	res, err := t.tournamentHandler.FindTournamentGameHandler(int64(pageNumber),int64(limit),game.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil

}