package graphql

import (
	"github.com/graphql-go/graphql"

	"github.com/thoussei/antonio/front-office/server/graphql/mutation"
	"github.com/thoussei/antonio/front-office/server/graphql/query"
	"github.com/thoussei/antonio/front-office/server/graphql/resolver"
)

// Struct for implementation Interface graphql

type Schema struct {
	userResolver resolver.Resolver
}

func Query() *graphql.Object {
	objectConfigQuery := query.QueryUserById()
	return graphql.NewObject(objectConfigQuery)
}

func Mutation() *graphql.Object {
	objectConfigMutation := mutation.CreatedUser()
	return graphql.NewObject(objectConfigMutation)
}
