package types

import (
	"github.com/graphql-go/graphql"
)

var userTYpeNotfi = graphql.NewObject(graphql.ObjectConfig{
	Name: "userTypeNotif",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
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
	},
})

var NotificationSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "NotificationType",
	Fields: graphql.Fields{
		"title": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"content": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"statut": &graphql.Field{
			Type: graphql.NewNonNull(graphql.Boolean),
		},
		"user": &graphql.Field{
			Type: graphql.NewNonNull(userTYpeNotfi),
		},
		"Id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})