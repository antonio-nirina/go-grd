package mutation

import (
	"github.com/graphql-go/graphql"
)

var teamsInputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "uidTeamsInput",
		Fields: graphql.InputObjectConfigFieldMap{
			"uid": &graphql.InputObjectFieldConfig{
				Type: graphql.NewList(graphql.String),
			},
		},
	},
)

func createPartMatch() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.Int,
		Description: "Publication create",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"date": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"tournamentUid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			/*"leagueUid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},*/
			"teamsUid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"waggerUid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: partResolver.SavedPartResolver,
	}
}

func removePartTournament() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.Int,
		Description: "remove participation",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: partResolver.RemovedPartByResolver,
	}
}

func updateConfirmedPartTournament() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "increment participation confirmed participation",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"partConfirmed": &graphql.ArgumentConfig{
				Type: graphql.Boolean,
			},
		},
		Resolve: partResolver.UpdatedNumberPartConfResolver,
	}
}
