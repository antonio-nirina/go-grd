package delivery

import (
	"strings"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/external"
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
	entry,_ := params.Args["entry"].(string)
	format,_ := params.Args["format"].(string)
	isPublic,_ := params.Args["isPublic"].(bool)
	wagger := &entity.Wagger{
		Uid: primitive.NewObjectID(),
		Title:title,
		Date:date,
		Price:price,
		IsTeam:IsTeam,
		DeadlineDate:deadlineDate,
		PriceParticipate:priceParticipate,
		Statut:true,
		Description:description,
		GameWay:gameWay,
		Entry:entry,
		Format:format,
		IsPublic:isPublic
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

