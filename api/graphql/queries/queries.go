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

	rateDelivery "github.com/thoussei/antonio/api/rate/delivery"
	rateHandler "github.com/thoussei/antonio/api/rate/handler"
	rateRepo "github.com/thoussei/antonio/api/rate/repository"

	supportDelivery "github.com/thoussei/antonio/api/support/delivery"
	supportHandler "github.com/thoussei/antonio/api/support/handler"
	supportRepo "github.com/thoussei/antonio/api/support/repository"

	historyDelivery "github.com/thoussei/antonio/api/history/delivery"
	historyHandler "github.com/thoussei/antonio/api/history/handler"
	historyRepo "github.com/thoussei/antonio/api/history/repository"

	"github.com/graphql-go/graphql"
)

var Database = config.ConfigMongo()
var rep = repository.NewUserRepository(Database)
var repositoryNotif = notifRepo.NewRepository(Database)

var repositoryPlateform = gameRepo.NewPlateformRepository(Database)
var usecasePlateform = gameHandler.NewUsecasePlateform(repositoryPlateform)
var plateformResolver = gameDelivery.NewResolverPlateform(usecasePlateform)

var repositoryGame = gameRepo.NewGameRepository(Database)
var usecaseGame = gameHandler.NewUsecaseGame(repositoryGame)
var gameResolver = gameDelivery.NewResolverGame(usecaseGame)

// Usecase
var usecaseNotif = notifHandler.NewUsecaseNotif(repositoryNotif, usecase)
var usecase = handler.NewUsecaseUser(rep)
var UserRolve = delivery.NewResolver(usecase, usecaseNotif, usecaseGame, usecasePlateform)

var tournamentRepository = tournamentRepo.NewTournamentRepository(Database)
var tournamentUsecase = tournamentHandler.NewUsecaseTournament(tournamentRepository)
var tournamentResolver = tournamentDelivery.NewResolverTournament(tournamentUsecase, usecaseGame, usecasePlateform)
var notifResolver = notifDelivery.NewNotifResolver(usecaseNotif, usecase)

var cmtyRepository = cmtyRepo.NewCmtyRepository(Database)
var cmtyUsecase = cmtyHandler.NewUsecaseCmty(cmtyRepository)
var cmtyResolver = cmtyDelivery.NewResolverCmty(cmtyUsecase, usecaseGame)

var homeRepository = homeRepo.NewHomeRepository(Database)
var homeUsecase = homeHandler.NewUsecaseHome(homeRepository)
var homeResolver = homeDelivery.NewResolverHome(homeUsecase, usecaseGame)

var teamRepository = teamRepo.NewTeamRepository(Database)
var teamUsecase = teamHandler.NewUsecaseTeam(teamRepository, usecase)
var teamResolver = teamDelivery.NewResolverTeam(teamUsecase, usecase)

var asistRepository = asistRepo.NewAsistRepository(Database)
var asistUsecase = asistHandler.NewUsecaseAsist(asistRepository)
var asistResolver = asistDelivery.NewResolverAsist(asistUsecase)

var leagueRepository = leagueRepo.NewLeagueRepository(Database)
var leagueUsecase = leagueHandler.NewUsecaseLeague(leagueRepository)
var leagueResolver = leagueDelivery.NewResolverLeague(leagueUsecase, usecaseGame, usecasePlateform)

var waggerRepository = waggerRepo.NewWaggerRepository(Database)
var waggerUsecase = waggerHandler.NewUsecaseWagger(waggerRepository)
var waggerResolver = waggerDelivery.NewResolverWagger(waggerUsecase, usecaseGame, usecasePlateform)

var partRepository = partRepo.NewPartRepository(Database)
var partUsecase = partHandler.NewUsecasePart(partRepository, teamUsecase, usecase)
var partResolver = partDelivery.NewResolverPart(partUsecase, usecase, tournamentUsecase, teamUsecase, waggerUsecase, rateUsecase)

var postRepository = postRepo.NewPostRepository(Database)
var postUsecase = postHandler.NewUsecasePost(postRepository, usecase, rateUsecase)
var postResolver = postDelivery.NewResolverPost(postUsecase, usecase)

var rateRepository = rateRepo.NewRateRepository(Database)
var rateUsecase = rateHandler.NewUsecaseRate(rateRepository, usecase)
var rateResolver = rateDelivery.NewResolverRate(rateUsecase, usecase)

var supportRepository = supportRepo.NewSupportRepository(Database)
var supportUsecase = supportHandler.NewUsecaseSupport(supportRepository, usecase)
var supportResolver = supportDelivery.NewResolverSupport(supportUsecase, usecase)

var historyRepository = historyRepo.NewHistoryRepository(Database)
var historyUsecase = historyHandler.NewUsecaseHistory(historyRepository, usecase)
var historyResolver = historyDelivery.NewResolverHistory(historyUsecase, usecase)

// GetRootFields returns all the available queries.
func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"FindOneUser":               GetOneUserQuery(),
		"FindOneGame":               GetOneGameQuery(),
		"FindOnePlateform":          GetOnePlateformQuery(),
		"FindAllGame":               GetAllGameQuery(),
		"FindAllPlateform":          GetAllPlateformQuery(),
		"GetAccessTokenXbox":        GetAccessTokenXbox(),
		"GetProfilUserXbox":         GetProfilUserXbox(),
		"GetAllFriends":             GetAllFriends(),
		"GetUsers":                  GetUsers(),
		"GetOneNotification":        GetOneNotification(),
		"GetAllNotifications":       GetAllNotifications(),
		"GetAccessTokenTwitch":      GetAccessTokenTwitch(),
		"FindOneTournament":         FindOneTournament(),
		"FindAllTournament":         FindAllTournament(),
		"FindTournamentByGame":      FindTournamentByGame(),
		"FindAllCmty":               FindAllCmty(),
		"FindOneCmty":               FindOneCmty(),
		"FindOnePart":               FindOnePart(),
		"FindAllPart":               FindAllPart(),
		"FindPartByUser":            FindPartByUser(),
		"FindOneHome":               FindOneHome(),
		"FindAllHome":               FindAllHome(),
		"FindOneTeam":               FindOneTeam(),
		"FindAllTeam":               FindAllTeam(),
		"FindTeamByUser":            FindTeamByUser(),
		"FindOneAsist":              FindOneAsist(),
		"FindAllAsist":              FindAllAsist(),
		"FindOneLeague":             FindOneLeague(),
		"FindAllLeague":             FindAllLeague(),
		"FindLeagueByGame":          FindLeagueByGame(),
		"FindPartByUserTournament":  FindPartByUserTournament(),
		"FindPartByUserWagger":      FindPartByUserWagger(),
		"FindPartCount":             FindPartCount(),
		"FindOneWagger":             FindOneWagger(),
		"FindAllWagger":             FindAllWagger(),
		"FindOnePost":               FindOnePost(),
		"FindAllPost":               FindAllPost(),
		"FindAllGAmeTwitch":         FindAllGAmeTwitch(),
		"FindAllStreaming":          FindAllStreaming(),
		"GetAccessUserTwitchApi":    GetAccessUserTwitchApi(),
		"GetAccessTokenTwitchAdmin": GetAccessTokenTwitchAdmin(),
		"GetGameOneUserQuery":       GetGameOneUserQuery(),
		"FindAllPartUserWagger":     FindAllPartUserWagger(),
		"GetAccessTokenDiscord":     GetAccessTokenDiscord(),
		"GetAccessUserDiscordApi":   GetAccessUserDiscordApi(),
		"FindTournamentParticipate": FindTournamentParticipate(),
		"FindOneRate":               FindOneRate(),
		"FindAllRate":               FindAllRate(),
		"FindRateByUser":            FindRateByUser(),
		"FindGameTwicth":            FindGameTwicth(),
		"FindWaggerByGame":          FindWaggerByGame(),
		"FindRateInWeek":            FindRateInWeek(),
		"GetUserByUsername":         GetUserByUsername(),
		"FindAllPartTeamTournament": FindAllPartTeamTournament(),
		"FindOneSupport":            FindOneSupport(),
		"FindPartAllTournament":     FindPartAllTournament(),
		"FindOneHistory":            FindOneHistory(),
		"SetTimeMatch":              SetTimeMatch(),
	}
}
