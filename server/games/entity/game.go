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

type GameAccount struct {
	Uid       string      `json:"uid"`
	IdAccount string      `json:"idAccount"`
	Account   AccountGame `json:"account"`
}

type GameSchema struct {
	Uid         string
	Name        string
	Description string
}

type GamePlatformSchema struct {
	Uid         string
	Name        string
	Description string
}

type AccountGameSchema struct {
	Uid       string
	Name      string
	Logo      string
	Game      GameSchema
	Plateform GamePlatformSchema
}

type GameAccountSchema struct {
	Uid       string
	IdAccount string
	Account   AccountGameSchema
}
