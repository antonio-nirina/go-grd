package handler

import (
	"github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/community/repository"
	gameHanlder "github.com/thoussei/antonio/api/games/handler"
	userHanlder "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseCmty interface {
	CreatePublicationHandler(cmty *entity.Communauty) (interface{}, error)
	FindCmtyHandler(idQuery string) (CmtyViewModel, error)
	FindAllCmtyHandler(pageNumber int64,limit int64) ([]CmtyViewModel, error)
}

type cmtytUsecase struct {
	cmtyRepository repository.RepositoryCmty
}

func NewUsecaseCmty(r repository.RepositoryCmty) UsecaseCmty {
	return &cmtytUsecase{
		cmtyRepository: r,
	}
}

func (c *cmtytUsecase) CreatePublicationHandler(cmty *entity.Communauty) (interface{}, error) {

	_,err := c.cmtyRepository.SavedCmtyRepo(cmty)

	if err != nil {
		return 0, err
	}

	return "Ok",nil
}

func (c *cmtytUsecase) FindCmtyHandler(idQuery string) (CmtyViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	
	if err != nil {
		return CmtyViewModel{}, err
	}

	result, err := c.cmtyRepository.FindCmtyRepo(objectId)

	if err != nil {
		return CmtyViewModel{}, err
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

	gameViews := gameHanlder.GameViewModel{
		Uid:result.Game.Uid.Hex(),
		Name:result.Game.Name,
		Image:result.Game.Image,
		Logo:result.Game.Logo,
		Notes:result.Game.Notes,
		Slug:result.Game.Slug,
	}

	cmtyViewModel := CmtyViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,
		User:userViews,
		Content:result.Content,
		Game:gameViews,     			
	}

	return cmtyViewModel,nil
}

func (c *cmtytUsecase) FindAllCmtyHandler(pageNumber int64,limit int64) ([]CmtyViewModel, error) {
	result, err := c.cmtyRepository.FindAllCmtyRepo(pageNumber,limit)

	if err != nil {
		return []CmtyViewModel{}, err
	}

	var res []CmtyViewModel

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
		gameViews := gameHanlder.GameViewModel{
			Uid:val.Game.Uid.Hex(),
			Name:val.Game.Name,
			Image:val.Game.Image,
			Logo:val.Game.Logo,
			Notes:val.Game.Notes,
			Slug:val.Game.Slug,
		}
		cmtyViewModel := CmtyViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			User:userViews,
			Content:val.Content,
			Game:gameViews,  		
		}

		res = append(res, cmtyViewModel)
	}
	
	return res,nil
}