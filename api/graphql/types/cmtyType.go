package types

import (
	"github.com/graphql-go/graphql"
)

var CmtySchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CommunutyType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"streaming": &graphql.Field{
			Type: graphql.String,
		},
	},
})