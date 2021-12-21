package handler

import (
	"github.com/thoussei/antonio/api/support/entity"
	"github.com/thoussei/antonio/api/support/repository"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SupportViewModel struct {
	Uid     string                    `json:"uid"`
	Created string                    `json:"created"`
	Updated string                    `json:"updated"`
	User    userHandler.UserViewModel `json:"user"`
	Content string                    `json:"content"`
}

type supportUsecase struct {
	supportRepository repository.RepositorySupport
	userUsecase       userHandler.Usecase
}

func NewUsecaseSupport(s repository.RepositorySupport, u userHandler.Usecase) UsecaseSupport {
	return &supportUsecase{
		supportRepository: s,
		userUsecase:       u,
	}
}

type UsecaseSupport interface {
	SavedSupportHandler(support *entity.Support) (interface{}, error)
	FindSupportHandler(idQuery string) (SupportViewModel, error)
}

func (s *supportUsecase) SavedSupportHandler(support *entity.Support) (interface{}, error) {
	result, err := s.supportRepository.SavedRepoSupport(support)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (s *supportUsecase) FindSupportHandler(idQuery string) (SupportViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return SupportViewModel{}, err
	}

	support, err := s.supportRepository.FindSupportRepo(objectId)
	user, err := s.userUsecase.FindOneUserByUid(support.User)

	if err != nil {
		return SupportViewModel{}, err
	}

	supportViewModel := SupportViewModel{
		Uid:     support.Uid.Hex(),
		Created: support.Created,
		Updated: support.Updated,
		User: userHandler.UserViewModel{
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
		},
		Content: support.Content,
	}

	return supportViewModel, nil
}
