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
	schm := graphql.Schema{}
	query := schm.Query()
	mutation := schm.Mutation()
	schemaConfig := graph.SchemaConfig{
		Query:    query,
		Mutation: mutation,
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
