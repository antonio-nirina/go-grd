package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/rate/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
)

type RateResolver interface {
	CreatedRateResolver(params graphql.ResolveParams) (interface{}, error)
	FindRateResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllRateResolver(params graphql.ResolveParams) (interface{}, error)
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
	return "",nil
}

func (r *rate) FindRateResolver(params graphql.ResolveParams) (interface{}, error) {
	return "",nil
}

func (r *rate) FindAllRateResolver(params graphql.ResolveParams) (interface{}, error) {
	return "",nil
}

