package types

import (
	"github.com/graphql-go/graphql"
)

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
			Type: graphql.NewNonNull(UserSchemaType),
		},
		"type": &graphql.Field{
			Type: graphql.NewNonNull(graphql.Int),
		},
		"_id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})