package queries

import (
	"github.com/antonio-nirina/go-grd/api/config"
	"github.com/graphql-go/graphql"
)

var UserCollection = config.ConfigMongo().Database("grd_database").Collection("users")

// GetRootFields returns all the available queries.
func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"FindOneUser": GetOneUserQuery(),
	}
}




