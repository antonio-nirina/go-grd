package delivery

import (
	"github.com/graphql-go/graphql"
	gameHandler "github.com/thoussei/antonio/api/games/handler"
	"github.com/thoussei/antonio/api/league/entity"
	"github.com/thoussei/antonio/api/league/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LeagueResolver interface {
	SavedLeagueResolver(params graphql.ResolveParams) (interface{}, error)
	FindLeagueResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllLeagueResolver(params graphql.ResolveParams) (interface{}, error)
	FindLeagueGameResolver(params graphql.ResolveParams) (interface{}, error)
}

type league struct {
	leagueHandler          handler.UsecaseLeague
	gameLeagueHandler      gameHandler.UsecaseGameInterface
	plateformLeagueHandler gameHandler.UsecasePlateformInterface
}

func NewResolverLeague(
	leagueUseCase handler.UsecaseLeague,
	leagueGame gameHandler.UsecaseGameInterface,
	leaguePlateform gameHandler.UsecasePlateformInterface,
) LeagueResolver {
	return &league{
		leagueHandler:          leagueUseCase,
		gameLeagueHandler:      leagueGame,
		plateformLeagueHandler: leaguePlateform,
	}
}

func (l *league) SavedLeagueResolver(params graphql.ResolveParams) (interface{}, error) {
	title, _ := params.Args["title"].(string)
	date, _ := params.Args["date"].(string)
	gameUid, _ := params.Args["uidGame"].(string)
	plateformUid, _ := params.Args["uidPalteforme"].(string)
	description, _ := params.Args["description"].(string)
	numberParticipate, _ := params.Args["numberParticipate"].(int)
	numberTeam, _ := params.Args["numberTeam"].(int)
	numberGroup, _ := params.Args["numberGroup"].(int)
	price, _ := params.Args["price"].(float64)
	deadlineDate, _ := params.Args["deadlineDate"].(string)
	priceParticipate, _ := params.Args["priceParticipate"].(float64)
	rules, _ := params.Args["rules"].(string)
	game, err := l.gameLeagueHandler.FindOneGameByUidHandler(gameUid)
	plateform, err := l.plateformLeagueHandler.FindOnePlateformByUidHandler(plateformUid)

	if err != nil {
		return nil, err
	}

	IsTeam := false

	if numberTeam > 0 {
		IsTeam = true
	}

	league := &entity.League{
		Uid:               primitive.NewObjectID(),
		Title:             title,
		Date:              date,
		Game:              game,
		Plateform:         plateform,
		NumberParticipate: numberParticipate,
		NumberTeam:        numberTeam,
		Price:             price,
		DeadlineDate:      deadlineDate,
		PriceParticipate:  priceParticipate,
		Statut:            true,
		Info:              description,
		Rules:             rules,
		IsPublic:          true,
		IsTeam:            IsTeam,
		NumberGroup:       numberGroup,
	}

	res, err := l.leagueHandler.SavedLeagueHandler(league)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (l *league) FindLeagueResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	res, err := l.leagueHandler.FindLeagueHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (l *league) FindAllLeagueResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0 {
		pageNumber = 1
	}

	res, err := l.leagueHandler.FindAllLeagueHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (l *league) FindLeagueGameResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0 {
		pageNumber = 1
	}

	gameUid, _ := params.Args["slugGame"].(string)
	game, err := l.gameLeagueHandler.FindOneGameBySlugHandler(gameUid)

	if err != nil {
		return nil, err
	}

	res, err := l.leagueHandler.FindLeagueGameHandler(int64(pageNumber), int64(limit), game.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil

}
