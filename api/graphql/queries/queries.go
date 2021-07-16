package queries

import (
	"github.com/thoussei/antonio/api/config"
	"github.com/thoussei/antonio/api/user/delivery"
	"github.com/thoussei/antonio/api/user/handler"
	"github.com/thoussei/antonio/api/user/repository"

	gameDelivery "github.com/thoussei/antonio/api/games/delivery"
	gameHandler "github.com/thoussei/antonio/api/games/handler"
	gameRepo "github.com/thoussei/antonio/api/games/repository"

	notifDelivery "github.com/thoussei/antonio/api/notification/delivery"
	notifHandler "github.com/thoussei/antonio/api/notification/handler"
	notifRepo "github.com/thoussei/antonio/api/notification/repository"

	tournamentDelivery "github.com/thoussei/antonio/api/tournament/delivery"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
	tournamentRepo "github.com/thoussei/antonio/api/tournament/repository"

	"github.com/graphql-go/graphql"
)

var database = config.ConfigMongo()
var rep = repository.NewUserRepository(database)
var repositoryNotif 	= notifRepo.NewRepository(database)

// Usecase
var usecaseNotif 	= notifHandler.NewUsecaseNotif(repositoryNotif)
var usecase = handler.NewUsecaseUser(rep)
var UserRolve = delivery.NewResolver(usecase,usecaseNotif)

var repositoryGame = gameRepo.NewGameRepository(database)
var usecaseGame = gameHandler.NewUsecaseGame(repositoryGame)
var gameResolver = gameDelivery.NewResolverGame(usecaseGame)

var repositoryPlateform = gameRepo.NewPlateformRepository(database)
var usecasePlateform = gameHandler.NewUsecasePlateform(repositoryPlateform)
var plateformResolver = gameDelivery.NewResolverPlateform(usecasePlateform)

var tournamentRepository = tournamentRepo.NewTournamentRepository(database)
var tournamentUsecase 	= tournamentHandler.NewUsecaseTournament(tournamentRepository)
var tournamentResolver 	= tournamentDelivery.NewResolverTournament(tournamentUsecase,usecaseGame,usecasePlateform)


var notifResolver = notifDelivery.NewNotifResolver(usecaseNotif,usecase)


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
		"GetAccessTokenTwitch":		GetAccessTokenTwitch(),
		"FindOneTournament": 		FindOneTournament(),
		"FindAllTournament":      	FindAllTournament(),
	}
}
