package graphql

import "github.com/graphql-go/graphql"

type Resolver interface {
	GetUserByID(params graphql.ResolveParams) (interface{}, error)

	StoreUser(params graphql.ResolveParams) (interface{}, error)
}
