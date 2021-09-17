package handler

import (
	"github.com/thoussei/antonio/api/post/entity"
	"github.com/thoussei/antonio/api/post/repository"
	userHanlder "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostViewModel struct {
	Uid       string 						`json:"uid"`
	Title     string             			`json:"title"`
	User      userHanlder.UserViewModel   `json:"user"`
	Content   string             			`json:"content"`
}

type UsecasePost interface {
	CreatePostHandler(cmty *entity.Post) (interface{}, error)
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

func (c *postUsecase) CreatePostHandler(cmty *entity.Post) (interface{}, error) {

	_,err := c.postRepository.SavedPostRepo(cmty)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
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
	}

	return cmtyViewModel,nil
}

func (c *postUsecase) FindAllPostHandler(pageNumber int64,limit int64) ([]PostViewModel, error) {
	result, err := c.postRepository.FindAllPostRepo(pageNumber,limit)

	if err != nil {
		return []PostViewModel{}, err
	}

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
		}

		res = append(res, cmtyViewModel)
	}
	
	return res,nil
}