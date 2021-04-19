package main

import (
	"errors"
	"fmt"
	"net/http"

	graph "github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/thoussei/antonio/front-office/server/external"
	"github.com/thoussei/antonio/front-office/server/graphql"
)

func main() {
	query := graphql.Query()
	mutation := graphql.Mutation()
	schemaConfig := graph.SchemaConfig{
		Query:    query,
		Mutation: mutation,
	}
	schema, err := graph.NewSchema(schemaConfig)

	if err != nil {
		message := errors.New(fmt.Sprintf("Failed to create new schema, error: %v", err))
		external.Logger(message.Error())
	}

	httpHandler := handler.New(&handler.Config{
		Schema:     &schema,
		Pretty:     true,
		GraphiQL:   true,
		Playground: true,
	})

	http.Handle("/", httpHandler)
	fmt.Println("🚀 Query at 4000")
	http.ListenAndServe(":4000", nil)
}
