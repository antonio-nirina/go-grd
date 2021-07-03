package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/user/entity"
)


func (c *driverRepository) AddFriend(req *entity.Friends) (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("friends")
	insertResult, err := collection.InsertOne(context.TODO(), req)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return req, nil
}