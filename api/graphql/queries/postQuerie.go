package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOnePost() *graphql.Field {
	return &graphql.Field{
		Type:        types.PostSchemaType,
		Description: "Get single post",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: postResolver.FindPostResolver,
	}
}

func FindAllPost() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PostSchemaType),
		Description: "Get all publication post",
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		
		Resolve: postResolver.FindAllPostResolver,
	}
}