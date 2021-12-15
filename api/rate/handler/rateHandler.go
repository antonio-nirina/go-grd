package handler

import (
	"time"

	"github.com/thoussei/antonio/api/rate/entity"
	"github.com/thoussei/antonio/api/rate/repository"
	userEntity "github.com/thoussei/antonio/api/user/entity"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RateViewModel struct {
	Uid     string                    `json:"uid"`
	Created string                    `json:"created"`
	Updated string                    `json:"updated"`
	User    userHandler.UserViewModel `json:"user"`
	Score   int                       `json:"score"`
}

type rateUsecase struct {
	rateRepository repository.RepositoryRate
	userUsecase    userHandler.Usecase
}

func NewUsecaseRate(r repository.RepositoryRate, u userHandler.Usecase) UsecaseRate {
	return &rateUsecase{
		rateRepository: r,
		userUsecase:    u,
	}
}

type UsecaseRate interface {
	SavedRateHandler(rate *entity.Rate) (interface{}, error)
	FindRateHandler(idQuery string) (RateViewModel, error)
	FindOneRateHandler(idQuery string) (entity.Rate, error)
	FindAllRateHandler(pageNumber int64, limit int64) ([]RateViewModel, error)
	FindRateByUserHandler(uidUser string) (entity.Rate, error)
	FindRateInWeekHandler(date time.Time) ([]RateViewModel, error)
	FindRateCreateOrUpdatedHandler(uidUser string, uid string) (interface{}, error)
}

func (r *rateUsecase) SavedRateHandler(rate *entity.Rate) (interface{}, error) {
	result, err := r.rateRepository.SavedRepoRate(rate)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (r *rateUsecase) FindRateHandler(idQuery string) (RateViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return RateViewModel{}, err
	}

	rate, err := r.rateRepository.FindRateRepo(objectId)
	user, err := r.userUsecase.FindOneUserByUid(rate.User)

	if err != nil {
		return RateViewModel{}, err
	}

	rateViewModel := RateViewModel{
		Uid:     rate.Uid.Hex(),
		Created: rate.Created,
		Updated: rate.Updated,
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
	}

	return rateViewModel, nil
}

func (r *rateUsecase) FindOneRateHandler(idQuery string) (entity.Rate, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return entity.Rate{}, err
	}

	rate, err := r.rateRepository.FindRateRepo(objectId)

	if err != nil {
		return entity.Rate{}, err
	}

	return rate, nil
}

func (r *rateUsecase) FindAllRateHandler(pageNumber int64, limit int64) ([]RateViewModel, error) {
	result, err := r.rateRepository.FindAllRateRepo(pageNumber, limit)

	if err != nil {
		return []RateViewModel{}, err
	}

	var res []RateViewModel

	for _, item := range result {
		user, _ := r.userUsecase.FindOneUserByUid(item.User)
		rateViewModel := RateViewModel{
			Uid:     item.Uid.Hex(),
			Created: item.Created,
			Updated: item.Updated,
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
		}

		res = append(res, rateViewModel)
	}

	return res, nil
}

func (r *rateUsecase) FindRateByUserHandler(uidUser string) (entity.Rate, error) {
	rate, err := r.rateRepository.FindRateByUserRepo(uidUser)

	if err != nil {
		return entity.Rate{}, err
	}

	return rate, nil
}

func (r *rateUsecase) FindRateInWeekHandler(date time.Time) ([]RateViewModel, error) {
	rate, err := r.rateRepository.FindRateInWeekRepo(date)

	if err != nil {
		return []RateViewModel{}, err
	}
	var rateViewModel []RateViewModel

	for _, val := range rate {
		user, _ := r.userUsecase.FindOneUserByUid(val.User)
		rateview := RateViewModel{
			Uid:     val.Uid.Hex(),
			Created: val.Created,
			Updated: val.Updated,
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
		}
		rateViewModel = append(rateViewModel, rateview)
	}

	return rateViewModel, nil
}

func (r *rateUsecase) FindRateCreateOrUpdatedHandler(uidUser string, uid string) (interface{}, error) {
	var rate *entity.Rate
	
	if uid == "" {
		rate = &entity.Rate{
			Uid:     primitive.NewObjectID(),
			Created: time.Now().Format(time.RFC1123Z),
			Updated: time.Now().Format(time.RFC1123Z),
			User:    uidUser,
			Score:   userEntity.POINT,
		}
		_, err := r.rateRepository.SavedRepoRate(rate)

		if err != nil {
			return nil, err
		}
		
	} else {
		rateUser, err := r.FindRateByUserHandler(uidUser)
		
		if err != nil {
			return nil, err
		}
		var objectId primitive.ObjectID
		objectId, _ = primitive.ObjectIDFromHex(uid)
		rate = &entity.Rate{
			Uid:     rateUser.Uid,
			Created: rateUser.Created,
			Updated: rateUser.Updated,
			User:    rateUser.User,
			Score:   rateUser.Score + userEntity.POINT,
		}
		_, err = r.rateRepository.FindRateCreateOrUpdatedRepo(objectId, rate)
	
		if err != nil {
			return nil, err
		}
	}


	return "Ok", nil
}
