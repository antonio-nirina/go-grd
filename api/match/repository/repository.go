package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/match/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DriverRepository struct {
	client *mongo.Client
}

func NewRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}

type RepositoryMatch interface {
	SavedNotifRepo(match *entity.Match) (interface{}, error)
	FindMatchRepo(idQuery primitive.ObjectID) (entity.Match, error)
	CountMatchRepository() (int, error)
}

func (c *DriverRepository) SavedMatchRepo(match *entity.Match) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("matchs")
	insertResult, err := collection.InsertOne(context.TODO(), match)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return match, nil
}

func (c *DriverRepository) FindMatchRepo(idQuery primitive.ObjectID) (entity.Match, error) {
	var collection = c.client.Database("grd_database").Collection("matchs")
	var result entity.Match

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) CountMatchRepository() (int, error) {
	var collection = c.client.Database("grd_database").Collection("matchs")

	records, err := collection.CountDocuments(context.TODO(), bson.D{{}})

	if err != nil {
		return 0, err
	}

	return int(records), nil
}