package types

import (
	"github.com/graphql-go/graphql"
)

var NotificationSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "NotificationType",
	Fields: graphql.Fields{
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
		"statut": &graphql.Field{
			Type: graphql.Boolean,
		},
		"user": &graphql.Field{
			Type: UserSchemaType,
		},
		"type": &graphql.Field{
			Type: graphql.Int,
		},
		"_id": &graphql.Field{
			Type: graphql.String,
		},
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"userRequest": &graphql.Field{
			Type: UserSchemaType,
		},
	},
})