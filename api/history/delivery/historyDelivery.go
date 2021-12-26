package delivery

import (
	"time"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/history/entity"
	"github.com/thoussei/antonio/api/history/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type HistoryResolver interface {
	CreatedHistoryChatResolver(params graphql.ResolveParams) (interface{}, error)
	FindHistoryChatResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedHistoryResolver(params graphql.ResolveParams) (interface{}, error)
}

type history struct {
	historyHandler handler.UsecaseHistory
	userHandler    userHandler.Usecase
}

func NewResolverHistory(historyHandler handler.UsecaseHistory, userHandler userHandler.Usecase) HistoryResolver {
	return &history{
		historyHandler: historyHandler,
		userHandler:    userHandler,
	}
}

func (h *history) CreatedHistoryChatResolver(params graphql.ResolveParams) (interface{}, error) {
	uidFrom, _ := params.Args["uidFrom"].(string)
	uidTo, _ := params.Args["uidTo"].(string)
	contentTo, _ := params.Args["contentTo"].(string)
	contentFrom, _ := params.Args["contentFrom"].(string)
	dataContentTo := entity.DataContent{
		Created: time.Now().Format(time.RFC3339),
		Updated: time.Now().Format(time.RFC3339),
		Content: contentTo,
	}
	var dataFrom []entity.DataContent
	var dataTo []entity.DataContent
	dataTo = append(dataTo, dataContentTo)

	dataContentFrom := entity.DataContent{
		Created: time.Now().Format(time.RFC3339),
		Updated: time.Now().Format(time.RFC3339),
		Content: contentFrom,
	}

	dataFrom = append(dataFrom, dataContentFrom)
	history := &entity.HistoryChat{
		Uid:         primitive.NewObjectID(),
		UserFrom:    uidFrom,
		UserTo:      uidTo,
		ContentTo:   dataTo,
		ContentFrom: dataFrom,
	}

	res, err := h.historyHandler.SavedHistoryHandler(history)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (h *history) FindHistoryChatResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	history, err := h.historyHandler.FindHistoryHandler(uid)

	if err != nil {
		return nil, err
	}

	return history, nil
}

func (h *history) UpdatedHistoryResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	contentTo, _ := params.Args["contentTo"].(string)
	contentFrom, _ := params.Args["contentFrom"].(string)
	history, err := h.historyHandler.FindHistoryHandler(uid)

	if err != nil {
		return nil, err
	}
	objectId, _ := primitive.ObjectIDFromHex(history.Uid)
	dataContentTo := entity.DataContent{
		Created: time.Now().Format(time.RFC3339),
		Updated: time.Now().Format(time.RFC3339),
		Content: contentTo,
	}
	dataContentFrom := entity.DataContent{
		Created: time.Now().Format(time.RFC3339),
		Updated: time.Now().Format(time.RFC3339),
		Content: contentFrom,
	}
	historyFromCnt := append(history.ContentFrom, dataContentFrom)
	historyToCnt := append(history.ContentTo, dataContentTo)

	newHistory := &entity.HistoryChat{
		Uid:         objectId,
		UserFrom:    history.UserFrom.Uid,
		UserTo:      history.UserTo.Uid,
		ContentTo:   historyToCnt,
		ContentFrom: historyFromCnt,
	}
	updated, err := h.historyHandler.UpdatedHistoryHandler(newHistory)

	if err != nil {
		return nil, err
	}

	return updated, nil
}
