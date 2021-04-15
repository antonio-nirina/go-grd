package main

import (
	"fmt"
	"net/http"

	graph "github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/sirupsen/logrus"
	"github.com/thoussei/antonio/front-office/server/graphql"
)

func main() {
	schemaConfig := graph.SchemaConfig{
		Query:    graphql.Query(),
		Mutation: graphql.Mutation(),
	}
	schema, err := graph.NewSchema(schemaConfig)

	if err != nil {
		logrus.Fatalf("Failed to create new schema, error: %v", err)
	}

	httpHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	http.Handle("/", httpHandler)
	fmt.Println("ready: listening 4000")
	http.ListenAndServe(":4000", nil)
}
