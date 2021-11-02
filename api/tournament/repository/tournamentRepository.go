package repository

import (
	"context"
	"fmt"

	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/tournament/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DriverRepository struct {
	client *mongo.Client
}

// Return Interface User Repository
func NewTournamentRepository(client *mongo.Client) *DriverRepository {
	return &DriverRepository{client}
}

type RepositoryTournament interface {
	SavedTournamentRepo(tournament *entity.Tournament) (interface{}, error)
	FindTournamentRepo(idQuery primitive.ObjectID) (entity.Tournament, error)
	FindAllTournamentRepo(pageNumber int64, limit int64) ([]entity.Tournament, error)
	FindTournamentGameRepo(pageNumber int64, limit int64, game primitive.ObjectID) ([]entity.Tournament, error)
	CountTournamentRepository() (int, error)
	UpdatedTournament(tournament *entity.Tournament) (interface{}, error)
}

func (c *DriverRepository) SavedTournamentRepo(tournament *entity.Tournament) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("tournament")
	insertResult, err := collection.InsertOne(context.TODO(), tournament)

	if err != nil {
		return nil, err
	}

	fmt.Println("Inserted a single document: ", insertResult)

	return tournament, nil
}

func (c *DriverRepository) FindTournamentRepo(idQuery primitive.ObjectID) (entity.Tournament, error) {
	var collection = c.client.Database("grd_database").Collection("tournament")
	var result entity.Tournament

	err := collection.FindOne(context.TODO(), bson.M{"uid": idQuery}).Decode(&result)

	if err != nil {
		return result, err
	}

	return result, nil
}

func (c *DriverRepository) FindAllTournamentRepo(pageNumber int64, limit int64) ([]entity.Tournament, error) {
	// var skp int64
	// skp = (pageNumber - 1) * limit
	var collection = c.client.Database("grd_database").Collection("tournament")
	var results []entity.Tournament
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Tournament
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) FindTournamentGameRepo(pageNumber int64, limit int64, game primitive.ObjectID) ([]entity.Tournament, error) {
	var collection = c.client.Database("grd_database").Collection("tournament")
	var results []entity.Tournament
	cur, err := collection.Find(context.TODO(), bson.D{{"game.uid", game}}, options.Find().SetLimit(limit).SetSkip(pageNumber).SetSort(bson.M{"_id": -1}))

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var elem entity.Tournament
		err := cur.Decode(&elem)
		if err != nil {
			external.Logger(fmt.Sprintf("%v", err))
		}

		results = append(results, elem)
	}

	cur.Close(context.TODO())

	return results, nil
}

func (c *DriverRepository) CountTournamentRepository() (int, error) {
	var collection = c.client.Database("grd_database").Collection("tournament")

	records, err := collection.CountDocuments(context.TODO(), bson.D{{}})

	if err != nil {
		return 0, err
	}

	return int(records), nil
}

func (c *DriverRepository) UpdatedTournament(tournament *entity.Tournament) (interface{}, error) {
	var collection = c.client.Database("grd_database").Collection("tournament")
	filter := bson.D{{"uid", tournament.Uid}}
	update := bson.D{
		{"$set", bson.D{
			{
				"title", tournament.Title,
			},
			{
				"dateDebut", tournament.DateDebut,
			},
			{
				"game", tournament.Game,
			},
			{
				"plateform", tournament.Plateform,
			},
			{
				"numberParticipate", tournament.NumberParticipate,
			},
			{
				"numberTeam", tournament.NumberTeam,
			},
			{
				"price", tournament.Price,
			},
			{
				"deadlineDate", tournament.DeadlineDate,
			},
			{
				"priceParticipate", tournament.PriceParticipate,
			},
			{
				"statut", tournament.Statut,
			},
			{
				"info", tournament.Info,
			},
			{
				"rules", tournament.Rules,
			},
			{
				"isTeam", tournament.IsTeam,
			},
			{
				"isPublic", tournament.IsPublic,
			},
		}}}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return updateResult.ModifiedCount, nil
}
