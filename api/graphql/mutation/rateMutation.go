package mutation

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func createRated() *graphql.Field {
	return &graphql.Field{
		Type:        types.TeamSchemaType,
		Description: "Rate content create",
		Args: graphql.FieldConfigArgument{
			"created": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"updated": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"user": &graphql.ArgumentConfig{
				Type: graphql.String,
			},	
			"score":&graphql.ArgumentConfig{
				Type: graphql.Int,
			},		
		},			
		Resolve: rateResolver.CreatedRateResolver,
	}
}

func CreatedOrUpdatedRate() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.String,
		Description: "updated Rate",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"uidUser":  &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: rateResolver.CreatedOrUpdatedRateResolver,
	}	
}