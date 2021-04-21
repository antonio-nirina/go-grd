package queries

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/antonio-nirina/go-grd/api/config"
	"github.com/antonio-nirina/go-grd/api/entity"
	"github.com/antonio-nirina/go-grd/api/graphql/types"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var UserCollection = config.ConfigMongo().Database("grd_database").Collection("users")

// GetRootFields returns all the available queries.
func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"FindOneUser": GetOneUserQuery(),
	}
}

func GetUserQuery() {
	fmt.Println("query")
}

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

func findOneUser(idQuery string) (interface{}, error) {
	var result entity.User
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		log.Println("Invalid id")
	}

	err = UserCollection.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func findAll() (interface{}, error) {
	var results []primitive.M
	cur, err := UserCollection.Find(context.TODO(), bson.D{{}})

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem primitive.M
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem)
	}
	cur.Close(context.TODO())
	fmt.Println("resll", results)

	return results, nil
}
