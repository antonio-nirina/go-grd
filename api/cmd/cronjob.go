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
	Uid        string   `json:"uid"`
	Title       string   `json:"title"`
	DateStart   string   `json:"dateStart"`
	DeadlineDate string `json:"deadlineDate"`
}

func RunCheckTournament() {
	var tournamentRepository = repository.NewTournamentRepository(queries.Database)
	tournamentNow,err := tournamentRepository.FindTournamentNowRepo()

	if err != nil {
		fmt.Println(err)
	}
	s := gocron.NewScheduler(time.UTC)
	fmt.Println("tournamentNow", tournamentNow)
	
	if len(tournamentNow) > 0 {
		for _,tournament := range tournamentNow {
			job := &jobTournament{Uid: tournament.Uid.Hex(),Title: tournament.Title,DateStart: tournament.DateStart,DeadlineDate:tournament.DeadlineDate}
			json,err := json.Marshal(job)
			
			if err != nil {
				external.Logger(err.Error())
			}
			
			task, _ := s.Every(1).Day().At("01:10").Do(func ()  {
				external.RPushRedis("default"+tournament.Uid.Hex(),json)
			})
			fmt.Println(task.ScheduledTime())
			fmt.Println("Tournament ",tournament.Title)
		}
		
		s.StartAsync()
		s.Stop()
	}

	fmt.Println("Tournament isFinished run")
}
