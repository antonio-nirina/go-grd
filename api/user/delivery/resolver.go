package delivery

import (
	"encoding/json"
	"errors"
	"os"
	"time"

	_jwt "github.com/dgrijalva/jwt-go"
	"github.com/graphql-go/graphql"
	"github.com/joho/godotenv"
	uuid "github.com/satori/go.uuid"
	"github.com/thoussei/antonio/main/front-office/api/external"
	game "github.com/thoussei/antonio/main/front-office/api/games/entity"
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
	"github.com/thoussei/antonio/main/front-office/api/user/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Resolver interface {
	SavedUserResolver(params graphql.ResolveParams) (interface{}, error)
	FindOneUserResolver(params graphql.ResolveParams) (interface{}, error)
	AuthUserResolver(params graphql.ResolveParams) (interface{}, error)
	GetAccessTokenXboxApi(params graphql.ResolveParams) (interface{}, error)
	GetXboxProfil(params graphql.ResolveParams) (interface{}, error)
	UpdatedUserResolver(params graphql.ResolveParams) (interface{}, error)
	ForgotResolver(params graphql.ResolveParams) (interface{}, error)
}

type resolver struct {
	userHandler handler.Usecase
}

type AuthType struct {
	token interface{}
}

func NewResolver(userUseCase handler.Usecase) Resolver {
	return &resolver{
		userHandler: userUseCase,
	}
}

type inputRegister struct {
	UserInput inputElements `json:"userInput"`
}

type inputElements struct {
	Email string `json:"email"`
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
		Roles: 	roles,
		TypeConnexion:"site",
		Created: time.Now().Format(time.RFC3339),		
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

	return token, nil
}

func (r *resolver)ForgotResolver(params graphql.ResolveParams) (interface{}, error) {
	email := params.Args["email"].(string)
	res, err := r.userHandler.FindUserByEmail(email)

	if err != nil {
		return "error",nil
	}

	name := ""
	if res.FirstName != "" {
		name = res.FirstName	
	} else {
		name = res.Username
	}
	subject := "Mot de pass oublie"
	text := "Tu as oublié ton mot de passe ?"
	if res.Language == "en" {
		subject = "Forgot password"
		text = "Are you forgot your password ?"
	}

	message := "Hello "+name+"\n"+text
	to := external.ToMailer{
		Firstname: res.FirstName,
		Lastname: res.LastName,
		Email: res.Email,
		Subject: subject,
		Message: message,
	}
	data := make(map[string]string)
	u := uuid.NewV4()
	data["token"] =  u.String()
	_,err = to.Sender(data)

	if err != nil {
		external.Logger("[MAILER] Email send failure via Mailjet")
	}
	
	return "Ok",nil
}

func GetToken(user entity.User) (interface{}, error) {
	err := godotenv.Load()

	if err != nil {
		return "", errors.New("Error interne")
	}

	claims 				:= _jwt.MapClaims{}
	claims["email"] 	= user.Email
	claims["avatar"] 	= user.Avatar
	claims["firstname"] = user.FirstName
	claims["language"] 	= user.Language
	claims["lastname"] 	= user.LastName
	claims["username"] 	= user.Username
	claims["created"] 	= user.Created
	claims["id"] 		= user.Uid.String()
	// claims["exp"] = time.Now().Add(time.Hour * 1).Unix() //Token expires after 1 hour
	token := _jwt.NewWithClaims(_jwt.SigningMethodHS256, claims)
	result, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		return "", errors.New("Error interne")
	}

	return result, nil
}
