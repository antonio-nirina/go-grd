package types

import (
	"github.com/graphql-go/graphql"
)

var UserSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "UserType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{Type: graphql.String},
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"lastname": &graphql.Field{
			Type: graphql.String,
		},
		"firstname": &graphql.Field{
			Type: graphql.String,
		},
		"password": &graphql.Field{
			Type: graphql.String,
		},
		"username": &graphql.Field{
			Type: graphql.String,
		},
		"email": &graphql.Field{
			Type: graphql.String,
		},
		"isBanned": &graphql.Field{
			Type: graphql.Boolean,
		},
		"avatar": &graphql.Field{
			Type: graphql.String,
		},
		"language": &graphql.Field{
			Type: graphql.String,
		},
		"point": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
