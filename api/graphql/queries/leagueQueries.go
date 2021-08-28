package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func FindOneLeague() *graphql.Field {
	return &graphql.Field{
		Type:        types.LeagueSchemaType,
		Description: "Get single league",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: leagueResolver.FindLeagueResolver,
	}
}

func FindAllLeague() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.LeagueSchemaType),
		Description: "Get all league",
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		
		Resolve: leagueResolver.FindAllLeagueResolver,
	}
}

func FindLeagueByGame() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.LeagueSchemaType),
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
		
		Resolve: leagueResolver.FindLeagueGameResolver,
	}
}