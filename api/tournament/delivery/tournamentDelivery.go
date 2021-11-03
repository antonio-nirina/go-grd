package delivery

import (
	"encoding/json"
	"strconv"
	"strings"

	"github.com/graphql-go/graphql"
	gameEntity "github.com/thoussei/antonio/api/games/entity"
	gameHandler "github.com/thoussei/antonio/api/games/handler"
	"github.com/thoussei/antonio/api/tournament/entity"
	"github.com/thoussei/antonio/api/tournament/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
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
	tournamentUserHandler      userHandler.Usecase
}

type inputUpdatedTournament struct {
	TrUpated updatedTournament `json:"trUpated"`
}

type updatedTournament struct {
	Uid               string `json:"uid"`
	Title             string `json:"title"`
	DateDebut         string `json:"dateDebut"`
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
	priceParticipate, _ := params.Args["priceParticipate"].(string)
	rules, _ := params.Args["rules"].(string)
	spectateur, _ := params.Args["spectateur"].(string)
	laps, _ := params.Args["laps"].(string)
	format, _ := params.Args["format"].(string)
	region, _ := params.Args["region"].(string)
	server, _ := params.Args["server"].(string)
	game, err := t.gameTournamentHandler.FindOneGameByUidHandler(gameUid)
	var plateforms []gameEntity.GamePlatform
	arrayPlateforms := strings.Split(plateformUid, "_")
	arrayLaps := strings.Split(laps, "_")
	for _, value := range arrayPlateforms {
		plateform, err := t.plateformTournamentHandler.FindOnePlateformByUidHandler(value)
		if err != nil {
			return nil, err
		}
		plateforms = append(plateforms, plateform)
	}

	IsTeam := false

	if numberTeam > 0 {
		IsTeam = true
	}

	tournament := &entity.Tournament{
		Uid:               primitive.NewObjectID(),
		Title:             title,
		DateStart:         date,
		Game:              game,
		Plateform:         plateforms,
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
		Spectateur:        spectateur,
		Laps:              arrayLaps,
		Format: 			format,
		Server: 			server,
		Region: 			region,
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
	tournament, err := t.tournamentHandler.FindOneTournamentHandler(input.TrUpated.Uid)

	if err != nil {
		return nil, err
	}

	title := tournament.Title
	date := tournament.DateStart
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

	if input.TrUpated.DateDebut != "" {
		date = input.TrUpated.DateDebut
	}

	if input.TrUpated.Title != "" {
		title = input.TrUpated.Title
	}

	if input.TrUpated.NumberParticipate != "" {
		numberParticipate, _ = strconv.Atoi(input.TrUpated.NumberParticipate)
	}

	if input.TrUpated.NumberTeam != "" {
		numberTeam, _ = strconv.Atoi(input.TrUpated.NumberTeam)
	}

	if input.TrUpated.Price != "" {
		price, _ = strconv.ParseFloat(input.TrUpated.Price, 64)
	}

	if input.TrUpated.DeadlineDate != "" {
		deadlineDate = input.TrUpated.DeadlineDate
	}

	if input.TrUpated.PriceParticipate != "" {
		priceParticipate = input.TrUpated.PriceParticipate
	}

	if input.TrUpated.Statut != "" {
		statut, _ = strconv.ParseBool(input.TrUpated.Statut)
	}

	if input.TrUpated.Info != "" {
		info = input.TrUpated.Info
	}

	if input.TrUpated.Rules != "" {
		rules = input.TrUpated.Rules
	}

	if input.TrUpated.IsTeam != "" {
		isTeam, _ = strconv.ParseBool(input.TrUpated.IsTeam)
	}

	if input.TrUpated.IsPublic != "" {
		isPublic, _ = strconv.ParseBool(input.TrUpated.IsPublic)
	}

	tournamentUpdated := &entity.Tournament{
		Uid:               tournament.Uid,
		Title:             title,
		DateStart:         date,
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
