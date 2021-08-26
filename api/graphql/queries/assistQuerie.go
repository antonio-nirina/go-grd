package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/graphql/types"
)


func FindOneAsist() *graphql.Field {
	return &graphql.Field{
		Type:        types.AssistSchemaType,
		Description: "Get single Assist",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: asistResolver.FindAsistResolver,
	}
}

func FindAllAsist() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.AssistSchemaType),
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Description: "Get all page assist",
		Resolve: asistResolver.FindAllAsistResolver,
	}
}

func FindOneSubject() *graphql.Field {
	return &graphql.Field{
		Type:        types.SubjectSchemaType,
		Description: "Get single Subject",
		Args: graphql.FieldConfigArgument{
			"uid": &graphql.ArgumentConfig{
				Type: graphql.String,
			},
		},
		
		Resolve: asistResolver.FindSubjectResolver,
	}
}

func FindAllSubject() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.SubjectSchemaType),
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Description: "Get all page subject",
		Resolve: asistResolver.FindAllSubjectResolver,
	}
}

func FindAssistBySubject() *graphql.Field {
	return &graphql.Field{
		Type:        graphql.NewList(types.SubjectAssistSchemaType),
		Args: graphql.FieldConfigArgument{
			"limit": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
			"pageNumber": &graphql.ArgumentConfig{
				Type: graphql.Int,
			},
		},
		Description: "Get all page assist by subject",
		Resolve: asistResolver.FindAssistBySubjectResolver,
	}
}