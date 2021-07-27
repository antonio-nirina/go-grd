package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOnePart() *graphql.Field  {
	return &graphql.Field{
		Type:        types.PartSchemaType,
		Description: "Get single participant",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: partResolver.FindPartResolver,
	}
}

func FindAllPart() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PartSchemaType),
		Description: "Get all participant",
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		
		Resolve: partResolver.FindAllPartResolver,
	}
}

func FindPartByUser() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PartSchemaType),
		Description: "Get all part by user",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		
		Resolve: partResolver.FindPartByUseResolver,
	}
}