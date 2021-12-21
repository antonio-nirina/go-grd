package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func FindOneSupport() *graphql.Field {
	return &graphql.Field{
		Type:        types.SupportSchemaType,
		Description: "Get single support",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: rateResolver.FindRateResolver,
	}
}
