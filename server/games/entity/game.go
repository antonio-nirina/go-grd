package entity

// primitive.NewObjectID()
type Game struct {
	Uid         string `json:"uid"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type GamePlatform struct {
	Uid         string `json:"uid"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type AccountGame struct {
	Uid       string       `json:"uid"`
	Name      string       `json:"name"`
	Logo      string       `json:"logo"`
	Game      Game         `json:"game"`
	Plateform GamePlatform `json:"plateform"`
}
