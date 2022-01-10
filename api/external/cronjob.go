package external

import (
	"fmt"

	"github.com/jasonlvhit/gocron"
)

func RunCheckTournament() {
	gocron.Every(1).Second().Do(func(){fmt.Println("Hello")})
	<- gocron.Start()
}