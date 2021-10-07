package types

import (
	"github.com/graphql-go/graphql"
)

var CmtySchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CommunutyType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"streaming": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var CmtyGameTwitchSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GameTwitchType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"box_art_url": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var CmtyStreamingTwitchSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "StreamingTwitchType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"user_id": &graphql.Field{
			Type: graphql.String,
		},
		"user_login": &graphql.Field{
			Type: graphql.String,
		},
		"user_name": &graphql.Field{
			Type: graphql.String,
		},
		"game_id": &graphql.Field{
			Type: graphql.String,
		},
		"game_name": &graphql.Field{
			Type: graphql.String,
		},
		"type": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"box_art_url": &graphql.Field{
			Type: graphql.String,
		},
		"viewer_count": &graphql.Field{
			Type: graphql.Int,
		},
		"started_at": &graphql.Field{
			Type: graphql.String,
		},
		"language": &graphql.Field{
			Type: graphql.String,
		},
		"thumbnail_url": &graphql.Field{
			Type: graphql.String,
		},
		"is_mature": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var CmtyClipTwitchSchemaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ClipTwitchType",
	Fields: graphql.Fields{
		"uid": &graphql.Field{
			Type: graphql.String,
		},
		"id": &graphql.Field{
			Type: graphql.String,
		},
		"url": &graphql.Field{
			Type: graphql.String,
		},
		"broadcaster_id": &graphql.Field{
			Type: graphql.String,
		},
		"broadcaster_name": &graphql.Field{
			Type: graphql.String,
		},
		"creator_id": &graphql.Field{
			Type: graphql.String,
		},
		"creator_name": &graphql.Field{
			Type: graphql.String,
		},
		"video_id": &graphql.Field{
			Type: graphql.String,
		},
		"viewer_count": &graphql.Field{
			Type: graphql.Int,
		},
		"game_id": &graphql.Field{
			Type: graphql.String,
		},
		"language": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"created_at": &graphql.Field{
			Type: graphql.String,
		},
		"thumbnail_url": &graphql.Field{
			Type: graphql.String,
		},
	},
})