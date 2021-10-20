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
	Username  string `json:"username"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Language  string `json:"language"`
	Email     string `json:"email"`
	Country   string `json:"country"`
	BirtDate  string `json:"birtDate"`
}

type inputAvatar struct {
	AvatarInput avatarElement `json:"avatarInput"`
}
type avatarElement struct {
	Type  string `json:"type"`
	Data  string `json:"data"`
	Email string `json:"email"`
}

type inputGame struct {
	UidGame      []string `json:"uidgame"`
	UidPlateform []string `json:"uidPlateform"`
	UidUser      string   `json:"uidUser"`
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

	country := res.Country
	if input.UserUpated.Country != "" {
		country = input.UserUpated.Country
	}

	birtDate := res.BirtDate
	if input.UserUpated.BirtDate != "" {
		country = input.UserUpated.BirtDate
	}

	userToUpdated := &entity.User{
		Uid:           res.Uid,
		FirstName:     firtsnameUp,
		LastName:      lastnameUp,
		Password:      res.Password,
		Username:      usernameUp,
		Email:         input.UserUpated.Email,
		IsBanned:      res.IsBanned,
		Avatar:        res.Avatar,
		Language:      langUp,
		Point:         res.Point,
		IdGameAccount: res.IdGameAccount,
		Roles:         res.Roles,
		TypeConnexion: res.TypeConnexion,
		Created:       res.Created,
		Country:       country,
		BirtDate:      birtDate,
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
		return "error", nil
	}
	hashedPwd := userEntity.CreatedHash(newPwd)
	userToUpdated := &entity.User{
		Uid:           res.Uid,
		FirstName:     res.FirstName,
		LastName:      res.LastName,
		Password:      hashedPwd,
		Username:      res.Username,
		Email:         res.Email,
		IsBanned:      res.IsBanned,
		Avatar:        res.Avatar,
		Language:      res.Language,
		Point:         res.Point,
		IdGameAccount: res.IdGameAccount,
		Roles:         res.Roles,
		TypeConnexion: res.TypeConnexion,
		Created:       res.Created,
	}
	_, err = r.userHandler.UpdatedUser(userToUpdated)

	if err != nil {
		return nil, err
	}

	return "Ok", nil
}

func (r *resolver) UpdateAvatarResolver(params graphql.ResolveParams) (interface{}, error) {
	jsonString, _ := json.Marshal(params.Args)
	input := inputAvatar{}
	json.Unmarshal([]byte(jsonString), &input)
	user, err := r.userHandler.FindUserByEmail(input.AvatarInput.Email)

	if err != nil {
		return nil, err
	}

	res, err := r.userHandler.UpdateAvatar(user, input.AvatarInput.Data, input.AvatarInput.Type)

	if err != nil {
		return nil, err
	}

	return res, nil

}

func (r *resolver) UpdatedGameResolver(params graphql.ResolveParams) (interface{}, error) {
	jsonString, _ := json.Marshal(params.Args)
	input := inputGame{}
	json.Unmarshal([]byte(jsonString), &input)
	var listGameUid []string
	var listPlateformUid []string

	for _, val := range input.UidGame {
		game, err := r.gameHandler.FindOneGameByUidHandler(val)
		if err != nil {
			return nil, err
		}
		listGameUid = append(listGameUid, game.Uid.Hex())
	}

	for _, val := range input.UidGame {
		plateform, err := r.plateformHandler.FindOnePlateformByUidHandler(val)
		if err != nil {
			return nil, err
		}
		listPlateformUid = append(listPlateformUid, plateform.Uid.Hex())
	}

	res, err := r.userHandler.UpdateGameUser(input.UidUser, listGameUid, listPlateformUid)

	if err != nil {
		return nil, err
	}

	return res, nil
}
