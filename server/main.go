package main

import (
	"fmt"

	"github.com/sirupsen/logrus"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func main() {
	schemaConfig := graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name:   "RootQuery",
			Fields: queries.GetRootFields(),
		}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name:   "RootMutation",
			Fields: mutations.GetRootFields(),
		}),
	}
	schema, err := graphql.NewSchema(schemaConfig)

	if err != nil {
		logrus.Fatalf("Failed to create new schema, error: %v", err)
	}

	httpHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	http.Handle("/",httpHandler)
	fmt.Println("ready: listening 4000")
	http.ListenAndServe(":4000", nil)
}
