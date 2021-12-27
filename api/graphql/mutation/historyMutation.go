package mutation

import (
	"github.com/graphql-go/graphql"
)

func createHistory() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "History content create",
		Args: graphql.FieldConfigArgument{
			"created": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"updated": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidFrom": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidTo": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"content": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: historyResolver.CreatedHistoryChatResolver,
	}
}
