package mutation

import (
	"github.com/thoussei/antonio/main/front-office/api/config"
	"github.com/thoussei/antonio/main/front-office/api/user/delivery"
	"github.com/thoussei/antonio/main/front-office/api/user/handler"
	"github.com/thoussei/antonio/main/front-office/api/user/repository"

	gameDelivery "github.com/thoussei/antonio/main/front-office/api/games/delivery"
	gameHandler "github.com/thoussei/antonio/main/front-office/api/games/handler"
	gameRepo "github.com/thoussei/antonio/main/front-office/api/games/repository"

	"github.com/graphql-go/graphql"
)

var database = config.ConfigMongo()
var repUser = repository.NewUserRepository(database)
var usecase = handler.NewUsecaseUser(repUser)
var UserRolve = delivery.NewResolver(usecase)

var repositoryGame = gameRepo.NewGameRepository(database)
var usecaseGame = gameHandler.NewUsecaseGame(repositoryGame)
var gameResolver = gameDelivery.NewResolverGame(usecaseGame)

var repositoryPlateform = gameRepo.NewPlateformRepository(database)
var usecasePlateform = gameHandler.NewUsecasePlateform(repositoryPlateform)
var plateformResolver = gameDelivery.NewResolverPlateform(usecasePlateform)

func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"createdUser":      createdUser(),
		"login":            login(),
		"createdGame":      createdGame(),
		"createdPlateform": createdPlateform(),
		"updatedUser": 		updatedUser(),
		"forgotPassword":	forgotPassword(),
	}
}
