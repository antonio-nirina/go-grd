package mutation

import (
	"github.com/graphql-go/graphql"
)

var groupUser = graphql.NewInputObject(
	graphql.InputObjectConfig{
		Name: "uidGroupUser",
		Fields: graphql.InputObjectConfigFieldMap{
			"uidUser": &graphql.InputObjectFieldConfig{
				Type: graphql.NewList(graphql.String),
			},
		},
	},
)

func saveGroup() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Saved group",
		Args: graphql.FieldConfigArgument{
			"idUsers": &graphql.ArgumentConfig{
				Type: groupUser,
			},
			"lead": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"subject": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     groupResolver.SavedGroupResolver,
	}
}