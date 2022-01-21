package cmd

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/graphql/queries"
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

func RunCheckTournament() {
	var tournamentRepository = repository.NewTournamentRepository(queries.Database)
	tournamentNow, err := tournamentRepository.FindTournamentNowRepo()

	if err != nil {
		fmt.Println(err)
	}
	s := gocron.NewScheduler(time.UTC)

	if len(tournamentNow) > 0 {
		fmt.Println("count", len(tournamentNow))
		task, _ := s.Every(1).Day().At("19:17").Do(func() { //s.Every(2).Second().Do(func() { // s.Every(1).Day().At("01:10").Do(func() {
			fmt.Println("Started:cron",time.Now().Format(time.RFC822Z))
			for _, tournament := range tournamentNow {
				job := &jobTournament{Uid: tournament.Uid.Hex(), Data: jobData{Title: tournament.Title, DateStart: tournament.DateStart, DeadlineDate: tournament.DeadlineDate}}
				json, err := json.Marshal(job)

				if err != nil {
					external.Logger(err.Error())
				}
				external.RPublishTournamentOfDay("job_tournament", json)
			}
			s.Stop()
			fmt.Println("Finished:cron",time.Now().Format(time.RFC822Z))
		})
		fmt.Println(task.ScheduledTime())
		s.StartAsync()
	}
}
