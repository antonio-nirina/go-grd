package delivery

import (
	"encoding/json"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/home/entity"
	"github.com/thoussei/antonio/api/home/handler"
	gameUseCase "github.com/thoussei/antonio/api/games/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type inputAddHome struct {
	HomeInput homeInputEl `json:"homeInput"`
}

type homeInputEl struct {
	Name string `json:"name"`
	Image string `json:"image"`
	ImageType string `json:"imageType"`
	ImageGameType string `json:"imageGameType"`
	ImageGame string `json:"imageGame"`
	Content [] homeElements `json:"content"`
}

type homeElements struct {
	Title string `json:"title"`
	TitleUnder string `json:"titleUnder"`
	Incontent string `json:"incontent"`
}


type HomeResolver interface {
	SavedHomeResolver(params graphql.ResolveParams) (interface{}, error)
	FindHomeResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllHomeResolver(params graphql.ResolveParams) (interface{}, error)
	RemovedHomeByResolver(params graphql.ResolveParams) (interface{}, error)
}

type home struct {
	homeHandler handler.UsecaseHome
	gameUseCase gameUseCase.UsecaseGameInterface
}

func NewResolverHome(homeUseCase handler.UsecaseHome,usecase gameUseCase.UsecaseGameInterface) HomeResolver {
	return &home{
		homeHandler: homeUseCase,
		gameUseCase:usecase,
	}
}

func (a *home) SavedHomeResolver(params graphql.ResolveParams) (interface{}, error){
	var cnts [] entity.HomeContent
	jsonString, _ := json.Marshal(params.Args)
	inputs := inputAddHome{}
	json.Unmarshal([]byte(jsonString), &inputs)

	for _,val := range inputs.HomeInput.Content{
		cnts = append(cnts,entity.HomeContent{Title:val.Title,TitleUnder:val.TitleUnder,Incontent:val.Incontent})
	}

	urlGame,err := a.gameUseCase.HandleFileGame(params.Args["imageGame"].(string),params.Args["imageGameType"].(string))
	urlImage,err := a.gameUseCase.HandleFileGame(params.Args["image"].(string),params.Args["imageType"].(string))

	if err != nil {
		return nil, err
	}

	home := &entity.Home{
		Uid: primitive.NewObjectID(),
		Name:inputs.HomeInput.Name,
		Content:cnts,
		Image:urlImage,
		ImageGame:urlGame,  			
	}

	res,err := a.homeHandler.SavedHomeandler(home)

	if err != nil {
		return nil, err
	}

	return res,nil
}

func (t *home) FindHomeResolver(params graphql.ResolveParams) (interface{}, error){
	uidHome, _ := params.Args["uid"].(string)
	home,err := t.homeHandler.FindHomeHandler(uidHome)

	if err != nil {
		return nil,err
	}

	return home,nil
}

func (t *home) FindAllHomeResolver(params graphql.ResolveParams) (interface{}, error){
	limit, _ := params.Args["limit"].(int)
	pageNumber, _ := params.Args["pageNumber"].(int)

	if pageNumber == 0 && limit > 0{
		pageNumber = 1
	}

	homes,err :=  t.homeHandler.FindAllHomeHandler(int64(pageNumber),int64(limit))

	if err != nil {
		return nil,err
	}

	return homes,nil
}

func (t *home) RemovedHomeByResolver(params graphql.ResolveParams) (interface{}, error){
	uid, _ := params.Args["uid"].(string)
	_,err :=  t.homeHandler.FindHomeHandler(uid)
	
	if err != nil {
		return nil,err
	}
	 

	asist,err := t.homeHandler.RemovedHomeHandler(uid)

	return asist,nil
}