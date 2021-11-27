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
	userHandler handler.Usecase
}

func NewUsecaseNotif(r repository.RepositoryNotif,u handler.Usecase) UsecaseNotif {
	return &notifUsecase{
		notifRepository: r,
		userHandler: u,
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
		User:user.Uid.Hex(),
		UserRequest: userReq.Uid.Hex(),			
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

	if len(result) > 0 {
		for _,val := range result {
			userReq,_ := r.userHandler.FindOneUserByUid(val.UserRequest)
			user,_ := r.userHandler.FindOneUserByUid(val.User)
			objNotif := notifViewModel{
				Uid: val.Uid.Hex(),
				Title: val.Title,     		
				Type:val.Type,    		
				Content:val.Content,     	
				Statut:val.Statut,
				UserRequest:userRequest{
					Uid:userReq.Uid.Hex(),
					FirstName:userReq.FirstName,
					LastName:userReq.LastName,          
					Email :userReq.Email,        
					Username:userReq.Username,      
					IsBanned:userReq.IsBanned,      
					Avatar:userReq.Avatar,        
					Language:userReq.Language,      
					Point :userReq.Point,        
					Roles:userReq.Roles,      	 
					TypeConnexion:userReq.TypeConnexion,   
					Created:userReq.Created, 		
				} ,	
				User:userRequest{
					Uid:user.Uid.Hex(),
					FirstName:user.FirstName,     
					LastName:user.LastName,          
					Email :user.Email,        
					Username:user.Username,      
					IsBanned:user.IsBanned,      
					Avatar:user.Avatar,        
					Language:user.Language,      
					Point :user.Point,        
					Roles:user.Roles,      	 
					TypeConnexion:user.TypeConnexion,   
					Created:user.Created, 		
				},			
	
			}
			notifs = append(notifs,objNotif)
		}
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