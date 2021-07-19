package delivery

import (

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/notification/handler"
	userHandler "github.com/thoussei/antonio/api/user/handler"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

type NotifResolver interface {
	SavedNotifResolver(params graphql.ResolveParams) (interface{}, error)
	FindNotifResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllNotifResolver(params graphql.ResolveParams) (interface{}, error)
	UpdatedStatutNotifResolver(params graphql.ResolveParams) (interface{}, error)
}

type resolverNotif struct {
	notifHandler handler.UsecaseNotif
	notifUserHandler userHandler.Usecase
}

func NewNotifResolver(notifUseCase handler.UsecaseNotif,userNotif userHandler.Usecase) NotifResolver {
	return &resolverNotif{
		notifHandler: notifUseCase,
		notifUserHandler:userNotif,
	}
}


func (r *resolverNotif) SavedNotifResolver(params graphql.ResolveParams) (interface{}, error) {
	idUser, _ := params.Args["idUser"].(string)
	titleNotif, _ := params.Args["title"].(string)
	content, _ := params.Args["content"].(string)
	typeNotif, _ := params.Args["type"].(int)
	idUserReq,_ := params.Args["idUserReq"].(string)
	user,err := r.notifUserHandler.FindOneUserById(idUser)
	userReq,err := r.notifUserHandler.FindOneUserById(idUserReq)

	if err != nil {
		return nil,err
	}

	r.notifHandler.SavedNotifHandler(user,userReq,titleNotif,content,typeNotif)

	return "Ok",nil
}

func (r *resolverNotif) FindNotifResolver(params graphql.ResolveParams) (interface{}, error) {
	idUser, _ := params.Args["idUser"].(string)
	idNotif, _ := params.Args["idNotification"].(string)
	notif,err := r.notifHandler.FindNotifHandler(idUser,idNotif)

	if err != nil {
		return nil,err
	}

	return notif,nil
}

func (r *resolverNotif) FindAllNotifResolver(params graphql.ResolveParams) (interface{}, error) {
	idUser, _ := params.Args["idUser"].(string)
	notifs,err :=  r.notifHandler.FindAllNotifHandler(idUser)

	if err != nil {
		return nil,err
	}

	return notifs,nil
}

func (r *resolverNotif) UpdatedStatutNotifResolver(params graphql.ResolveParams) (interface{}, error) {
	uid, _ := params.Args["uid"].(string)
	notif,err :=  r.notifHandler.FindOneByUidNotifHandler(uid)

	if err != nil {
		return nil,err
	}

	_,err = r.notifHandler.UpdatedStatutNotifHandler(uid)

	return notif,nil
}