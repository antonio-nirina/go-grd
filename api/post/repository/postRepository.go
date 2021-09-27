package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/post/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type driverRepository struct {
	client *mongo.Client
}

// Return Interface User Repository
func NewPostRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}

type RepositoryPost interface {
	SavedPostRepo(post *entity.Post) (interface{}, error)
	FindPostRepo(idQuery primitive.ObjectID) (entity.Post, error)
	FindAllPostRepo(pageNumber int64, limit int64) ([]entity.Post, error)
	RemovedPostRepo(idQuery primitive.ObjectID) (interface{}, error)
}

func (c *driverRepository) SavedPostRepo(post *entity.Post) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("post")
	insertResult, err := collection.InsertOne(context.TODO(), post)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return post, nil
}

func (c *driverRepository) FindPostRepo(idQuery primitive.ObjectID) (entity.Post, error) {
	var collection = c.client.Database("grd_database").Collection("post")
	var result entity.Post

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindAllPostRepo(pageNumber int64, limit int64) ([]entity.Post, error) {
	var collection = c.client.Database("grd_database").Collection("post")
	var results []entity.Post
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Post
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) RemovedPostRepo(idQuery primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("post")
	filter := bson.D{{"uid", idQuery}}

	updateResult, err := collection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return nil, err
	}

	return updateResult.DeletedCount, nil
}
