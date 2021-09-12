package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOneWagger() *graphql.Field {
	return &graphql.Field{
		Type:        types.WaggerSchemaType,
		Description: "Get single Team",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: waggerResolver.FindWaggerResolver,
	}
}

func FindAllWagger() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.WaggerSchemaType),
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Description: "Get all page wagger",
		Resolve: waggerResolver.FindAllWaggerResolver,
	}
}