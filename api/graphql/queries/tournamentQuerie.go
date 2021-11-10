package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func FindOneTournament() *graphql.Field {
	return &graphql.Field{
		Type:        types.TournamentSchemaType,
		Description: "Get single tournament",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: tournamentResolver.FindTournamentResolver,
	}
}

func FindAllTournament() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.TournamentSchemaType),
		Description: "Get all tournament",
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},

		Resolve: tournamentResolver.FindAllTournamentResolver,
	}
}

func FindTournamentByGame() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.TournamentSchemaType),
		Description: "Get all tournament by game",
		Args: graphql.FieldConfigArgument{
			"slugGame": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},

		Resolve: tournamentResolver.FindTournamentGameResolver,
	}

}

