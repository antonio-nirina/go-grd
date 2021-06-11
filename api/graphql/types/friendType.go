package types

import (
	"github.com/graphql-go/graphql"
)

var CountType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Count",
	Fields: graphql.Fields{
		"key": &graphql.Field{
			Type: graphql.Int,
		},
	},
})