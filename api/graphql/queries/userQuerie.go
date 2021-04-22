package queries

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/antonio-nirina/go-grd/api/config"
	"github.com/antonio-nirina/go-grd/api/graphql/types"
	"github.com/graphql-go/graphql"
)


func GetOneUserQuery() *graphql.Field {
	return &graphql.Field{
		Type:        types.UserSchemaType,
		Description: "Get single user",
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: UserRolve.FindOneUserResolver,
	}
}