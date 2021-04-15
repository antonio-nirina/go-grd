package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConfigMongo() *mongo.Client {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database := os.Getenv("MONGODB_URL")
	fmt.Println("database.......", database)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(database))

	if err != nil {
		log.Fatal("Database not connected error", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Database not connected error", err)
	}

	fmt.Println("Database connect with succes")

	return client
}
