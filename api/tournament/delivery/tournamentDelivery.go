package delivery

import (
	"encoding/json"
	"strconv"

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
	UpdatedTournamentResolver(params graphql.ResolveParams) (interface{}, error)
}

type tournament struct {
	tournamentHandler          handler.UsecaseTournament
	gameTournamentHandler      gameHandler.UsecaseGameInterface
	plateformTournamentHandler gameHandler.UsecasePlateformInterface
}

type inputUpdatedTournament struct {
	trUpated updatedTournament `json:"trUpated"`
}

type updatedTournament struct {
	Uid               string `json:"uid"`
	Title             string `json:"title"`
	Date              string `json:"date"`
	NumberParticipate string `json:"numberParticipate"`
	NumberTeam        string `json:"numberTeam"`
	Price             string `json:"price"`
	DeadlineDate      string `json:"deadlineDate"`
	PriceParticipate  string `json:"priceParticipate"`
	Statut            string `json:"statut"`
	Info              string `json:"info"`
	Rules             string `json:"rules"`
	IsTeam            string `json:"isTeam"`
	IsPublic          string `json:"isPublic"`
}

func NewResolverTournament(tournamentUseCase handler.UsecaseTournament, tournamentGame gameHandler.UsecaseGameInterface, tournamentPlateform gameHandler.UsecasePlateformInterface) TournamentResolver {
	return &tournament{
		tournamentHandler:          tournamentUseCase,
		gameTournamentHandler:      tournamentGame,
		plateformTournamentHandler: tournamentPlateform,
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
	game, err := t.gameTournamentHandler.FindOneGameByUidHandler(gameUid)
	plateform, err := t.plateformTournamentHandler.FindOnePlateformByUidHandler(plateformUid)

	if err != nil {
		return nil, err
	}

	IsTeam := false

	if numberTeam > 0 {
		IsTeam = true
	}

	tournament := &entity.Tournament{
		Uid:               primitive.NewObjectID(),
		Title:             title,
		Date:              date,
		Game:              game,
		Plateform:         plateform,
		NumberParticipate: numberParticipate,
		NumberTeam:        numberTeam,
		Price:             price,
		IsTeam:            IsTeam,
		DeadlineDate:      deadlineDate,
		PriceParticipate:  priceParticipate,
		Statut:            true,
		Info:              description,
		Rules:             rules,
		IsPublic:          true,
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
	res, err := t.tournamentHandler.FindAllTournamentHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (t *tournament) FindTournamentGameResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0 {
		pageNumber = 1
	}

	gameUid, _ := params.Args["slugGame"].(string)
	game, err := t.gameTournamentHandler.FindOneGameBySlugHandler(gameUid)

	if err != nil {
		return nil, err
	}

	res, err := t.tournamentHandler.FindTournamentGameHandler(int64(pageNumber), int64(limit), game.Uid)

	if err != nil {
		return nil, err
	}

	return res, nil

}

func (t *tournament) UpdatedTournamentResolver(params graphql.ResolveParams) (interface{}, error) {
	jsonString, _ := json.Marshal(params.Args)
	input := inputUpdatedTournament{}
	json.Unmarshal([]byte(jsonString), &input)
	tournament, err := t.tournamentHandler.FindOneTournamentHandler(input.trUpated.Uid)

	if err != nil {
		return nil, err
	}

	title := tournament.Title
	date := tournament.Date
	numberParticipate := tournament.NumberParticipate
	numberTeam := tournament.NumberTeam
	price := tournament.Price
	deadlineDate := tournament.DeadlineDate
	priceParticipate := tournament.PriceParticipate
	statut := tournament.Statut
	info := tournament.Info
	rules := tournament.Rules
	isTeam := tournament.IsTeam
	isPublic := tournament.IsPublic

	if input.trUpated.Date != "" {
		date = input.trUpated.Date
	}

	if input.trUpated.Title != "" {
		title = input.trUpated.Title
	}

	if input.trUpated.NumberParticipate != "" {
		numberParticipate, _ = strconv.Atoi(input.trUpated.NumberParticipate)
	}

	if input.trUpated.NumberTeam != "" {
		numberTeam, _ = strconv.Atoi(input.trUpated.NumberTeam)
	}

	if input.trUpated.Price != "" {
		price, _ = strconv.ParseFloat(input.trUpated.Price, 64)
	}

	if input.trUpated.DeadlineDate != "" {
		deadlineDate = input.trUpated.DeadlineDate
	}

	if input.trUpated.PriceParticipate != "" {
		priceParticipate, _ = strconv.ParseFloat(input.trUpated.PriceParticipate, 64)
	}

	if input.trUpated.Statut != "" {
		statut, _ = strconv.ParseBool(input.trUpated.Statut)
	}

	if input.trUpated.Info != "" {
		info = input.trUpated.Info
	}

	if input.trUpated.Rules != "" {
		rules = input.trUpated.Rules
	}

	if input.trUpated.IsTeam != "" {
		isTeam, _ = strconv.ParseBool(input.trUpated.IsTeam)
	}

	if input.trUpated.IsPublic != "" {
		isPublic, _ = strconv.ParseBool(input.trUpated.IsPublic)
	}

	tournamentUpdated := &entity.Tournament{
		Uid:               tournament.Uid,
		Title:             title,
		Date:              date,
		Game:              tournament.Game,
		Plateform:         tournament.Plateform,
		NumberParticipate: numberParticipate,
		NumberTeam:        numberTeam,
		Price:             price,
		DeadlineDate:      deadlineDate,
		PriceParticipate:  priceParticipate,
		Statut:            statut,
		Info:              info,
		Rules:             rules,
		IsTeam:            isTeam,
		IsPublic:          isPublic,
	}

	res, err := t.tournamentHandler.UpdatedTournamentHandler(tournamentUpdated)

	if err != nil {
		return nil, err
	}

	return res, nil
}
