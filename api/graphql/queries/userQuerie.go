package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/main/front-office/api/graphql/types"
)


func GetOneUserQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Get single user",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: UserRolve.FindOneUserResolver,
	}
}

func GetAccessTokenXbox() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Get token access",
		Args: graphql.FieldConfigArgument{
			"code": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: UserRolve.GetAccessTokenXboxApi,
	}
}