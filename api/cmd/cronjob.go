package cmd

import (
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
	"github.com/thoussei/antonio/api/graphql/queries"
	"github.com/thoussei/antonio/api/tournament/repository"
)

func RunCheckTournament() {
	var tournamentRepository = repository.NewTournamentRepository(queries.Database)
	tournamentNow,err := tournamentRepository.FindTournamentNowRepo()

	if err != nil {
		fmt.Println(err)
	}
	s := gocron.NewScheduler(time.UTC)
	fmt.Println("tournamentNow", tournamentNow)
	
	if len(tournamentNow) == 0 {
		j, _ := s.Every(10).Seconds().Do(func() { time.Sleep(2 * time.Second) })
		fmt.Println(j.IsRunning())
		s.StartAsync()
		time.Sleep(time.Second)
		fmt.Println(j.IsRunning())

		time.Sleep(time.Second)
		s.Stop()
	}
	fmt.Println("Run is Task")
}