package query

import (
	"github.com/graphql-go/graphql"

	myGraph "github.com/thoussei/antonio/front-office/server/graphql"
	"github.com/thoussei/antonio/front-office/server/graphql/types"
)

func QueryUserById() graphql.ObjectConfig {
	return graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"GetUserByID": &graphql.Field{
				Type:        types.UserSchemaType,
				Description: "Get User By uid",
				Args: graphql.FieldConfigArgument{
					"uid": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: myGraph.SchResolver.GetUserByID,
			},
		},
	}
}
