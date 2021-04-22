package queries

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/antonio-nirina/go-grd/api/config"
	"github.com/antonio-nirina/go-grd/api/user/entity"
	"github.com/antonio-nirina/go-grd/api/graphql/types"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
		Resolve: func(params graphql.ResolveParams) (interface{}, error) {
			idQuery, isOK := params.Args["id"].(string)
			if !isOK {
				return nil, errors.New("id not valid")
			}

			user, err := findOneUser(idQuery)

			if err != nil {
				return nil, err
			}

			return user, nil
		},
	}
}