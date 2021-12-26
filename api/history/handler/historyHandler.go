package handler

import (
	"github.com/thoussei/antonio/api/history/entity"
	"github.com/thoussei/antonio/api/history/repository"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type HistoryChatViewModel struct {
	Uid         string                    `json:"uid"`
	Created     string                    `json:"created"`
	Updated     string                    `json:"updated"`
	UserFrom    userHandler.UserViewModel `json:"userfrom"`
	UserTo      userHandler.UserViewModel `json:"userto"`
	ContentFrom []entity.DataContent      `json:"contentFrom"`
	ContentTo   []entity.DataContent      `json:"contentTo"`
}

type historyUsecase struct {
	historyRepository repository.RepositoryHistory
	userUsecase       userHandler.Usecase
}

func NewUsecaseHistory(h repository.RepositoryHistory, u userHandler.Usecase) UsecaseHistory {
	return &historyUsecase{
		historyRepository: h,
		userUsecase:       u,
	}
}

type UsecaseHistory interface {
	SavedHistoryHandler(history *entity.HistoryChat) (interface{}, error)
	FindHistoryHandler(idQuery string) (HistoryChatViewModel, error)
	UpdatedHistoryHandler(history *entity.HistoryChat) (interface{}, error)
}

func (h *historyUsecase) SavedHistoryHandler(history *entity.HistoryChat) (interface{}, error) {
	result, err := h.historyRepository.SavedRepoHistory(history)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (h *historyUsecase) FindHistoryHandler(idQuery string) (HistoryChatViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return HistoryChatViewModel{}, err
	}

	history, err := h.historyRepository.FindHistoryRepo(objectId)

	if err != nil {
		return HistoryChatViewModel{}, err
	}
	userTo, _ := h.userUsecase.FindOneUserByUid(history.UserTo)
	userFrom, _ := h.userUsecase.FindOneUserByUid(history.UserFrom)
	var dataTo []entity.DataContent
	var dataFrom []entity.DataContent

	for _, val := range history.ContentFrom {
		dataviewFrom := entity.DataContent{
			Created: val.Created,
			Updated: val.Updated,
			Content: val.Content,
		}
		dataFrom = append(dataFrom, dataviewFrom)
	}

	for _, val := range history.ContentTo {
		dataviewTo := entity.DataContent{
			Created: val.Created,
			Updated: val.Updated,
			Content: val.Content,
		}
		dataTo = append(dataTo, dataviewTo)
	}
	historyViewModel := HistoryChatViewModel{
		Uid: history.Uid.Hex(),
		UserFrom: userHandler.UserViewModel{
			Uid:           history.Uid.Hex(),
			FirstName:     userFrom.FirstName,
			LastName:      userFrom.LastName,
			Email:         userFrom.Email,
			Username:      userFrom.Username,
			IsBanned:      userFrom.IsBanned,
			Avatar:        userFrom.Avatar,
			Language:      userFrom.Language,
			Point:         userFrom.Point,
			Roles:         userFrom.Roles,
			TypeConnexion: userFrom.TypeConnexion,
			Created:       userFrom.Created,
		},
		UserTo: userHandler.UserViewModel{
			Uid:           userTo.Uid.Hex(),
			FirstName:     userTo.FirstName,
			LastName:      userTo.LastName,
			Email:         userTo.Email,
			Username:      userTo.Username,
			IsBanned:      userTo.IsBanned,
			Avatar:        userTo.Avatar,
			Language:      userTo.Language,
			Point:         userTo.Point,
			Roles:         userTo.Roles,
			TypeConnexion: userTo.TypeConnexion,
			Created:       userTo.Created,
		},
		ContentTo:   dataTo,
		ContentFrom: dataFrom,
	}

	return historyViewModel, nil
}

func (h *historyUsecase) UpdatedHistoryHandler(history *entity.HistoryChat) (interface{}, error) {
	result, err := h.historyRepository.UpdatedRepoHistory(history)

	if err != nil {
		return nil, err
	}

	return result, nil
}
