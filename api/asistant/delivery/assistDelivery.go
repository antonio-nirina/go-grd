package delivery

import (
	"strings"
	"unicode"

	"github.com/graphql-go/graphql"
	"github.com/thoussei/antonio/api/asistant/entity"
	"github.com/thoussei/antonio/api/asistant/handler"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"golang.org/x/text/runes"
	"golang.org/x/text/transform"
	"golang.org/x/text/unicode/norm"
)


type AsistResolver interface {
	SavedAsistResolver(params graphql.ResolveParams) (interface{}, error)
	SavedSubjectResolver(params graphql.ResolveParams) (interface{}, error)
	FindAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindSubjectResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllAsistResolver(params graphql.ResolveParams) (interface{}, error)
	FindAllSubjectResolver(params graphql.ResolveParams) (interface{}, error)
	FindAssistBySubjectResolver(params graphql.ResolveParams) (interface{}, error)
	// UpdatedAsistByUseResolver(params graphql.ResolveParams) (interface{}, error)
}

type asist struct {
	asistHandler handler.UsecaseAsist
}

func NewResolverAsist(asistUseCase handler.UsecaseAsist) AsistResolver {
	return &asist{
		asistHandler: asistUseCase,
	}
}

func (h *asist) SavedAsistResolver(params graphql.ResolveParams) (interface{}, error){
	titleUid, _ := params.Args["title"].(string)
	content, _ := params.Args["content"].(string)
	underTitle, _ := params.Args["underTitle"].(string)
	locationHome, _ := params.Args["location"].(string)
	title,err := h.asistHandler.FindSubjectHandler(titleUid)

	if err != nil {
		return nil,err
	}

	uid,_:= primitive.ObjectIDFromHex(title.Uid)
	newTitle := entity.Subject{
		Uid:uid,       
		Title:title.Title,
		Description:title.Description,
		Tag:title.Tag,
	}

	asist := &entity.Asistant{
		Uid: primitive.NewObjectID(),
		Title:newTitle,
		Location:locationHome,
		Content:content, 
		UnderTitle:underTitle,
		Statut:true,    			
	}

	res,err := h.asistHandler.SavedAsistHandler(asist)

	if err != nil {
		return nil, err
	}

	return res,nil
}

func (h *asist) SavedSubjectResolver(params graphql.ResolveParams) (interface{}, error) {
	title, _ := params.Args["title"].(string)
	description, _ := params.Args["description"].(string)
	t := transform.Chain(norm.NFD, runes.Remove(runes.In(unicode.Mn)), norm.NFC)
	result, _, _ := transform.String(t, title)

	subject := &entity.Subject{
		Uid: primitive.NewObjectID(),
		Title:title,
		Description:description,
		Statut:true, 
		Tag:strings.Replace(result," ","_",-1),			
	}

	res,err := h.asistHandler.SavedSubjectHandler(subject)

	if err != nil {
		return nil, err
	}

	return res,nil
}

func (h *asist) FindAsistResolver(params graphql.ResolveParams) (interface{}, error){
	idHome, _ := params.Args["uid"].(string)
	home,err := h.asistHandler.FindAsistHandler(idHome)

	if err != nil {
		return nil,err
	}

	return home,nil
}

func (h *asist) FindSubjectResolver(params graphql.ResolveParams) (interface{}, error){
	id, _ := params.Args["uid"].(string)
	subject,err := h.asistHandler.FindSubjectHandler(id)

	if err != nil {
		return nil,err
	}

	return subject,nil
}

func (h *asist) FindAllAsistResolver(params graphql.ResolveParams) (interface{}, error){
	assists,err :=  h.asistHandler.FindAllAsistHandler()

	if err != nil {
		return nil,err
	}

	return assists,nil
}

func (h *asist) FindAllSubjectResolver(params graphql.ResolveParams) (interface{}, error){
	subjects,err :=  h.asistHandler.FindAllSubjectHandler()

	if err != nil {
		return nil,err
	}

	return subjects,nil
}

func (h *asist) FindAssistBySubjectResolver(params graphql.ResolveParams) (interface{}, error) {
	assists,err :=  h.asistHandler.FindAllAsistBySubjectHandler()

	if err != nil {
		return nil,err
	}

	return assists,nil
}

/*func (h *home) UpdatedHomeByUseResolver(params graphql.ResolveParams) (interface{}, error){
	uid, _ := params.Args["uid"].(string)
	home,err :=  h.homeHandler.FindHomeHandler(uid)

	if err != nil {
		return nil,err
	}

	_,err = h.homeHandler.UpdatedHomeHandler(uid)

	return home,nil
}*/