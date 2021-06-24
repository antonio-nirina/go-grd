package handler

import (
	"github.com/thoussei/antonio/front-office/api/user/entity"
)

type Usecase interface {
	SavedUser(user *entity.User) (interface{}, error)
	FindOneUser(idQuery string) (interface{}, error)
	FindUserByEmail(email string) (entity.User, error)
	FindUserByUsername(email string) (entity.User, error)
	// GetToken(user *entity.User) (interface{}, error)
	FindAllUser() ([]entity.User, error)
	UpdatedUser(user *entity.User) (interface{}, error)
	UpdatedTokenUser(email string,token string) (interface{}, error)
	FindUserByToken(token string) (entity.User, error)
	UpdateAvatar(user entity.User,avatar string,typeFile string) (interface{}, error)
	FindOneUserById(idQuery string) (entity.User, error)
	AddFriend(req *entity.Friends) (interface{}, error)
	// NotifUserSender(user *entity.User) (interface{}, error)
	FindOneUserByUid(idQuery string) (entity.User, error)
	UpdatedUserFriend(userSender entity.User,userReq entity.User) (interface{}, error)
}