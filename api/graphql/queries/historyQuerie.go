package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func FindOneHistory() *graphql.Field {
	return &graphql.Field{
		Type:        types.HistoryChatSchemaType,
		Description: "Get one history",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: historyResolver.FindHistoryChatResolver,
	}
}
