package cmd

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/graphql/queries"
	tournamentHandler "github.com/thoussei/antonio/api/tournament/handler"
	"github.com/thoussei/antonio/api/tournament/repository"
)

type jobTournament struct {
	Uid  string  `json:"uid"`
	Data jobData `json:"data"`
}

type jobData struct {
	Id           string `json:"id"`
	Title        string `json:"title"`
	DateStart    string `json:"dateStart"`
	DeadlineDate string `json:"deadlineDate"`
}

type userAdv struct {
	Uid string `json:"uid"`
	Username string `json:"username"`
	Avatar string `json:"avatar"`
	Point string `json:"point"`
}

type teamAdv struct {
	Uid 	string `json:"uid"`
	Name 	string `json:"name"`
	Players []string `json:"players"`
	Logo   	string    `json:"logo"`
	Point 	string `json:"point"`
}

func RunCheckTournament() {
	var tournamentRepository = repository.NewTournamentRepository(queries.Database)
	var tournamentHandler = tournamentHandler.NewUsecaseTournament(tournamentRepository)
	tournamentNow, err := tournamentRepository.FindTournamentNowRepo()
	// var matchRepository = matchRepository.NewRepository(queries.Database)
	
	if err != nil {
		fmt.Println(err)
	}
	s := gocron.NewScheduler(time.UTC)

	if len(tournamentNow) > 0 {
		task, _ := s.Every(1).Day().At("19:00").Do(func() { //s.Every(2).Second().Do(func() { // s.Every(1).Day().At("01:10").Do(func() {
			fmt.Println("Started:cron", time.Now().Format(time.RFC822Z))
			for _, tournament := range tournamentNow {
				job := &jobTournament{Uid: tournament.Uid.Hex(), Data: jobData{Title: tournament.Title, DateStart: tournament.DateStart, DeadlineDate: tournament.DeadlineDate}}
				json, err := json.Marshal(job)

				if err != nil {
					external.Logger(err.Error())
				}
				external.RPublishTournamentOfDay("job_tournament", json)
				tournamentViewModel := tournamentHandler.HandleTournamentToViewmodel(tournament)
				partTournament,err := queries.PartUsecase.FindPartTournamentHandler(tournamentViewModel)
				var teamStrong []teamAdv
				var teamMean []teamAdv
				var teamWeak []teamAdv
				var userStrong []userAdv
				var userMean []userAdv
				var userWeak []userAdv

				if tournament.IsTeam {
					for _,part := range partTournament {
						
					}
				}
				
				// Gen adv
			}
			s.Stop()
			fmt.Println("Finished:cron", time.Now().Format(time.RFC822Z))
		})
		fmt.Println(task.ScheduledTime())
		s.StartAsync()
	}
}
