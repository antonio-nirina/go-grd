package mutation

import (
	"github.com/graphql-go/graphql"
)


func GetRootFields() graphql.Fields {
	return graphql.Fields{
		"createdUser": createdUser(),
	}
}




