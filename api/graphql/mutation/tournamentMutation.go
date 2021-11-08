package mutation

import (
	"github.com/graphql-go/graphql"
)

func saveTournament() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Saved tournament",
		Args: graphql.FieldConfigArgument{
			"date": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidPalteforme": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"description": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"numberParticipate": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"price": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"deadlineDate": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"priceParticipate": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"rules": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"laps": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"server": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"format": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"spectateur": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"gameWay": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"region": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"maps": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: tournamentResolver.SavedTournamentResolver,
	}
}
