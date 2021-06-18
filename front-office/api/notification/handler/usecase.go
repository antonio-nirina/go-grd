package handler

import (
	"github.com/thoussei/antonio/front-office/api/notification/entity"
	"github.com/thoussei/antonio/front-office/api/notification/repository"
	userEntity "github.com/thoussei/antonio/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseNotif interface {
	SavedNotifHandler(user userEntity.User,name string,title string,typeNotification int) (interface{}, error)
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


func (r *notifUsecase) SavedNotifHandler(user userEntity.User,title string,content string,typeNotification int) (interface{}, error) {
	notify := &entity.Notification{
		Uid: primitive.NewObjectID(),
		Title:title,    		
		Content:content,     	
		Statut:false,
		Type:typeNotification,
		User:user,			
	}

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