package type

import (
	"github.com/graphql-go/graphql"
)

var GameAccountType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GameAccountSchema",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"IdAccount": &graphql.Field{
			Type: graphql.String,
		},
		"Account": &graphql.Field{
			Type: AccountGameSchemaType,
		},
	},
})

var GameSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name:"GameSchema",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
	}
})

var GamePlatformSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name:"GamePlatformSchema",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
	}
})

var AccountGameSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name:"GamePlatformSchema",
	Fields: graphql.Fields{
		"uid": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"logo": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"game": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"plateform": &graphql.ArgumentConfig{
			Type: GamePlatformSchemaType,
		},
	}
})