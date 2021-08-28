package mutation

import (
	"github.com/graphql-go/graphql"
)

func saveLeague() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Saved league",
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
			"numberParticipate":&graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"numberTeam": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"price": &graphql.ArgumentConfig{
				Type: graphql.Float,
			},
			"deadlineDate": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"priceParticipate": &graphql.ArgumentConfig{
				Type: graphql.Float,
			},
			"rules": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"organizer": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"numberGroup":&graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Resolve:     leagueResolver.SavedLeagueResolver,
	}
}