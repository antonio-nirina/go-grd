package schema

import "github.com/graphql-go/graphql"

var PlateformGraphql = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Plateform",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.String,
			},
			"name": &graphql.Field{
				Type: graphql.String,
			},
			"description": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

var AccountGameGraphQL = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "AccountGame",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.String,
			},
			"name": &graphql.Field{
				Type: graphql.String,
			},
			"logo": &graphql.Field{
				Type: graphql.String,
			},
			"game": &graphql.Field{
				Type: GameGraphql,
			},
			"plateform": &graphql.Field{
				Type: PlateformGraphql,
			},
			"uid": &graphql.Field{
				Type: graphql.Int,
			},
		},
	},
)

var GameGraphql = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Game",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.String,
			},
			"logo": &graphql.Field{
				Type: graphql.String,
			},
			"plateforms": &graphql.Field{
				Type: PlateformGraphql,
			},
			"image1": &graphql.Field{
				Type: graphql.String,
			},
			"image2": &graphql.Field{
				Type: graphql.String,
			},
			"releaseDate": &graphql.Field{
				Type: graphql.DateTime,
			},
			"popularity": &graphql.Field{
				Type: graphql.Int,
			},
			"notes": &graphql.Field{
				Type: graphql.Int,
			},
			"slug": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)
