package handler

import (
	"fmt"
	"sync"
	"time"

	"github.com/thoussei/antonio/api/external"
)

func (t *tournamentUsecase) TimeStartMatchHandler(tournament *TournamentViewModel, wg *sync.WaitGroup) {

	date, _ := time.Parse(time.RFC3339, tournament.DeadlineDate)
	var month int

	if date.Month() == time.January {
		month = int(time.January)
	} else if date.Month() == time.February {
		month = int(time.February)
	} else if date.Month() == time.March {
		month = int(time.March)
	} else if date.Month() == time.April {
		month = int(time.April)
	} else if date.Month() == time.May {
		month = int(time.May)
	} else if date.Month() == time.June {
		month = int(time.June)
	} else if date.Month() == time.July {
		month = int(time.July)
	} else if date.Month() == time.August {
		month = int(time.August)
	} else if date.Month() == time.September {
		month = int(time.September)
	} else if date.Month() == time.October {
		month = int(time.October)
	} else if date.Month() == time.November {
		month = int(time.November)
	} else if date.Month() == time.December {
		month = int(time.December)
	}

	queryStr := `
	{ 
		RunTaskTournament(counter:{uid:"%s",sec:"%d",min:"%d",hours:"%d",day:%d,month:%d}) 
	}
	`
	queryN := fmt.Sprintf(queryStr, tournament.Uid, date.Second(), date.Minute(), date.Hour(), date.Day(), month)
	jsonData := map[string]string{
		"query": queryN,
	}

	external.ClientHttpWs(jsonData)
	wg.Done()
}
