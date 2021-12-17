package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOneAsist() *graphql.Field {
	return &graphql.Field{
		Type:        types.AssistSchemaType,
		Description: "Get single Assist",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: asistResolver.FindAsistResolver,
	}
}

func FindAllAsist() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.AssistSchemaType),
		Description: "Get all page assist",
		Resolve: asistResolver.FindAllAsistResolver,
	}
}
