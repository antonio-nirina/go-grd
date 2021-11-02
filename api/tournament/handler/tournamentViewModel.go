package handler

type tournamentViewModel struct {
	Uid               string               `json:"uid"`
	Title             string               `json:"title"`
	DateDebut         string               `json:"dateDebut"`
	Description       string               `json:"description"`
	Statut            bool                 `json:"statut"`
	NumberParticipate int                  `json:"numberParticipate"`
	NumberTeam        int                  `json:"numberTeam"`
	Price             float64              `json:"price"`
	DeadlineDate      string               `json:"deadlineDate"`
	PriceParticipate  float64              `json:"priceParticipate"`
	Game              GameViewModel        `json:"game"`
	Plateform         []PlateformViewModel `json:"plateform"`
	Info              string               `json:"info"`
	Rules             string               `json:"rules"`
	IsPublic          bool                 `json:"isPublic"`
	IsTeam            bool                 `json:"isTeam"`
	Records           int                  `json:"records"`
	Format            string               `json:"format"`
	Server            string               `json:"server"`
	Tchat             string               `json:"tchat"`
	Winners           []string             `json:"winners"`
	Region            string               `json:"region,omitempty"`
	Spectateur        string               `json:"spectateur"`
}

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

type TournamentViewModel struct {
	Uid               string               `json:"uid"`
	Title             string               `json:"title"`
	DateDebut         string               `json:"dateDebut"`
	Description       string               `json:"description"`
	Statut            bool                 `json:"statut"`
	NumberParticipate int                  `json:"numberParticipate"`
	NumberTeam        int                  `json:"numberTeam"`
	Price             float64              `json:"price"`
	DeadlineDate      string               `json:"deadlineDate"`
	PriceParticipate  float64              `json:"priceParticipate"`
	Game              GameViewModel        `json:"game"`
	Plateform         []PlateformViewModel `json:"plateform"`
	Rules             string               `json:"rules"`
	IsPublic          bool                 `json:"isPublic"`
	Format            string               `json:"format"`
	Server            string               `json:"server"`
	Tchat             string               `json:"tchat"`
	Winners           []string             `json:"winners"`
	Region            string               `json:"region,omitempty"`
	Spectateur        string               `json:"spectateur"`
}
