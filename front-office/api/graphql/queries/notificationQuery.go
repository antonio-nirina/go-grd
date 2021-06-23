package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/front-office/api/graphql/types"
)

func GetOneNotification() *graphql.Field {
	return &graphql.Field{
		Type:        types.NotificationSchemaType,
		Description: "Get notification by one user",
		Args: graphql.FieldConfigArgument{
			"idUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"idNotification": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: notifResolver.FindNotifResolver,
	}
}

func GetAllNotifications() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.NotificationSchemaType),
		Description: "Get all notification one user",
		Args: graphql.FieldConfigArgument{
			"idUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: notifResolver.FindAllNotifResolver,
	}
}