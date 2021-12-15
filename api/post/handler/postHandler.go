package handler

import (
	"github.com/thoussei/antonio/api/external"
	"github.com/thoussei/antonio/api/post/entity"
	"github.com/thoussei/antonio/api/post/repository"
	rateHandler "github.com/thoussei/antonio/api/rate/handler"
	userHanlder "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	PAGE_NUMBER = 0
	LIMIT       = 10
)

type PostViewModel struct {
	Uid       string                    `json:"uid"`
	Title     string                    `json:"title"`
	User      userHanlder.UserViewModel `json:"user"`
	Content   string                    `json:"content"`
	ImageType string                    `json:"imageType"`
	Files     string                    `json:"files"`
	Date      string                    `json:"date"`
}

type UsecasePost interface {
	CreatePostHandler(cmty *entity.Post) ([]PostViewModel, error)
	FindPostHandler(idQuery string) (PostViewModel, error)
	FindAllPostHandler(pageNumber int64, limit int64) ([]PostViewModel, error)
	RemoveHandler(idQuery string) ([]PostViewModel, error)
}

type postUsecase struct {
	postRepository repository.RepositoryPost
	userUsecase userHanlder.Usecase
	rateUsecase rateHandler.UsecaseRate
}

func NewUsecasePost(r repository.RepositoryPost, u userHanlder.Usecase,rate rateHandler.UsecaseRate) UsecasePost {
	return &postUsecase{
		postRepository: r,
		userUsecase:u,
		rateUsecase:rate,
	}
}

func (c *postUsecase) CreatePostHandler(cmty *entity.Post) ([]PostViewModel, error) {
	urlFile := cmty.Files

	if cmty.Files != "" {
		upl := &external.FileUpload{}
		url, _ := upl.HandleFileInBBApi(cmty.Files, cmty.ImageType)
		urlFile = url
	}

	cmty.Files = urlFile
	_, err := c.postRepository.SavedPostRepo(cmty)

	if err != nil {
		return []PostViewModel{}, err
	}

	result, err := c.postRepository.FindAllPostRepo(PAGE_NUMBER, LIMIT)

	if err != nil {
		return []PostViewModel{}, err
	}

	_,err = c.rateUsecase.FindRateCreateOrUpdatedHandler(cmty.User,"")

	if err != nil {
		return []PostViewModel{}, err
	}

	return handlerAllPost(result,c), nil
}

func (c *postUsecase) FindPostHandler(idQuery string) (PostViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return PostViewModel{}, err
	}

	result, err := c.postRepository.FindPostRepo(objectId)

	if err != nil {
		return PostViewModel{}, err
	}
	
	user,_ := c.userUsecase.FindOneUserByUid(result.User)
	userViews := userHanlder.UserViewModel{
		Uid:           user.Uid.Hex(),
		FirstName:     user.FirstName,
		LastName:      user.LastName,
		Email:         user.Email,
		Username:      user.Username,
		IsBanned:      user.IsBanned,
		Avatar:        user.Avatar,
		Language:      user.Language,
		Point:         user.Point,
		Roles:         user.Roles,
		TypeConnexion: user.TypeConnexion,
		Created:       user.Created,
	}

	cmtyViewModel := PostViewModel{
		Uid:       result.Uid.Hex(),
		Title:     result.Title,
		User:      userViews,
		Content:   result.Content,
		ImageType: result.ImageType,
		Files:     result.Files,
		Date:      result.Date,
	}

	return cmtyViewModel, nil
}

func (c *postUsecase) FindAllPostHandler(pageNumber int64, limit int64) ([]PostViewModel, error) {
	result, err := c.postRepository.FindAllPostRepo(pageNumber, limit)

	if err != nil {
		return []PostViewModel{}, err
	}

	return handlerAllPost(result,c), nil
}

func handlerAllPost(result []entity.Post, c *postUsecase) []PostViewModel {
	var res []PostViewModel

	for _, val := range result {
		user,_ := c.userUsecase.FindOneUserByUid(val.User)
		userViews := userHanlder.UserViewModel{
			Uid:           user.Uid.Hex(),
			FirstName:     user.FirstName,
			LastName:      user.LastName,
			Email:         user.Email,
			Username:      user.Username,
			IsBanned:      user.IsBanned,
			Avatar:        user.Avatar,
			Language:      user.Language,
			Point:         user.Point,
			Roles:         user.Roles,
			TypeConnexion: user.TypeConnexion,
			Created:       user.Created,
		}

		cmtyViewModel := PostViewModel{
			Uid:       val.Uid.Hex(),
			Title:     val.Title,
			User:      userViews,
			Content:   val.Content,
			ImageType: val.ImageType,
			Files:     val.Files,
			Date:      val.Date,
		}

		res = append(res, cmtyViewModel)
	}

	return res
}

func (c *postUsecase) RemoveHandler(idQuery string) ([]PostViewModel, error) {
	objectId, _ := primitive.ObjectIDFromHex(idQuery)
	_, err := c.postRepository.RemovedPostRepo(objectId)

	if err != nil {
		return []PostViewModel{}, err
	}

	result, err := c.postRepository.FindAllPostRepo(PAGE_NUMBER, LIMIT)

	if err != nil {
		return []PostViewModel{}, err
	}

	return handlerAllPost(result,c), nil
}
