package types

import (
	"github.com/graphql-go/graphql"
)

var GroupSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GroupType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"Subject": &graphql.Field{
			Type: graphql.String,
		},
		"users": &graphql.Field{
			Type: graphql.NewList(UserSchemaType),
		},
		"lead": &graphql.Field{
			Type: UserSchemaType,
		},
	},
})