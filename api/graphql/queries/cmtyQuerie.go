package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)

func FindOneCmty() *graphql.Field {
	return &graphql.Field{
		Type:        types.CmtySchemaType,
		Description: "Get single community",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: cmtyResolver.FindCmtyResolver,
	}
}

func FindAllCmty() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.CmtySchemaType),
		Description: "Get all publication community",
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},

		Resolve: cmtyResolver.FindAllCmtytResolver,
	}
}

func FindAllGAmeTwitch() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.CmtyGameTwitchSchemaType),
		Description: "Get all game twitch",
		Args: graphql.FieldConfigArgument{
			"accessToken": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		Resolve: cmtyResolver.FindAllGameTwitchResolver,
	}
}

func FindAllStreaming() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.CmtyStreamingTwitchSchemaType),
		Description: "Get all streaming community",
		Args: graphql.FieldConfigArgument{
			"accessToken": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
			"gameId": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},

		Resolve: cmtyResolver.FindAllStreamingTwitchResolver,
	}
}
