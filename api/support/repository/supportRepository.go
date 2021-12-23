package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/support/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type driverRepository struct {
	client *mongo.Client
}

func NewSupportRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

type RepositorySupport interface {
	SavedRepoSupport(support *entity.Support) (interface{}, error)
	FindSupportRepo(idQuery primitive.ObjectID) (entity.Support, error)
}

func (c *driverRepository) SavedRepoSupport(support *entity.Support) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("support")
	insertResult, err := collection.InsertOne(context.TODO(), support)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return support, nil
}

func (c *driverRepository) FindSupportRepo(idQuery primitive.ObjectID) (entity.Support, error) {
	var collection = c.client.Database("grd_database").Collection("support")
	var result entity.Support

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}
