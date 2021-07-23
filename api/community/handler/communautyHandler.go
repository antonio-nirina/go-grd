package handler

import (
	"github.com/thoussei/antonio/api/community/entity"
	"github.com/thoussei/antonio/api/community/repository"
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

	cmtyViewModel := CmtyViewModel{
		Uid: result.Uid.Hex(),
		Title:result.Title,
		User:result.User,
		Content:result.Content,     			
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
		cmtyViewModel := CmtyViewModel{
			Uid: val.Uid.Hex(),
			Title:val.Title,
			User:val.User,
			Content:val.Content,  		
		}

		res = append(res, cmtyViewModel)
	}
	
	return res,nil
}