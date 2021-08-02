package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOneHome() *graphql.Field {
	return &graphql.Field{
		Type:        types.HomeSchemaType,
		Description: "Get single homepage",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: homeResolver.FindHomeResolver,
	}
}

func FindAllHome() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.HomeSchemaType),
		Description: "Get all page homepage",
		Resolve: homeResolver.FindAllHomeResolver,
	}
}