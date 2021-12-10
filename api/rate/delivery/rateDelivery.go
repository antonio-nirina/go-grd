package delivery

import (
	"time"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/rate/entity"
	"github.com/thoussei/antonio/api/rate/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RateResolver interface {
	CreatedRateResolver(params graphql.ResolveParams) (interface{}, error)
	FindRateResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllRateResolver(params graphql.ResolveParams) (interface{}, error)
	CreatedOrUpdatedRateResolver(params graphql.ResolveParams) (interface{}, error)
	FindRateByUserResolver(params graphql.ResolveParams) (interface{}, error)
	FindRateInWeekResolver(params graphql.ResolveParams) (interface{}, error)
}

type rate struct {
	rateHandler     handler.UsecaseRate
	userHandler userHandler.Usecase
}

func NewResolverRate(rateHandler handler.UsecaseRate, userHandler userHandler.Usecase) RateResolver {
	return &rate{
		rateHandler:     rateHandler,
		userHandler: userHandler,
	}
}

func (r *rate) CreatedRateResolver(params graphql.ResolveParams) (interface{}, error) {
	created, _ := params.Args["created"].(string)
	updated, _ := params.Args["updated"].(string)
	user, _ := params.Args["user"].(string)
	score, _ := params.Args["score"].(int)

	rate := &entity.Rate{
		Uid: primitive.NewObjectID(),
		Created: created,
		Updated: updated,
		User: user,
		Score: score,
	}

	res, err := r.rateHandler.SavedRateHandler(rate)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *rate) FindRateResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	rate, err := r.rateHandler.FindRateHandler(uid)

	if err != nil {
		return nil, err
	}

	return rate, nil
}

func (r *rate) FindAllRateResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)
	rate, err := r.rateHandler.FindAllRateHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return rate, nil
}

func (r *rate) FindRateInWeekResolver(params graphql.ResolveParams) (interface{}, error) {
	uidUser, _ := params.Args["uid"].(string)
	date := time.Date(time.Now().Year(),time.Now().Month(),time.Now().Day() - 7,0,0,0,0,time.Local) // params.Args["date"].(string)
	_, err := r.rateHandler.FindRateByUserHandler(uidUser)

	if err != nil {
		return nil, err
	}
	rate, err := r.rateHandler.FindRateInWeekHandler(uidUser,date)
	

	return rate, nil
}

func (r *rate) CreatedOrUpdatedRateResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	uidUser, _ := params.Args["uidUser"].(string)
	newRate, err := r.rateHandler.FindRateCreateOrUpdatedHandler(uidUser,uid)
	
	if err != nil {
		return nil, err
	}

	return newRate, nil
}

func (r *rate) FindRateByUserResolver(params graphql.ResolveParams) (interface{}, error) {
	uidUser, _ := params.Args["uidUser"].(string)
	rate, err := r.rateHandler.FindRateByUserHandler(uidUser)

	if err != nil {
		return nil, err
	}

	return rate, nil
}