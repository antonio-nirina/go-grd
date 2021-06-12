package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	"github.com/graph-gophers/graphql-transport-ws/graphqlws"
	"github.com/thoussei/antonio/front-office/ws/adapter/schema"
)


func main() {	
	const schema = schema.Schema()
	schema := graphql.MustParseSchema(s, &query{})

    http.Handle("/", &relay.Handler{Schema: schema})

    graphQLHandler := graphqlws.NewHandlerFunc(s, &relay.Handler{Schema: s})
	http.HandleFunc("/graphql", graphQLHandler)
    fmt.Println("ready: listening 8080")
    http.ListenAndServe(":8080", nil)
}