package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOneCmty() *graphql.Field {
	return &graphql.Field{
		Type:        types.CmtySchemaType,
		Description: "Get single community",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: cmtyResolver.FindCmtyResolver,
	}
}

func FindAllCmty() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.CmtySchemaType),
		Description: "Get all publication community",
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		
		Resolve: cmtyResolver.FindAllCmtytResolver,
	}
}