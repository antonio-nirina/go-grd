package handler

import (
	"github.com/thoussei/antonio/api/post/entity"
	"github.com/thoussei/antonio/api/post/repository"
	userHanlder "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	PAGE_NUMBER = 0
	LIMIT 		= 10
)

type PostViewModel struct {
	Uid       string 						`json:"uid"`
	Title     string             			`json:"title"`
	User      userHanlder.UserViewModel   `json:"user"`
	Content   string             			`json:"content"`
	ImageType   string             `json:"imageType"`
	Files   string             `json:"files"`
	Date       string                `json:"date"`
}

type UsecasePost interface {
	CreatePostHandler(cmty *entity.Post) ([]PostViewModel, error)
	FindPostHandler(idQuery string) (PostViewModel, error)
	FindAllPostHandler(pageNumber int64,limit int64) ([]PostViewModel, error)
}

type postUsecase struct {
	postRepository repository.RepositoryPost
}

func NewUsecasePost(r repository.RepositoryPost) UsecasePost {
	return &postUsecase{
		postRepository: r,
	}
}

func (c *postUsecase) CreatePostHandler(cmty *entity.Post) ([]PostViewModel, error) {

	_,err := c.postRepository.SavedPostRepo(cmty)

	if err != nil {
		return []PostViewModel{}, err
	}

	result, err := c.postRepository.FindAllPostRepo(PAGE_NUMBER,LIMIT)

	if err != nil {
		return []PostViewModel{}, err
	}

	return handlerAllPost(result),nil
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

	userViews := userHanlder.UserViewModel{
		Uid:result.User.Uid.Hex(),           
		FirstName:result.User.FirstName,   
		LastName:result.User.LastName,   
		Email:result.User.Email,        
		Username:result.User.Username,     
		IsBanned:result.User.IsBanned,      
		Avatar:result.User.Avatar,       
		Language:result.User.Language,      
		Point:result.User.Point,         
		Roles:result.User.Roles,      	
		TypeConnexion:result.User.TypeConnexion,   
		Created:result.User.Created,	
	}

	cmtyViewModel := PostViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,
		User:userViews,
		Content:result.Content,
		ImageType:result.ImageType,
		Files:result.Files,
		Date:result.Date,  			
	}

	return cmtyViewModel,nil
}

func (c *postUsecase) FindAllPostHandler(pageNumber int64,limit int64) ([]PostViewModel, error) {
	result, err := c.postRepository.FindAllPostRepo(pageNumber,limit)

	if err != nil {
		return []PostViewModel{}, err
	}
	
	return handlerAllPost(result),nil
}

func handlerAllPost(result []entity.Post) ([]PostViewModel) {
	var res []PostViewModel

	for _,val := range result {
		userViews := userHanlder.UserViewModel{
			Uid:val.User.Uid.Hex(),           
			FirstName:val.User.FirstName,   
			LastName:val.User.LastName,   
			Email:val.User.Email,        
			Username:val.User.Username,     
			IsBanned:val.User.IsBanned,      
			Avatar:val.User.Avatar,       
			Language:val.User.Language,      
			Point:val.User.Point,         
			Roles:val.User.Roles,      	
			TypeConnexion:val.User.TypeConnexion,   
			Created:val.User.Created, 		
		}
		
		cmtyViewModel := PostViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			User:userViews,
			Content:val.Content,
			ImageType:val.ImageType,
			Files:val.Files,
			Date:val.Date,
		}

		res = append(res, cmtyViewModel)
	}
	
	return res
}