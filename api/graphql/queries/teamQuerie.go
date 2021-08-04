package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOneTeam() *graphql.Field {
	return &graphql.Field{
		Type:        types.TeamSchemaType,
		Description: "Get single Team",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: teamResolver.FindTeamResolver,
	}
}

func FindAllTeam() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.TeamSchemaType),
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Description: "Get all page team",
		Resolve: teamResolver.FindAllTeamResolver,
	}
}