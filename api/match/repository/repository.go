package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/match/entity"
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
