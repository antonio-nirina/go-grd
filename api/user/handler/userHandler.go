package handler

/**
* Usecase
*/

import (
	"fmt"
	"io/ioutil"

	uuid "github.com/satori/go.uuid"
	"github.com/thoussei/antonio/main/front-office/api/external"
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
	"github.com/thoussei/antonio/main/front-office/api/user/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type userUsecase struct {
	userRepository repository.Repository
}

func NewUsecaseUser(r repository.Repository) Usecase {
	return &userUsecase{
		userRepository: r,
	}
}

func (u *userUsecase) SavedUser(user *entity.User) (interface{}, error) {
	result, err := u.userRepository.SavedUser(user)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUsecase) FindOneUser(idQuery string) (interface{}, error) {
	objectId, err := primitive.ObjectIDFromHex(idQuery)

	if err != nil {
		return nil, err
	}

	user, err := u.userRepository.FindOneUser(objectId)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userUsecase) FindAllUser() (interface{}, error) {
	result, err := u.userRepository.FindAllUser()

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUsecase) FindUserByEmail(email string) (entity.User, error) {
	user, err := u.userRepository.FindUserByEmail(email)

	if err != nil {
		return entity.User{}, err
	}

	return user, nil
}

func (u *userUsecase) FindUserByUsername(email string) (entity.User, error) {
	user, err := u.userRepository.FindUserByUsername(email)

	if err != nil {
		return entity.User{}, err
	}

	return user, nil
}

func (u *userUsecase) UpdatedUser(user *entity.User) (interface{}, error) {
	result, err := u.userRepository.UpdatedUser(user)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUsecase) UpdatedTokenUser(email string,token string) (interface{}, error) {
	result, err := u.userRepository.UpdatedTokenUser(email,token)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func (u *userUsecase) FindUserByToken(token string) (entity.User, error) {
	result, err := u.userRepository.FindUserByToken(token)

	if err != nil {
		return entity.User{}, err
	}

	return result, nil
}

func (u *userUsecase) UpdateAvatar(user entity.User,avatar string,typeFile string) (interface{}, error)  {
	upl := &external.FileUpload{}
	path := "/tmpFile"
	upl.Path = path

	if !upl.DirectoryExists() {
		err := upl.CreateDirectory()

		if err != nil {
			return nil, err
		}
	}
	
	upl.Filename = (uuid.NewV4()).String()+"."+typeFile
	err := ioutil.WriteFile(fmt.Sprintf("%s,%s",path,upl.Filename), []byte(avatar), 0755)
	
	if err != nil {
		return nil, err
	}
	resfile,err := upl.SenderFile()

	if resfile != "" {
		userToUpdated := &entity.User{
			Uid:           	user.Uid,
			FirstName:     	user.FirstName,
			LastName:      	user.LastName,
			Password:      	user.Password,
			Username:      	user.Username,
			Email:         	user.Email,
			IsBanned:      	user.IsBanned,
			Avatar:        	resfile,
			Language:      	user.Language,
			Point:         	user.Point,
			IdGameAccount: 	user.IdGameAccount,
			Roles: 			user.Roles,
			TypeConnexion:	user.TypeConnexion,
			Created: 		user.Created,		
		}
		
		result, err := u.userRepository.UpdatedUser(userToUpdated)
	
		if err != nil {
			return nil, err
		}
	
		return result, nil
	}

	return nil, err
}

