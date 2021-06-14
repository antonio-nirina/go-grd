package types

import (
	"github.com/graphql-go/graphql"
)

var CountType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Count",
	Fields: graphql.Fields{
		"key": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

var FriendType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Friends",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"lastname": &graphql.Field{
			Type: graphql.String,
		},
		"firstname": &graphql.Field{
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
		"count": &graphql.Field{
			Type: graphql.Int,
		},
	},
})