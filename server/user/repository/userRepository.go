package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/front-office/server/user/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetById(ctx context.Context, id string) {
	var usercollection = entity.UserCollection
	var result primitive.M
	err := usercollection.FindOne(context.TODO(), bson.D{{"name", body.Name}}).Decode(&result)
	if err != nil {

		fmt.Println(err)

	}
}
