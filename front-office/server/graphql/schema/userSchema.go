package schema

import (
	"github.com/graphql-go/graphql"
)

var UserGraphQL = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "User",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.String,
			},
			"uid": &graphql.Field{
				Type: graphql.String,
			},
			"firstName": &graphql.Field{
				Type: graphql.String,
			},
			"lastName": &graphql.Field{
				Type: graphql.String,
			},
			"password": &graphql.Field{
				Type: graphql.String,
			},
			"username": &graphql.Field{
				Type: graphql.String,
			},
			"is_banned": &graphql.Field{
				Type: graphql.Boolean,
			},
			"avatar": &graphql.Field{
				Type: graphql.String,
			},
			"language": &graphql.Field{
				Type: graphql.String,
			},
			"gameAccount": &graphql.Field{
				Type: AccountGameGraphQL,
			},
			"point": &graphql.Field{
				Type: graphql.Int,
			},
		},
	},
)
