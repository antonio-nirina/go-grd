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
	Rules   			string            	`json:"rules"`
}

type GameViewModel struct {
	Uid string  `json:"uid"`
	Name     		string  `json:"name"`
	Logo     		string  `json:"logo"`
	Slug     		string  `json:"slug"`
}

type PlateformViewModel struct {
	Uid 		string  `json:"uid"`
	Name     	string  `json:"name"`
	Description string  `json:"description"`
}
