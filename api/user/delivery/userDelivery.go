package delivery

import (
	"encoding/base64"
	"encoding/json"
	"errors"

	// "fmt"
	"os"
	"sync"
	"time"

	_jwt "github.com/dgrijalva/jwt-go"
	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	uuid "github.com/satori/go.uuid"
	"github.com/thoussei/antonio/api/external"
	game "github.com/thoussei/antonio/api/games/entity"
	notifH "github.com/thoussei/antonio/api/notification/handler"
	"github.com/thoussei/antonio/api/user/entity"
	"github.com/thoussei/antonio/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserResponse struct {
	Uid           string             `json:"uid"`
	FirstName     string             `json:"firstname,omitempty"`
	LastName      string             `json:"lastname,omitempty"`
	Password      string             `json:"password"`
	Email         string             `json:"email"`
	Username      string             `json:"username"`
	IsBanned      bool               `json:"isBanned"`
	Avatar        string             `json:"avatar,omitempty"`
	Language      string             `json:"language,omitempty"`
	IdGameAccount []game.GameAccount `json:"idGameAccount,omitempty"`
	Point         int                `json:"point"`
	Roles         []string           `json:"roles"`
	TypeConnexion string             `json:"type_connexion"`
	Created       string             `json:"created"`
	Records       int                `json:"records"`
}

type resolver struct {
	userHandler  handler.Usecase
	notifHandler notifH.UsecaseNotif
}

type AuthType struct {
	token interface{}
}

func NewResolver(userUseCase handler.Usecase, usecaseNotif notifH.UsecaseNotif) Resolver {
	return &resolver{
		userHandler:  userUseCase,
		notifHandler: usecaseNotif,
	}
}

type inputRegister struct {
	UserInput inputElements `json:"userInput"`
}

type inputElements struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

var roles = []string{"role_user"}
var userEntity = entity.User{}

func (r *resolver) SavedUserResolver(params graphql.ResolveParams) (interface{}, error) {
	jsonString, _ := json.Marshal(params.Args)
	input := inputRegister{}
	json.Unmarshal([]byte(jsonString), &input)

	hashed := userEntity.CreatedHash(input.UserInput.Password)
	check, _ := r.ValidateUserResolver(&input)

	if check {
		return nil, errors.New("email or username already existe")
	}
	userSaved := &entity.User{
		Uid:           primitive.NewObjectID(),
		FirstName:     "",
		LastName:      "",
		Password:      hashed,
		Username:      input.UserInput.Username,
		Email:         input.UserInput.Email,
		IsBanned:      false,
		Avatar:        "",
		Language:      "fr",
		Point:         entity.POINT,
		IdGameAccount: []game.GameAccount{},
		Roles:         roles,
		TypeConnexion: "site",
		Created:       time.Now().Format(time.RFC3339),
		Friends:       []entity.User{},
		Country:       "France",
		BirtDate:      "",
	}

	res, err := r.userHandler.SavedUser(userSaved)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *resolver) FindOneUserResolver(params graphql.ResolveParams) (interface{}, error) {
	idQuery, isOK := params.Args["id"].(string)

	if !isOK {
		return nil, errors.New("id not valid")
	}

	res, err := r.userHandler.FindOneUser(idQuery)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *resolver) ValidateUserResolver(input *inputRegister) (bool, error) {
	email := input.UserInput.Email
	username := input.UserInput.Username
	res, _ := r.userHandler.FindUserByEmail(email)

	if res.Email != "" {
		return true, nil
	}

	if username != "" {
		resUsername, _ := r.userHandler.FindUserByUsername(username)
		if resUsername.Username != "" {
			return true, nil
		}
	}

	return false, nil
}

func (r *resolver) AuthUserResolver(params graphql.ResolveParams) (interface{}, error) {
	var wg sync.WaitGroup
	email := params.Args["email"].(string)
	password := params.Args["password"].(string)
	res, err := r.userHandler.FindUserByEmail(email)

	if err != nil {
		resUsername, err := r.userHandler.FindUserByUsername(email)
		if err != nil {
			return "", errors.New("Email or username not found")
		}
		res = resUsername
	}

	err = userEntity.VerifyPassword(password, res.Password)

	if err != nil {
		return "", errors.New("wrong password")
	}

	token, err := GetToken(res)

	if err != nil {
		return "", errors.New("Error interne try after an moment")
	}
	wg.Add(1)
	go r.userHandler.NotifConnected(&res, &wg)
	wg.Wait()
	return token, nil
}

func (r *resolver) ForgotResolver(params graphql.ResolveParams) (interface{}, error) {
	email := params.Args["email"].(string)
	res, err := r.userHandler.FindUserByEmail(email)
	if err != nil {
		return "error", nil
	}
	data := make(map[string]string)
	u := uuid.NewV4()
	encoded := base64.StdEncoding.EncodeToString([]byte(u.String()))
	data["token"] = encoded
	_, err = r.userHandler.UpdatedTokenUser(email, encoded)

	if err != nil {
		return "error", nil
	}

	name := ""
	if res.FirstName != "" {
		name = res.FirstName
	} else {
		name = res.Username
	}

	subject := "Mot de pass oublie"
	text := "Tu as oublié ton mot de passe ?"
	data["msg"] = "Clique ici pour re-initialiser votre password"

	if res.Language == "en" {
		subject = "Forgot password"
		text = "Are you forgot your password ?"
		data["msg"] = "Click here for init your password"
	}

	message := "Hello " + name + "\n" + text
	to := external.ToMailer{
		Firstname: res.FirstName,
		Lastname:  res.LastName,
		Email:     res.Email,
		Subject:   subject,
		Message:   message,
	}

	_, err = to.Sender(data)

	if err != nil {
		external.Logger("[MAILER] Email send failure via Mailjet")
	}

	return "Ok", nil
}

func (r *resolver) DeconnectedResolver(params graphql.ResolveParams) (interface{}, error) {
	var wg sync.WaitGroup
	uid := params.Args["id"].(string)
	res, err := r.userHandler.FindOneUserByUid(uid)
	if err != nil {
		return "error", nil
	}
	wg.Add(1)
	go r.userHandler.NotifDisConnected(&res, &wg)
	wg.Wait()

	return "Ok", nil
}

func (r *resolver) GetAllUser(params graphql.ResolveParams) (interface{}, error) {
	idUserConnected, isOKReq := params.Args["idUserConnected"].(string)
	var res []UserResponse
	if !isOKReq {
		return nil, errors.New("id not valid")
	}

	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0 {
		pageNumber = 1
	}

	userC, err := r.userHandler.FindOneUserByUid(idUserConnected)
	users, err := r.userHandler.FindAllUser(int64(pageNumber), int64(limit))

	if err != nil {
		return nil, err
	}

	userList := &UserResponse{}

	for _, user := range users {
		found := false

		if len(userC.Friends) > 0 {
			for _, uc := range userC.Friends {
				if uc.Uid.Hex() == user.Uid.Hex() {
					found = true
				}
			}
		}

		if !found {
			userList.Uid = user.Uid.Hex()
			userList.FirstName = user.FirstName
			userList.LastName = user.LastName
			userList.Username = user.Username
			userList.Email = user.Email
			userList.IsBanned = user.IsBanned
			userList.Avatar = user.Avatar
			userList.Language = user.Language
			userList.Point = user.Point
			userList.IdGameAccount = user.IdGameAccount
			userList.Roles = user.Roles
			userList.TypeConnexion = user.TypeConnexion
			userList.Created = user.Created
			userList.Records = r.userHandler.CountUserHandler()
			res = append(res, *userList)
		}
	}

	return res, nil
}

func GetToken(user entity.User) (interface{}, error) {
	err := godotenv.Load()

	if err != nil {
		return "", errors.New("Error interne")
	}

	dateBirth := ""
	country := "France"
	if user.BirtDate != "" {
		dateBirth = user.BirtDate
	}

	if user.Country != "" {
		country = user.Country
	}

	var frd = []string{}
	claims := _jwt.MapClaims{}
	claims["uid"] = user.Uid.Hex()
	claims["email"] = user.Email
	claims["avatar"] = user.Avatar
	claims["firstname"] = user.FirstName
	claims["language"] = user.Language
	claims["lastname"] = user.LastName
	claims["username"] = user.Username
	claims["created"] = user.Created
	claims["roles"] = user.Roles
	claims["birtDate"] = dateBirth
	claims["country"] = country

	if len(user.Friends) > 0 {
		for _, v := range user.Friends {
			frd = append(frd, v.Uid.Hex())
		}
	}

	claims["friends"] = frd
	// claims["exp"] = time.Now().Add(time.Hour * 1).Unix() //Token expires after 1 hour
	token := _jwt.NewWithClaims(_jwt.SigningMethodHS256, claims)
	result, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		return "", errors.New("Error interne")
	}

	return result, nil
}
