package mutation

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func createPost() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.PostSchemaType),
		Description: "Post create",
		Args: graphql.FieldConfigArgument{
			"uidUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"content": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"imageType":&graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"files":&graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"date":&graphql.ArgumentConfig{
				Type: graphql.String,
			},					
		},			
		Resolve: postResolver.CreatePostResolve,
	}
}