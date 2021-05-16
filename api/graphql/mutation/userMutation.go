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

var userUpatedType = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "userUpdatedType",
		Fields: graphql.InputObjectConfigFieldMap{
			"firstname": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"username": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"lastname": &graphql.InputObjectFieldConfig{
				Type: graphql.String,
			},
			"language": &graphql.InputObjectFieldConfig{
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

var argsUpated = graphql.FieldConfigArgument{
	"userUpated": &graphql.ArgumentConfig{
		Type: userUpatedType,
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
// 
func updatedUser() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Updated user",
		Args:        argsUpated,
		Resolve:     UserRolve.UpdatedUserResolver,
	}
}
