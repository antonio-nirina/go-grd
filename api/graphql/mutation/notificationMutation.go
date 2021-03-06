package mutation

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func saveNotification() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "Saved notification",
		Args: graphql.FieldConfigArgument{
			"idUser": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"title": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"content": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"type":&graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"idUserReq": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     NotifResolver.SavedNotifResolver,
	}
}

func updateNotification() *graphql.Field {
	return &graphql.Field{
		Type:        types.NotificationSchemaType,
		Description: "updated notification",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve:     NotifResolver.UpdatedStatutNotifResolver,
	}	
}