package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/front-office/api/external"
	"github.com/thoussei/antonio/front-office/api/notification/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const LIMIT = 5

type DriverRepository struct {
	client *mongo.Client
}


// Return Interface User Repository
func NewRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}


type RepositoryNotif interface {
	SavedNotifRepo(notif *entity.Notification) (interface{}, error)
	FindNotifRepo(idUser primitive.ObjectID,idQuery primitive.ObjectID) (interface{}, error)
	FindAllNotifRepo(idUser primitive.ObjectID) (interface{}, error)
	CountNotifNotActivateRepo(idUser primitive.ObjectID) (int64, error)
}

func (c *DriverRepository) SavedNotifRepo(notif *entity.Notification) (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("notification")
	insertResult, err := collection.InsertOne(context.TODO(), notif)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return notif, nil
}

func (c *DriverRepository) FindNotifRepo(idUser primitive.ObjectID,objectId primitive.ObjectID) (interface{}, error){

	var collection = c.client.Database("grd_database").Collection("notification")
	var result entity.Notification

	err := collection.FindOne(context.TODO(), bson.M{"_id": objectId,"user.uid":idUser}).Decode(&result)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllNotifRepo(idUser primitive.ObjectID) (interface{}, error){
	var collection = c.client.Database("grd_database").Collection("notification")
	var results []primitive.M
	cur, err := collection.Find(context.TODO(), bson.M{"user.uid":idUser},options.Find().SetLimit(LIMIT).SetSort(bson.M{"_id": -1}))
	// collection.Find(context.TODO(), bson.D{{"user.id",idUser}},options.Find().SetLimit(LIMIT).SetSort(bson.D{{"_id", -1}}))
	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem primitive.M
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}
	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) CountNotifNotActivateRepo(idUser primitive.ObjectID) (int64, error) {
	var collection = c.client.Database("grd_database").Collection("notification")
	count, err := collection.CountDocuments(context.TODO(), bson.M{"user.uid":idUser,"statut":false})
	
	if err != nil {
		return 0, err
	}

	return count, nil
}