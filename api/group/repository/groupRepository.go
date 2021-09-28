package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/group/entity"
	"go.mongodb.org/mongo-driver/mongo"
)

type driverRepository struct {
	client *mongo.Client
}


func NewGroupRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}


type RepositoryGroup interface {
	SavedGroup(group *entity.Group) (interface{}, error)
}

func (c *driverRepository) SavedGroup(group *entity.Group) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("group")
	insertResult, err := collection.InsertOne(context.TODO(), group)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return group, nil
}