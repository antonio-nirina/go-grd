package mutation

import (
	"github.com/graphql-go/graphql"
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
		},
		Resolve:     NotifResolver.SavedNotifResolver,
	}
}