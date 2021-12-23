package mutation

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

	cmtyDelivery "github.com/thoussei/antonio/api/community/delivery"
	cmtyHandler "github.com/thoussei/antonio/api/community/handler"
	cmtyRepo "github.com/thoussei/antonio/api/community/repository"

	partDelivery "github.com/thoussei/antonio/api/participate/delivery"
	partHandler "github.com/thoussei/antonio/api/participate/handler"
	partRepo "github.com/thoussei/antonio/api/participate/repository"

	homeDelivery "github.com/thoussei/antonio/api/home/delivery"
	homeHandler "github.com/thoussei/antonio/api/home/handler"
	homeRepo "github.com/thoussei/antonio/api/home/repository"

	teamDelivery "github.com/thoussei/antonio/api/teams/delivery"
	teamHandler "github.com/thoussei/antonio/api/teams/handler"
	teamRepo "github.com/thoussei/antonio/api/teams/repository"

	asistDelivery "github.com/thoussei/antonio/api/asistant/delivery"
	asistHandler "github.com/thoussei/antonio/api/asistant/handler"
	asistRepo "github.com/thoussei/antonio/api/asistant/repository"

	leagueDelivery "github.com/thoussei/antonio/api/league/delivery"
	leagueHandler "github.com/thoussei/antonio/api/league/handler"
	leagueRepo "github.com/thoussei/antonio/api/league/repository"

	waggerDelivery "github.com/thoussei/antonio/api/wagger/delivery"
	waggerHandler "github.com/thoussei/antonio/api/wagger/handler"
	waggerRepo "github.com/thoussei/antonio/api/wagger/repository"

	postDelivery "github.com/thoussei/antonio/api/post/delivery"
	postHandler "github.com/thoussei/antonio/api/post/handler"
	postRepo "github.com/thoussei/antonio/api/post/repository"

	groupDelivery "github.com/thoussei/antonio/api/group/delivery"
	groupHandler "github.com/thoussei/antonio/api/group/handler"
	groupRepo "github.com/thoussei/antonio/api/group/repository"

	rateDelivery "github.com/thoussei/antonio/api/rate/delivery"
	rateHandler "github.com/thoussei/antonio/api/rate/handler"
	rateRepo "github.com/thoussei/antonio/api/rate/repository"

	supportDelivery "github.com/thoussei/antonio/api/support/delivery"
	supportHandler "github.com/thoussei/antonio/api/support/handler"
	supportRepo "github.com/thoussei/antonio/api/support/repository"

	"github.com/graphql-go/graphql"
)

var database = config.ConfigMongo()
var repUser = repository.NewUserRepository(database)
var repositoryNotif = notifRepo.NewRepository(database)
var repositoryGame = gameRepo.NewGameRepository(database)

var repositoryPlateform = gameRepo.NewPlateformRepository(database)
var usecasePlateform = gameHandler.NewUsecasePlateform(repositoryPlateform)
var plateformResolver = gameDelivery.NewResolverPlateform(usecasePlateform)

var usecaseNotif = notifHandler.NewUsecaseNotif(repositoryNotif, usecase)
var usecase = handler.NewUsecaseUser(repUser)
var usecaseGame = gameHandler.NewUsecaseGame(repositoryGame)
var UserRolve = delivery.NewResolver(usecase, usecaseNotif, usecaseGame, usecasePlateform)
var gameResolver = gameDelivery.NewResolverGame(usecaseGame)

var tournamentRepository = tournamentRepo.NewTournamentRepository(database)
var tournamentUsecase = tournamentHandler.NewUsecaseTournament(tournamentRepository)
var tournamentResolver = tournamentDelivery.NewResolverTournament(tournamentUsecase, usecaseGame, usecasePlateform)

var NotifResolver = notifDelivery.NewNotifResolver(usecaseNotif, usecase)

var cmtyRepository = cmtyRepo.NewCmtyRepository(database)
var cmtyUsecase = cmtyHandler.NewUsecaseCmty(cmtyRepository)
var cmtyResolver = cmtyDelivery.NewResolverCmty(cmtyUsecase, usecaseGame)

var homeRepository = homeRepo.NewHomeRepository(database)
var homeUsecase = homeHandler.NewUsecaseHome(homeRepository)
var homeResolver = homeDelivery.NewResolverHome(homeUsecase, usecaseGame)

var teamRepository = teamRepo.NewTeamRepository(database)
var teamUsecase = teamHandler.NewUsecaseTeam(teamRepository, usecase)
var teamResolver = teamDelivery.NewResolverTeam(teamUsecase, usecase)

var asistRepository = asistRepo.NewAsistRepository(database)
var asistUsecase = asistHandler.NewUsecaseAsist(asistRepository)
var asistResolver = asistDelivery.NewResolverAsist(asistUsecase)

var leagueRepository = leagueRepo.NewLeagueRepository(database)
var leagueUsecase = leagueHandler.NewUsecaseLeague(leagueRepository)
var leagueResolver = leagueDelivery.NewResolverLeague(leagueUsecase, usecaseGame, usecasePlateform)

var waggerRepository = waggerRepo.NewWaggerRepository(database)
var waggerUsecase = waggerHandler.NewUsecaseWagger(waggerRepository)
var waggerResolver = waggerDelivery.NewResolverWagger(waggerUsecase, usecaseGame, usecasePlateform)

var partRepository = partRepo.NewPartRepository(database)
var partUsecase = partHandler.NewUsecasePart(partRepository, teamUsecase, usecase)
var partResolver = partDelivery.NewResolverPart(partUsecase, usecase, tournamentUsecase, teamUsecase, waggerUsecase, rateUsecase)

var postRepository = postRepo.NewPostRepository(database)
var postUsecase = postHandler.NewUsecasePost(postRepository, usecase, rateUsecase)
var postResolver = postDelivery.NewResolverPost(postUsecase, usecase)

var groupRepository = groupRepo.NewGroupRepository(database)
var groupUsecase = groupHandler.NewUsecaseGroup(groupRepository)
var groupResolver = groupDelivery.NewResolverGroup(groupUsecase, usecase)

var rateRepository = rateRepo.NewRateRepository(database)
var rateUsecase = rateHandler.NewUsecaseRate(rateRepository, usecase)
var rateResolver = rateDelivery.NewResolverRate(rateUsecase, usecase)

var supportRepository = supportRepo.NewSupportRepository(database)
var supportUsecase = supportHandler.NewUsecaseSupport(supportRepository, usecase)
var supportResolver = supportDelivery.NewResolverSupport(supportUsecase, usecase)

func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"createdUser":           createdUser(),
		"login":                 login(),
		"createdGame":           createdGame(),
		"createdPlateform":      createdPlateform(),
		"updatedUser":           updatedUser(),
		"forgotPassword":        forgotPassword(),
		"updatedPasswordUser":   updatedPasswordUser(),
		"updatedAvatar":         updatedAvatar(),
		"requestFriend":         requestFriend(),
		"saveNotification":      saveNotification(),
		"updateNotification":    updateNotification(),
		"AcceptedRequestFriend": AcceptedRequestFriend(),
		"Deconnected":           Deconnected(),
		"saveTournament":        saveTournament(),
		"createPublication":     createPublication(),
		"createPartMatch":       createPartMatch(),
		"createAssistContent":   createAssistContent(),
		// "updateHomeContent":	updateHomeContent(),
		"createTeam":            createTeam(),
		"updatedTeamByBanned":   updatedTeamByBanned(),
		"createdHome":           createdHome(),
		"removedHome":           removedHome(),
		"saveLeague":            saveLeague(),
		"removePartTournament":  removePartTournament(),
		"createWagger":          createWagger(),
		"updatedWagger":         updatedWagger(),
		"createPost":            createPost(),
		"removedPost":           removedPost(),
		"saveGroup":             saveGroup(),
		"EditStatutPublication": EditStatutPublication(),
		"RemovePublication":     RemovePublication(),
		"updatedGameUser":       updatedGameUser(),
		"updatedAllTeam":        updatedAllTeam(),
		"DeleteTeam":            DeleteTeam(),
		"leavePartTournament":   leavePartTournament(),
		"createRated":           createRated(),
		"CreatedOrUpdatedRate":  CreatedOrUpdatedRate(),
		"createSupport":         createSupport(),
	}
}
