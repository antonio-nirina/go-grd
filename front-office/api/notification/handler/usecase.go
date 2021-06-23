package handler

import (
	"github.com/thoussei/antonio/front-office/api/notification/entity"
	"github.com/thoussei/antonio/front-office/api/notification/repository"
	userEntity "github.com/thoussei/antonio/front-office/api/user/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseNotif interface {
	SavedNotifHandler(user userEntity.User,userReq userEntity.User,title string,content string,typeNotification int) (int64, error)
	FindNotifHandler(idUser string,idQuery string) (interface{}, error)
	FindAllNotifHandler(idUser string) ([]entity.Notification, error)
	FindOneByUidNotifHandler(uid string) (entity.Notification, error)
}

type notifUsecase struct {
	notifRepository repository.RepositoryNotif
}

func NewUsecaseNotif(r repository.RepositoryNotif) UsecaseNotif {
	return &notifUsecase{
		notifRepository: r,
	}
}


func (r *notifUsecase) SavedNotifHandler(user userEntity.User,userReq userEntity.User,title string,content string,typeNotification int) (int64, error) {
	notify := &entity.Notification{
		Uid: primitive.NewObjectID(),
		Title:title,    		
		Content:content,     	
		Statut:false,
		Type:typeNotification,
		User:user,
		UserRequest: userReq,			
	}

	_, err := r.notifRepository.SavedNotifRepo(notify)
	count,err := r.notifRepository.CountNotifNotActivateRepo(user.Uid)

	if err != nil {
		return 0, err
	}

	return count,nil
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

func (r *notifUsecase) FindAllNotifHandler(idUser string) ([]entity.Notification, error) {
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

func (r *notifUsecase) FindOneByUidNotifHandler(uid string) (entity.Notification, error) {
	objectId, err := primitive.ObjectIDFromHex(uid)

	if err != nil {
		return entity.Notification{}, err
	}
	
	result, err := r.notifRepository.FindOneByUidNotifRepo(objectId)

	if err != nil {
		return entity.Notification{}, err
	}

	return result,nil
}