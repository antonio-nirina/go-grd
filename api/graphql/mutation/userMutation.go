package mutation

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/main/front-office/api/graphql/types"
)

var inputType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "userInputType",
		Fields: graphql.InputObjectConfigFieldMap{
			"password": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"username": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"email": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
		},
	},
)

var args = graphql.FieldConfigArgument{
	"userInput": &graphql.ArgumentConfig{
		Type: inputType,
	},
}

func createdUser() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Created user",
		Args:        args,
		Resolve:     UserRolve.SavedUserResolver,
	}
}

func login() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Auth user",
		Args: graphql.FieldConfigArgument{
			"email": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"password": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: UserRolve.AuthUserResolver,
	}
}
