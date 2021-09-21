package delivery

import (
	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/post/entity"
	"github.com/thoussei/antonio/api/post/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostResolve interface {
	CreatePostResolve(params graphql.ResolveParams) (interface{}, error)
	FindPostResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllPostResolver(params graphql.ResolveParams) (interface{}, error)
}

type post struct {
	postHandler     handler.UsecasePost
	postUserHandler userHandler.Usecase
}

func NewResolverPost(postUseCase handler.UsecasePost, userUsecase userHandler.Usecase) PostResolve {
	return &post{
		postHandler:     postUseCase,
		postUserHandler: userUsecase,
	}
}

func (c *post) CreatePostResolve(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uidUser"].(string)
	title, _ := params.Args["title"].(string)
	date, _ := params.Args["date"].(string)
	content, _ := params.Args["content"].(string)
	imageType, _ := params.Args["imageType"].(string)
	files, _ := params.Args["files"].(string)
	user, err := c.postUserHandler.FindOneUserByUid(uid)

	if err != nil {
		return nil, err
	}

	cmty := &entity.Post{
		Uid:     primitive.NewObjectID(),
		Title:   title,
		User:    user,
		Date:date,
		Content: content,
		ImageType:imageType,
		Files:files,
	}

	res, err := c.postHandler.CreatePostHandler(cmty)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *post) FindPostResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	res, err := c.postHandler.FindPostHandler(uid)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (c *post) FindAllPostResolver(params graphql.ResolveParams) (interface{}, error) {
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)
	res, err := c.postHandler.FindAllPostHandler(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	return res, nil
}
