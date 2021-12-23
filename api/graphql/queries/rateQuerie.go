package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func FindOneRate() *graphql.Field {
	return &graphql.Field{
		Type:        types.RateSchemaType,
		Description: "Get single rate",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: rateResolver.FindRateResolver,
	}
}

func FindAllRate() *graphql.Field {
	return &graphql.Field{
		Type: graphql.NewList(types.RateUserSchemaType),
		Description: "Get all page rate",
		Resolve:     rateResolver.FindAllRateResolver,
	}
}

func FindRateByUser() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.RateSchemaType),
		Description: "Get single rate by user",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: rateResolver.FindRateByUserResolver,
	}
}

func FindRateInWeek() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.RateSchemaType),
		Description: "Get single rate by user",
		Resolve: rateResolver.FindRateInWeekResolver,
	}
}
