package handler

import (
	"fmt"

	"github.com/thoussei/antonio/front-office/api/notification/entity"
	"github.com/thoussei/antonio/front-office/api/notification/repository"
	userHandler "github.com/thoussei/antonio/front-office/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseNotif interface {
	SavedNotifHandler(idUser string,name string,title string) (interface{}, error)
	FindNotifHandler(idUser string,idQuery string) (interface{}, error)
	FindAllNotifHandler(idUser string) (interface{}, error)
}

type notifUsecase struct {
	notifRepository repository.RepositoryNotif
}

func NewUsecaseNotif(r repository.RepositoryNotif) UsecaseNotif {
	return &notifUsecase{
		notifRepository: r,
	}
}

// Instance User handler
var userH = &userHandler.UserUsecase{}

func (r *notifUsecase) SavedNotifHandler(idUser string,title string,content string) (interface{}, error) {
	fmt.Println("userH", userH)
	user,err := userH.FindOneUserById(idUser)
	
	if err != nil {
		fmt.Println("errr", err)
		return nil, err
	}

	notify := &entity.Notification{
		Title:title,    		
		Content:content,     	
		Statut:false,
		User:user,			
	}

	fmt.Println("notify", notify)
	result, err := r.notifRepository.SavedNotifRepo(notify)

	if err != nil {
		return nil, err
	}

	return result,nil
}

func (r *notifUsecase) FindNotifHandler(idUser string,idQuery string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)
	userId, err := primitive.ObjectIDFromHex(idUser)

	if err != nil {
		return nil, err
	}

	result, err := r.notifRepository.FindNotifRepo(userId,objectId)

	if err != nil {
		return nil, err
	}

	return result,nil
}

func (r *notifUsecase) FindAllNotifHandler(idUser string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(idUser)

	if err != nil {
		return nil, err
	}
	
	result, err := r.notifRepository.FindAllNotifRepo(objectId)

	if err != nil {
		return nil, err
	}

	return result,nil
}