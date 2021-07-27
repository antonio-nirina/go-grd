package handler


type tournamentViewModel struct {
	Uid           		string  `json:"uid"`
	Title     			string  `json:"title"`
	Date     			string  `json:"date"`
	Description      	string  `json:"description"`
	Statut 				bool `json:"statut"`
	NumberParticipate 	int `json:"numberParticipate"`
	NumberTeam 			int `json:"numberTeam"`
	Price     			float64  `json:"price"`
	DeadlineDate     	string  `json:"deadlineDate"`
	PriceParticipate    float64  `json:"priceParticipate"`
	Game 				GameViewModel `json:"game"`
	Plateform  			PlateformViewModel `json:"plateform"`
	Info				string            	`json:"info"`
	Rules   			string            	`json:"rules"`
	IsPublic 			bool `json:"isPublic"`
}

type GameViewModel struct {
	Uid string  `json:"uid"`
	Name     		string  `json:"name"`
	Image     		string  `json:"image"`
	Logo     		string  `json:"logo"`
	Slug     		string  `json:"slug"`
}

type PlateformViewModel struct {
	Uid 		string  `json:"uid"`
	Name     	string  `json:"name"`
	Description string  `json:"description"`
}

type TournamentViewModel struct {
	Uid           		string  `json:"uid"`
	Title     			string  `json:"title"`
	Date     			string  `json:"date"`
	Description      	string  `json:"description"`
	Statut 				bool `json:"statut"`
	NumberParticipate 	int `json:"numberParticipate"`
	NumberTeam 			int `json:"numberTeam"`
	Price     			float64  `json:"price"`
	DeadlineDate     	string  `json:"deadlineDate"`
	PriceParticipate    float64  `json:"priceParticipate"`
	Game 				GameViewModel `json:"game"`
	Plateform  			PlateformViewModel `json:"plateform"`
	Rules   			string            	`json:"rules"`
	IsPublic 			bool `json:"isPublic"`
}