package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/wagger/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DriverRepository struct {
	client *mongo.Client
}

// Return Interface User Repository
func NewWaggerRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}

type RepositoryWagger interface {
	SavedWaggerRepo(wagger *entity.Wagger) (interface{}, error)
	FindWaggerRepo(idQuery primitive.ObjectID) (entity.Wagger, error)
	FindAllWaggerRepo(pageNumber int64, limit int64) ([]entity.Wagger, error)
	CountWaggerRepository() (int, error)
	UpdatedWagger(wagger *entity.Wagger) (interface{}, error)
}

func (c *DriverRepository) SavedWaggerRepo(wagger *entity.Wagger) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("wagger")
	insertResult, err := collection.InsertOne(context.TODO(), wagger)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return wagger, nil
}

func (c *DriverRepository) FindWaggerRepo(idQuery primitive.ObjectID) (entity.Wagger, error) {
	var collection = c.client.Database("grd_database").Collection("wagger")
	var result entity.Wagger

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllWaggerRepo(pageNumber int64, limit int64) ([]entity.Wagger, error) {
	var collection = c.client.Database("grd_database").Collection("wagger")
	var results []entity.Wagger
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Wagger
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) CountWaggerRepository() (int, error) {
	var collection = c.client.Database("grd_database").Collection("wagger")

	records, err := collection.CountDocuments(context.TODO(), bson.D{{}})

	if err != nil {
		return 0, err
	}

	return int(records), nil
}

func (c *DriverRepository) UpdatedWagger(wagger *entity.Wagger) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("wagger")
	filter := bson.D{{"uid", wagger.Uid}}
	update := bson.D{
		{"$set", bson.D{
			{
				"date", wagger.Date,
			},
			{
				"title", wagger.Title,
			},
			{
				"description", wagger.Description,
			},
			{
				"price", wagger.Price,
			},
			{
				"deadlineDate", wagger.DeadlineDate,
			},
			{
				"gameWay", wagger.GameWay,
			},
			{
				"priceParticipate", wagger.PriceParticipate,
			},
			{
				"format", wagger.Format,
			},
			{
				"isPublic", wagger.IsPublic,
			},
			{
				"statut", wagger.Statut,
			},
			{
				"participant", wagger.Participant,
			},
		}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return updateResult.ModifiedCount, nil
}
