package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/user/entity"
)


type inputUpdated struct {
	UserUpated updatedElements `json:"userUpated"`
}

type updatedElements struct {
	Username string 	`json:"username"`
	Firstname string 	`json:"firstname"`
	Lastname string 	`json:"lastname"`
	Language string 	`json:"language"`
	Email string 		`json:"email"`
}

type inputAvatar struct {
	AvatarInput avatarElement  `json:"avatarInput"`
}
type avatarElement struct {
	Type string `json:"type"`
	Data string `json:"data"`
	Email string `json:"email"`
}

func (r *resolver) UpdatedUserResolver(params graphql.ResolveParams) (interface{}, error) {
	jsonString, _ := json.Marshal(params.Args)
	input := inputUpdated{}
	json.Unmarshal([]byte(jsonString), &input)
	res, _ := r.userHandler.FindUserByEmail(input.UserUpated.Email)
	usernameUp := res.Username

	if input.UserUpated.Username != "" {
		usernameUp = input.UserUpated.Username
	}

	langUp := res.Language
	
	if input.UserUpated.Language != "" {
		langUp = input.UserUpated.Language
	}
	
	firtsnameUp := res.FirstName
	if input.UserUpated.Firstname != "" {
		firtsnameUp = input.UserUpated.Firstname
	}
	
	lastnameUp := res.LastName
	if input.UserUpated.Lastname != "" {
		lastnameUp = input.UserUpated.Lastname
	}
	 
	userToUpdated := &entity.User{
		Uid:           	res.Uid,
		FirstName:     	firtsnameUp,
		LastName:      	lastnameUp,
		Password:      	res.Password,
		Username:      	usernameUp,
		Email:         	input.UserUpated.Email,
		IsBanned:      	res.IsBanned,
		Avatar:        	res.Avatar,
		Language:      	langUp,
		Point:         	res.Point,
		IdGameAccount: 	res.IdGameAccount,
		Roles: 			res.Roles,
		TypeConnexion:	res.TypeConnexion,
		Created: 		res.Created,		
	}
	_, err := r.userHandler.UpdatedUser(userToUpdated)
	newRes, _ := r.userHandler.FindUserByEmail(input.UserUpated.Email)
	
	if err != nil {
		return nil, err
	}

	return newRes, nil
}

func (r *resolver) UpdatePasswordResolver(params graphql.ResolveParams) (interface{}, error) {
	token := params.Args["token"].(string)
	newPwd := params.Args["newPassword"].(string)
	res, err := r.userHandler.FindUserByToken(token)
	
	if err != nil {
		return "error",nil
	}
	hashedPwd := userEntity.CreatedHash(newPwd)
	userToUpdated := &entity.User{
		Uid:           	res.Uid,
		FirstName:     	res.FirstName,
		LastName:      	res.LastName,
		Password:      	hashedPwd,
		Username:      	res.Username,
		Email:         	res.Email,
		IsBanned:      	res.IsBanned,
		Avatar:        	res.Avatar,
		Language:      	res.Language,
		Point:         	res.Point,
		IdGameAccount: 	res.IdGameAccount,
		Roles: 			res.Roles,
		TypeConnexion:	res.TypeConnexion,
		Created: 		res.Created,		
	}
	_, err = r.userHandler.UpdatedUser(userToUpdated)

	if err != nil {
		return nil, err
	}

	return "Ok",nil
}

func (r *resolver) UpdateAvatarResolver(params graphql.ResolveParams) (interface{}, error) {
	jsonString, _ := json.Marshal(params.Args)
	input := inputAvatar{}
	json.Unmarshal([]byte(jsonString), &input)
	user, err := r.userHandler.FindUserByEmail(input.AvatarInput.Email)
	
	if err != nil {
		return nil, err
	}

	res, err := r.userHandler.UpdateAvatar(user,input.AvatarInput.Data,input.AvatarInput.Type)

	if err != nil {
		return nil, err
	}

	return res,nil

}