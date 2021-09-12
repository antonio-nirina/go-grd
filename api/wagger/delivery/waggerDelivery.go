package delivery

import (
	"encoding/json"
	"strconv"

	"github.com/graphql-go/graphql"
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
	waggerHandler handler.UsecaseWagger
}

type inputUpdatedWagger struct {
	WaggerUpated updatedWagger `json:"waggerUpated"`
}

type updatedWagger struct {
	Uid           			string 	`json:"uid"`
	Date 					string `json:"date"`
	Title 					string `json:"title"`
	Description 			string `json:"description"`
	Price 					string `json:"price"`
	DeadlineDate 			string `json:"deadlineDate"`
	GameWay 				string `json:"gameWay"`
	PriceParticipate 		string  `json:"priceParticipate"`
	Format 					string `json:"format"`
	IsPublic 				string `json:"IsPublic"`
	Statut 		  			string `json:"statut"`
}


func NewResolverWagger(waggerUseCase handler.UsecaseWagger) WaggerResolver {
	return &wagger{
		waggerHandler: waggerUseCase,
	}
}

func (w *wagger) SavedWaggerResolver(params graphql.ResolveParams) (interface{}, error) {
	title, _ := params.Args["title"].(string)
	date, _ := params.Args["date"].(string)
	description, _ := params.Args["description"].(string)
	price, _ := params.Args["price"].(float64)
	deadlineDate, _ := params.Args["deadlineDate"].(string)
	priceParticipate, _ := params.Args["priceParticipate"].(float64)
	gameWay,_ := params.Args["gameWay"].(string)
	format,_ := params.Args["format"].(string)
	isPublic,_ := params.Args["isPublic"].(bool)
	wagger := &entity.Wagger{
		Uid: primitive.NewObjectID(),
		Title:title,
		Date:date,
		Price:price,
		DeadlineDate:deadlineDate,
		PriceParticipate:priceParticipate,
		Statut:true,
		Description:description,
		GameWay:gameWay,
		Format:format,
		IsPublic:isPublic,
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

	if pageNumber == 0 && limit > 0 {
		pageNumber = 1
	}

	res, err := w.waggerHandler.FindAllWaggerHandler(int64(pageNumber),int64(limit))

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
		price , _ = strconv.ParseFloat(input.WaggerUpated.Price,64)
	}

	if input.WaggerUpated.DeadlineDate != "" {
		deadlineDate = input.WaggerUpated.DeadlineDate
	}

	if input.WaggerUpated.GameWay != "" {
		gameWay = input.WaggerUpated.GameWay
	}

	if input.WaggerUpated.PriceParticipate != "" {
		priceParticipate , _ = strconv.ParseFloat(input.WaggerUpated.PriceParticipate,64)
	}

	if input.WaggerUpated.Format != "" {
		format = input.WaggerUpated.Format
	}

	if input.WaggerUpated.IsPublic != "" {
		isPublic , _ = strconv.ParseBool(input.WaggerUpated.IsPublic)
	}

	if input.WaggerUpated.Statut != "" {
		statut  , _ = strconv.ParseBool(input.WaggerUpated.Statut)
	}

	waggerToupdated := &entity.Wagger {
		Uid:wagger.Uid,
		Date:date, 					
		Title:title, 				
		Description:description,			
		Price:price, 				
		DeadlineDate:deadlineDate, 			
		GameWay:gameWay,			
		PriceParticipate:priceParticipate,	
		Format:format,			
		IsPublic:isPublic,		
		Statut:statut,
	}

	res, err := w.waggerHandler.UpdatedWaggerHandler(waggerToupdated)

	if err != nil {
		return nil, err
	}

	return res, nil
}