package delivery

import (
	"encoding/json"
	"strconv"

	"github.com/graphql-go/graphql"
	gameHandler "github.com/thoussei/antonio/api/games/handler"
	"github.com/thoussei/antonio/api/wagger/entity"
	"github.com/thoussei/antonio/api/wagger/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type WaggerResolver interface {
	SavedWaggerResolver(params graphql.ResolveParams) (interface{}, error)
	FindWaggerResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllWaggerResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedWaggerResolver(params graphql.ResolveParams) (interface{}, error)
}

type wagger struct {
	waggerHandler          handler.UsecaseWagger
	gameWaggerHandler      gameHandler.UsecaseGameInterface
	plateformWaggerHandler gameHandler.UsecasePlateformInterface
}

type inputUpdatedWagger struct {
	WaggerUpated updatedWagger `json:"waggerUpated"`
}

type updatedWagger struct {
	Uid              string `json:"uid"`
	Date             string `json:"date"`
	Title            string `json:"title"`
	Description      string `json:"description"`
	Price            string `json:"price"`
	DeadlineDate     string `json:"deadlineDate"`
	GameWay          string `json:"gameWay"`
	PriceParticipate string `json:"priceParticipate"`
	Format           string `json:"format"`
	Participant      string `json:"participant"`
	IsPublic         string `json:"IsPublic"`
	Statut           string `json:"statut"`
	Rules            string `json:"rules"`
}

func NewResolverWagger(waggerUseCase handler.UsecaseWagger, waggerGame gameHandler.UsecaseGameInterface, waggerPlateform gameHandler.UsecasePlateformInterface) WaggerResolver {
	return &wagger{
		waggerHandler:          waggerUseCase,
		gameWaggerHandler:      waggerGame,
		plateformWaggerHandler: waggerPlateform,
	}
}

func (w *wagger) SavedWaggerResolver(params graphql.ResolveParams) (interface{}, error) {
	title, _ := params.Args["title"].(string)
	date, _ := params.Args["date"].(string)
	description, _ := params.Args["description"].(string)
	price, _ := params.Args["price"].(float64)
	deadlineDate, _ := params.Args["deadlineDate"].(string)
	gameUid, _ := params.Args["uidGame"].(string)
	plateformUid, _ := params.Args["uidPalteforme"].(string)
	priceParticipate, _ := params.Args["priceParticipate"].(float64)
	gameWay, _ := params.Args["gameWay"].(string)
	format, _ := params.Args["format"].(string)
	isPublic, _ := params.Args["isPublic"].(bool)
	participant, _ := params.Args["participant"].(int)
	rules, _ := params.Args["rules"].(string)
	game, err := w.gameWaggerHandler.FindOneGameByUidHandler(gameUid)
	plateform, err := w.plateformWaggerHandler.FindOnePlateformByUidHandler(plateformUid)

	if err != nil {
		return nil, err
	}

	wagger := &entity.Wagger{
		Uid:              primitive.NewObjectID(),
		Title:            title,
		Date:             date,
		Participant:      participant,
		Game:             game,
		Plateform:        plateform,
		Price:            price,
		DeadlineDate:     deadlineDate,
		PriceParticipate: priceParticipate,
		Statut:           true,
		Description:      description,
		GameWay:          gameWay,
		Format:           format,
		IsPublic:         isPublic,
		Rules:            rules,
	}

	res, err := w.waggerHandler.SavedWaggerHandle(wagger)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (w *wagger) FindWaggerResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	res, err := w.waggerHandler.FindWaggerHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (w *wagger) FindAllWaggerResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)
	res, err := w.waggerHandler.FindAllWaggerHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (w *wagger) UpdatedWaggerResolver(params graphql.ResolveParams) (interface{}, error) {
	jsonString, _ := json.Marshal(params.Args)
	input := inputUpdatedWagger{}
	json.Unmarshal([]byte(jsonString), &input)
	wagger, err := w.waggerHandler.FindOneWaggerHandler(input.WaggerUpated.Uid)

	if err != nil {
		return nil, err
	}

	date := wagger.Date
	title := wagger.Title
	description := wagger.Description
	price := wagger.Price
	deadlineDate := wagger.DeadlineDate
	gameWay := wagger.GameWay
	priceParticipate := wagger.PriceParticipate
	format := wagger.Format
	isPublic := wagger.IsPublic
	statut := wagger.Statut
	participant := wagger.Participant
	rules := wagger.Rules

	if input.WaggerUpated.Date != "" {
		date = input.WaggerUpated.Date
	}

	if input.WaggerUpated.Title != "" {
		title = input.WaggerUpated.Title
	}

	if input.WaggerUpated.Description != "" {
		description = input.WaggerUpated.Description
	}

	if input.WaggerUpated.Price != "" {
		price, _ = strconv.ParseFloat(input.WaggerUpated.Price, 64)
	}

	if input.WaggerUpated.DeadlineDate != "" {
		deadlineDate = input.WaggerUpated.DeadlineDate
	}

	if input.WaggerUpated.GameWay != "" {
		gameWay = input.WaggerUpated.GameWay
	}

	if input.WaggerUpated.PriceParticipate != "" {
		priceParticipate, _ = strconv.ParseFloat(input.WaggerUpated.PriceParticipate, 64)
	}

	if input.WaggerUpated.Format != "" {
		format = input.WaggerUpated.Format
	}

	if input.WaggerUpated.IsPublic != "" {
		isPublic, _ = strconv.ParseBool(input.WaggerUpated.IsPublic)
	}

	if input.WaggerUpated.Statut != "" {
		statut, _ = strconv.ParseBool(input.WaggerUpated.Statut)
	}

	if input.WaggerUpated.Participant != "" {
		participant, _ = strconv.Atoi(input.WaggerUpated.Participant)
	}

	if input.WaggerUpated.Rules != "" {
		rules = input.WaggerUpated.Rules
	}

	waggerToupdated := &entity.Wagger{
		Uid:              wagger.Uid,
		Date:             date,
		Title:            title,
		Description:      description,
		Game:             wagger.Game,
		Plateform:        wagger.Plateform,
		Price:            price,
		DeadlineDate:     deadlineDate,
		GameWay:          gameWay,
		PriceParticipate: priceParticipate,
		Format:           format,
		IsPublic:         isPublic,
		Participant:      participant,
		Statut:           statut,
		Rules:            rules,
	}

	res, err := w.waggerHandler.UpdatedWaggerHandler(waggerToupdated)

	if err != nil {
		return nil, err
	}

	return res, nil
}
