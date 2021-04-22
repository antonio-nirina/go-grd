package mutation

import (

	"github.com/antonio-nirina/go-grd/api/config"
	"github.com/antonio-nirina/go-grd/api/user/delivery"
	"github.com/antonio-nirina/go-grd/api/repository"
	"github.com/antonio-nirina/go-grd/api/handler"

	"github.com/graphql-go/graphql"
)

var database = config.ConfigMongo()
var rep = repository.NewUserRepository(database)
var usecase = handler.NewUsecaseUser(rep)
var UserRolve = delivery.NewResolver(usecase)

func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"createdUser": createdUser(),
	}
}




