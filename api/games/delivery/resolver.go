package delivery

import (
	"github.com/graphql-go/graphql"
)

type ResolverGame interface {
	SavedGameResolver(params graphql.ResolveParams) (interface{}, error)
	FindOneGameResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllGameResolver(params graphql.ResolveParams) (interface{}, error)
}

type ResolvePlateform interface {
	SavedGamePlateformResolver(params graphql.ResolveParams) (interface{}, error)
	FindOneGamePlateformResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllGamePlateformResolver(params graphql.ResolveParams) (interface{}, error)
}

