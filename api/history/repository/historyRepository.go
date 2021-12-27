package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/history/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type driverRepository struct {
	client *mongo.Client
}

func NewHistoryRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

type RepositoryHistory interface {
	SavedRepoHistory(history *entity.HistoryChat) (interface{}, error)
	FindHistoryRepo(idQuery primitive.ObjectID) (entity.HistoryChat, error)
	UpdatedRepoHistory(history *entity.HistoryChat) (interface{}, error)
}

func (c *driverRepository) SavedRepoHistory(history *entity.HistoryChat) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("history")
	insertResult, err := collection.InsertOne(context.TODO(), history)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return history, nil
}

func (c *driverRepository) FindHistoryRepo(idQuery primitive.ObjectID) (entity.HistoryChat, error) {
	var collection = c.client.Database("grd_database").Collection("history")
	var result entity.HistoryChat

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) UpdatedRepoHistory(history *entity.HistoryChat) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("history")
	filter := bson.D{{"uid", history.Uid}}
	update := bson.D{
		{"$set", bson.D{
			{
				"userfrom", history.UserFrom,
			},
			{
				"userto", history.UserTo,
			},
			{
				"contentfrom", history.ContentFrom,
			},
			{
				"contentTo", history.ContentFrom,
			},
		}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return updateResult.ModifiedCount, nil
}
