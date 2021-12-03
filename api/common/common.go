package common

type GameViewModel struct {
	Uid   string `json:"uid"`
	Name  string `json:"name"`
	Image string `json:"image"`
	Logo  string `json:"logo"`
	Slug  string `json:"slug"`
}

type PlateformViewModel struct {
	Uid         string `json:"uid"`
	Name        string `json:"name"`
	Description string `json:"description"`
}