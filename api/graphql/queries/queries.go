package queries

import (
	"github.com/thoussei/antonio/front-office/api/config"
	"github.com/thoussei/antonio/front-office/api/user/delivery"
	"github.com/thoussei/antonio/front-office/api/user/handler"
	"github.com/thoussei/antonio/front-office/api/user/repository"

	gameDelivery "github.com/thoussei/antonio/front-office/api/games/delivery"
	gameHandler "github.com/thoussei/antonio/front-office/api/games/handler"
	gameRepo "github.com/thoussei/antonio/front-office/api/games/repository"

	notifDelivery "github.com/thoussei/antonio/front-office/api/notification/delivery"
	notifHandler "github.com/thoussei/antonio/front-office/api/notification/handler"
	notifRepo "github.com/thoussei/antonio/front-office/api/notification/repository"

	"github.com/graphql-go/graphql"
)

var database = config.ConfigMongo()
var rep = repository.NewUserRepository(database)
var usecase = handler.NewUsecaseUser(rep)
var UserRolve = delivery.NewResolver(usecase)

var repositoryGame = gameRepo.NewGameRepository(database)
var usecaseGame = gameHandler.NewUsecaseGame(repositoryGame)
var gameResolver = gameDelivery.NewResolverGame(usecaseGame)

var repositoryPlateform = gameRepo.NewPlateformRepository(database)
var usecasePlateform = gameHandler.NewUsecasePlateform(repositoryPlateform)
var plateformResolver = gameDelivery.NewResolverPlateform(usecasePlateform)

var repositoryNotif 	= notifRepo.NewRepository(database)
var usecaseNotif 	= notifHandler.NewUsecaseNotif(repositoryNotif)
var notifResolver = notifDelivery.NewNotifResolver(usecaseNotif)


// GetRootFields returns all the available queries.
func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"FindOneUser":      		GetOneUserQuery(),
		"FindOneGame":      		GetOneGameQuery(),
		"FindOnePlateform": 		GetOnePlateformQuery(),
		"FindAllGame":      		GetAllGameQuery(),
		"FindAllPlateform": 		GetAllPlateformQuery(),
		"GetAccessTokenXbox": 		GetAccessTokenXbox(),
		"GetProfilUserXbox": 		GetProfilUserXbox(),
		"GetAllFriends": 	 		GetAllFriends(),
		"GetUsers": 				GetUsers(),
		"GetOneNotification": 		GetOneNotification(),
		"GetAllNotifications": 		GetAllNotifications(),
	}
}
