package handler

import (
	"sync"

	"github.com/thoussei/antonio/api/notification/entity"
	"github.com/thoussei/antonio/api/notification/repository"
	userEntity "github.com/thoussei/antonio/api/user/entity"
	"github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UsecaseNotif interface {
	SavedNotifHandler(user userEntity.User,userReq userEntity.User,title string,content string,typeNotification int) (int64, error)
	FindNotifHandler(idUser string,idQuery string) (interface{}, error)
	FindAllNotifHandler(idUser string) ([]notifViewModel, error)
	FindOneByUidNotifHandler(uid string) (entity.Notification, error)
	UpdatedStatutNotifHandler(uid string) (interface{}, error)
}

type notifUsecase struct {
	notifRepository repository.RepositoryNotif
}

func NewUsecaseNotif(r repository.RepositoryNotif) UsecaseNotif {
	return &notifUsecase{
		notifRepository: r,
	}
}

type notifViewModel struct {
	Uid           	string  `json:"uid"`
	Title     		string  `json:"title"`
	Type     		int  `json:"type"`
	Content      	string  `json:"content"`
	Statut 			bool `json:"statut"`
	UserRequest 	userRequest `json:"userRequest"`
	User 			userRequest `json:"user"`
}

type userRequest struct {
	Uid           string 			 `json:"uid"`
	FirstName     string             `json:"firstname,omitempty"`
	LastName      string             `json:"lastname,omitempty"`
	Email         string             `json:"email"`
	Username      string             `json:"username"`
	IsBanned      bool               `json:"isBanned"`
	Avatar        string             `json:"avatar,omitempty"`
	Language      string             `json:"language,omitempty"`
	Point         int                `json:"point"`
	Roles      	 []string             `json:"roles"`
	TypeConnexion   string            `json:"type_connexion"`
	Created 		string 			`json:"created"`
}


func (r *notifUsecase) SavedNotifHandler(user userEntity.User,userReq userEntity.User,title string,content string,typeNotification int) (int64, error) {
	var wg sync.WaitGroup
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

	wg.Add(1)
	go handler.NotifUserSender(&user,&userReq,notify.Uid.Hex(),count,&wg)
	wg.Wait()

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

func (r *notifUsecase) FindAllNotifHandler(idUser string) ([]notifViewModel, error) {
	objectId, err := primitive.ObjectIDFromHex(idUser)

	if err != nil {
		return nil, err
	}
	var notifs = []notifViewModel{}
	result, err := r.notifRepository.FindAllNotifRepo(objectId)

	if err != nil {
		return nil, err
	}

	for _,val := range result {
		objNotif := notifViewModel{
			Uid: val.Uid.Hex(),
			Title: val.Title,     		
			Type:val.Type,    		
			Content:val.Content,     	
			Statut:val.Statut,
			UserRequest:userRequest{
				Uid:val.UserRequest.Uid.Hex(),
				FirstName:val.UserRequest.FirstName,
				LastName:val.UserRequest.LastName,          
				Email :val.UserRequest.Email,        
				Username:val.UserRequest.Username,      
				IsBanned:val.UserRequest.IsBanned,      
				Avatar:val.UserRequest.Avatar,        
				Language:val.UserRequest.Language,      
				Point :val.UserRequest.Point,        
				Roles:val.UserRequest.Roles,      	 
				TypeConnexion:val.UserRequest.TypeConnexion,   
				Created:val.UserRequest.Created, 		
			} ,	
			User:userRequest{
				Uid:val.UserRequest.Uid.Hex(),
				FirstName:val.User.FirstName,     
				LastName:val.User.LastName,          
				Email :val.User.Email,        
				Username:val.User.Username,      
				IsBanned:val.User.IsBanned,      
				Avatar:val.User.Avatar,        
				Language:val.User.Language,      
				Point :val.User.Point,        
				Roles:val.User.Roles,      	 
				TypeConnexion:val.User.TypeConnexion,   
				Created:val.User.Created, 		
			},			

		}
		notifs = append(notifs,objNotif)
	}
	return notifs,nil
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

func (r *notifUsecase) UpdatedStatutNotifHandler(uid string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(uid)

	if err != nil {
		return nil, err
	}
	 
	_,err = r.notifRepository.UpdatedStatutNotification(objectId)
	
	if err != nil {
		return nil, err
	}

	return "Ok",nil
}