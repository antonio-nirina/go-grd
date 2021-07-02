package mutation

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

var database 			= config.ConfigMongo()
var repUser 			= repository.NewUserRepository(database)
var repositoryNotif 	= notifRepo.NewRepository(database)
var repositoryGame 		= gameRepo.NewGameRepository(database)

var usecaseNotif 		= notifHandler.NewUsecaseNotif(repositoryNotif)
var usecase 			= handler.NewUsecaseUser(repUser)
var UserRolve 			= delivery.NewResolver(usecase,usecaseNotif)
var usecaseGame 		= gameHandler.NewUsecaseGame(repositoryGame)
var gameResolver 		= gameDelivery.NewResolverGame(usecaseGame)

var repositoryPlateform = gameRepo.NewPlateformRepository(database)
var usecasePlateform 	= gameHandler.NewUsecasePlateform(repositoryPlateform)
var plateformResolver 	= gameDelivery.NewResolverPlateform(usecasePlateform)

var NotifResolver 		= notifDelivery.NewNotifResolver(usecaseNotif,usecase)

func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"createdUser":      	createdUser(),
		"login":            	login(),
		"createdGame":      	createdGame(),
		"createdPlateform": 	createdPlateform(),
		"updatedUser": 			updatedUser(),
		"forgotPassword":		forgotPassword(),
		"updatedPasswordUser": 	updatedPasswordUser(),
		"updatedAvatar":		updatedAvatar(),
		"requestFriend":		requestFriend(),
		"saveNotification":		saveNotification(),
		"updateNotification": 	updateNotification(),
		"AcceptedRequestFriend": AcceptedRequestFriend(),
		"deconected":			Deconnected(),
	}
}
