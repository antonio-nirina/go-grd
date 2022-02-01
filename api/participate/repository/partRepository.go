package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/participate/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DriverRepository struct {
	client *mongo.Client
}

// Return Interface User Repository
func NewPartRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}

type RepositoryPart interface {
	SavedPartRepo(part *entity.Participate) (interface{}, error)
	FindPartRepo(idQuery primitive.ObjectID) (entity.Participate, error)
	FindAllPartRepo(pageNumber int64, limit int64) ([]entity.Participate, error)
	FindPartUserRepo(pageNumber int64, limit int64, user string) ([]entity.Participate, error)
	UpdatedPartUserRepo(objectId primitive.ObjectID) (interface{}, error)
	FindPartByTournamentRepo(userUid string, objectId primitive.ObjectID) (entity.Participate, error)
	FindPartByLeagueRepo(userUid primitive.ObjectID, objectId primitive.ObjectID) (entity.Participate, error)
	RemovedPartRepo(idQuery primitive.ObjectID) (interface{}, error)
	UpdateNumberConfirmedRepo(objectId primitive.ObjectID, numberConf bool) (interface{}, error)
	GetNumberPartRepo(objectId primitive.ObjectID) (interface{}, error)
	FindPartByWaggerRepo(userUid primitive.ObjectID, uidWagger primitive.ObjectID) (entity.Participate, error)
	FindAllPartTournamentRepo(objectId primitive.ObjectID, pageNumber int64, limit int64) (interface{}, error)
	FindAllPartByTournamentRepo(objectId primitive.ObjectID) ([]entity.Participate, error)
	FindAllPartTeamTournamentRepo(uidTournament primitive.ObjectID, teamUid string) (entity.Participate, error)
	FindAllPartAllTournamentRepo(uidTournament primitive.ObjectID) (int, error)
	// LeavePartTournamentRepo(part *entity.Participate) (interface{},error)
}

type recordsPartModel struct {
	RecordsPart                 int `json:"recordsPart"`
	ReacordsnumberPartConfirmed int `json:"reacordsnumberPartConfirmed"`
}

func (c *DriverRepository) SavedPartRepo(part *entity.Participate) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	insertResult, err := collection.InsertOne(context.TODO(), part)
	filter := bson.D{{"uid", insertResult}}
	records, err := collection.CountDocuments(context.TODO(), filter)

	if err != nil {
		return 0, err
	}

	res := int(records)

	if res == 0 {
		res++
	}

	return res, nil
}

func (c *DriverRepository) FindPartRepo(idQuery primitive.ObjectID) (entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	var result entity.Participate

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllPartRepo(pageNumber int64, limit int64) ([]entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	var results []entity.Participate
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Participate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) FindPartUserRepo(pageNumber int64, limit int64, user string) ([]entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	var results []entity.Participate
	cur, err := collection.Find(context.TODO(), bson.D{{"user", user}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Participate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) UpdatedPartUserRepo(objectId primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	filter := bson.D{{"uid", objectId}}
	update := bson.D{
		{"$set", bson.D{
			{
				"IsWin", true,
			},
		}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return updateResult.ModifiedCount, nil
}

func (c *DriverRepository) FindPartByTournamentRepo(userUid string, objectId primitive.ObjectID) (entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	var result entity.Participate
	err := collection.FindOne(context.TODO(), bson.M{"user": userUid, "tournament.uid": objectId}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindPartByLeagueRepo(userUid primitive.ObjectID, objectId primitive.ObjectID) (entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("Participate")
	var result entity.Participate

	err := collection.FindOne(context.TODO(), bson.M{"user.uid": userUid, "league.uid": objectId}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) RemovedPartRepo(idQuery primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	filter := bson.D{{"uid", idQuery}}
	_, err := collection.DeleteOne(context.TODO(), filter)
	records, err := collection.CountDocuments(context.TODO(), bson.D{{}})

	if err != nil {
		return nil, err
	}

	return records, nil
}

func (c *DriverRepository) UpdateNumberConfirmedRepo(objectId primitive.ObjectID, numberConf bool) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	filter := bson.D{{"uid", objectId}}
	update := bson.D{
		{"$set", bson.D{
			{
				"numberpartconfirmed", numberConf,
			},
		}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return updateResult.ModifiedCount, nil
}

func (c *DriverRepository) GetNumberPartRepo(objectId primitive.ObjectID) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	records, err := collection.CountDocuments(context.TODO(), bson.D{{"tournament.uid", objectId}})
	filter := bson.D{{"tournament.uid", objectId}, {"numberpartconfirmed", true}}
	recordConfirmed, err := collection.CountDocuments(context.TODO(), filter)

	if err != nil {
		return nil, err
	}

	recs := recordsPartModel{
		RecordsPart:                 int(records),
		ReacordsnumberPartConfirmed: int(recordConfirmed),
	}

	return recs, nil
}

func (c *DriverRepository) FindPartByWaggerRepo(userUid primitive.ObjectID, uidWagger primitive.ObjectID) (entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("Participate")
	var result entity.Participate

	err := collection.FindOne(context.TODO(), bson.M{"user.uid": userUid, "wagger.uid": uidWagger}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllPartTournamentRepo(objectId primitive.ObjectID, pageNumber int64, limit int64) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	var results []entity.Participate
	cur, err := collection.Find(context.TODO(), bson.D{{"tournament.uid", objectId}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Participate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) FindAllPartByTournamentRepo(objectId primitive.ObjectID) ([]entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	var results []entity.Participate
	cur, err := collection.Find(context.TODO(), bson.D{{"tournament.uid", objectId}}, options.Find().SetSort(bson.M{"_id": -1}))

	if err != nil {
		return results, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Participate
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) FindAllPartTeamTournamentRepo(uidTournament primitive.ObjectID, teamUid string) (entity.Participate, error) {
	var collection = c.client.Database("grd_database").Collection("participate")
	var result entity.Participate

	err := collection.FindOne(context.TODO(), bson.M{"team": teamUid, "tournament.uid": uidTournament}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllPartAllTournamentRepo(uidTournament primitive.ObjectID) (int, error) {
	var collection = c.client.Database("grd_database").Collection("participate")

	records, err := collection.CountDocuments(context.TODO(), bson.D{{"tournament.uid", uidTournament}})

	if err != nil {
		return 0, err
	}

	return int(records), nil
}
