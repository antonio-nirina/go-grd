package mutation

import (
	"github.com/antonio-nirina/go-grd/api/graphql/types"
	"github.com/graphql-go/graphql"
)

func createdUser() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Created user",
		Args: graphql.FieldConfigArgument{
			"firstname": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"lastname": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"password": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"username": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"email": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"avatar": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"language": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: UserRolve.SavedUserResolver,
	}
}