package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/asistant/entity"
	"github.com/thoussei/antonio/api/external"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type driverRepository struct {
	client *mongo.Client
}


func NewAsistRepository(client *mongo.Client) *driverRepository {
	return &driverRepository{client}
}


type RepositoryAsist interface {
	SavedRepoAsistRepo(asist *entity.Asistant) (interface{}, error)
	FindAsistRepo(idQuery primitive.ObjectID) (entity.Asistant, error)
	FindAllAsistRepo()([]entity.Asistant, error)
	UpdatedRepoAsist(asist *entity.Asistant) (interface{}, error)
	// RemovedRepoAsist(home *entity.Asistant) (interface{}, error)
}

func (c *driverRepository) SavedRepoAsistRepo(asist *entity.Asistant) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("asistant")
	insertResult, err := collection.InsertOne(context.TODO(), asist)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return asist, nil
}


func (c *driverRepository) FindAsistRepo(idQuery primitive.ObjectID) (entity.Asistant, error) {
	var collection = c.client.Database("grd_database").Collection("asistant")
	var result entity.Asistant

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *driverRepository) FindAllAsistRepo() ([]entity.Asistant, error) {
	var collection = c.client.Database("grd_database").Collection("asistant")
	var results []entity.Asistant
	cur, err := collection.Find(context.TODO(), bson.D{{"statut",true}},options.Find())

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Asistant
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	
	cur.Close(context.TODO())

	return results, nil
}

func (c *driverRepository) UpdatedRepoAsist(asist *entity.Asistant) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("asistant")
	filter := bson.D{{"uid", asist.Uid}}
	update := bson.D{
		{"$set", bson.D{
			{
				"Statut", asist.Statut,
			},
		}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return updateResult.ModifiedCount, nil
}


/*func (c *driverRepository) RemovedRepoAsist(idQuery primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("home")
	filter := bson.D{{"uid", idQuery}}

	updateResult, err := collection.DeleteOne(context.TODO(), filter)

	if err != nil {
		return nil,err
	}

	return updateResult.DeletedCount,nil
}*/
	