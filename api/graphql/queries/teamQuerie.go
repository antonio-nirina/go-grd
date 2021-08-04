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
		Description: "Get all page team",
		Resolve: teamResolver.FindAllTeamResolver,
	}
}