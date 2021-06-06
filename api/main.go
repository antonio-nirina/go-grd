package main

import (
	"fmt"
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/thoussei/antonio/main/front-office/api/external"
	"github.com/thoussei/antonio/main/front-office/api/graphql/mutation"
	"github.com/thoussei/antonio/main/front-office/api/graphql/queries"
)

func main() {
	schemaConfig := graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name:   "Query",
			Fields: queries.GetRootFields(),
		}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name:   "Mutation",
			Fields: mutation.GetRootFields(),
		}),
		/*Subscription: graphql.NewObject(graphql.ObjectConfig{
            Name: "Subscription",
            Fields: graphql.Fields{
                "subscribeUser": &graphql.Field{
                    Type: graphql.String,
                },
            },
        }),*/
	}
	schema, err := graphql.NewSchema(schemaConfig)

	if err != nil {
		message := fmt.Sprintf("Failed to create new schema, error: %v", err)
		external.Logger(message)
	}

	httpHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
		// FormatErrorFn: ,
	})

	http.Handle("/", external.Handle(httpHandler))
	fmt.Println("ready: listening 4000")
	http.ListenAndServe(":4000", nil)
}
