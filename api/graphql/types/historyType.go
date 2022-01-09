package types

import (
	"github.com/graphql-go/graphql"
)

var HistoryChatSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "HistoryChatType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"userTo": &graphql.Field{
			Type: UserSchemaType,
		},
		"userFrom": &graphql.Field{
			Type: UserSchemaType,
		},
		"contentfrom": &graphql.Field{
			Type: DataContentSchemaTYpe,
		},
		"contentTo": &graphql.Field{
			Type: DataContentSchemaTYpe,
		},
	},
})

var DataContentSchemaTYpe = graphql.NewObject(graphql.ObjectConfig{
	Name: "contentdata",
	Fields: graphql.Fields{
		"created": &graphql.Field{
			Type: graphql.String,
		},
		"updated": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
	},
})
