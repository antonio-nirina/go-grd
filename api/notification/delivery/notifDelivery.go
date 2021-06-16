package delivery

import (
	//"fmt"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/front-office/api/notification/handler"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

type NotifResolver interface {
	SavedNotifResolver(params graphql.ResolveParams) (interface{}, error)
	FindNotifResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllNotifResolver(params graphql.ResolveParams) (interface{}, error)
}

type resolverNotif struct {
	notifHandler handler.UsecaseNotif
}

func NewNotifResolver(notifUseCase handler.UsecaseNotif) NotifResolver {
	return &resolverNotif{
		notifHandler: notifUseCase,
	}
}

func (r *resolverNotif) SavedNotifResolver(params graphql.ResolveParams) (interface{}, error) {
	idUser, _ := params.Args["idUser"].(string)
	titleNotif, _ := params.Args["title"].(string)
	content, _ := params.Args["content"].(string)

	r.notifHandler.SavedNotifHandler(idUser,titleNotif,content)

	return "Ok",nil
}

func (r *resolverNotif) FindNotifResolver(params graphql.ResolveParams) (interface{}, error) {
	idUser, _ := params.Args["idUser"].(string)
	idNotif, _ := params.Args["idQuery"].(string)
	notif,err := r.notifHandler.FindNotifHandler(idUser,idNotif)

	if err != nil {
		return nil,err
	}

	return notif,nil
}

func (r *resolverNotif) FindAllNotifResolver(params graphql.ResolveParams) (interface{}, error) {
	idUser, _ := params.Args["idUser"].(string)
	notif,err :=  r.notifHandler.FindAllNotifHandler(idUser)

	if err != nil {
		return nil,err
	}

	return notif,nil
}