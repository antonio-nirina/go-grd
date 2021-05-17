package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
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