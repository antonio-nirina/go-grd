package models

import "gorm.io/gorm"

/*type Tournaments struct {
	ID                uint
	Title             string  `gorm:"size:255;not null;"json:"title"`
	DateStart         string  `gorm:"size:255;not null;"json:"date_start"`
	Plateform         string  `gorm:"size:255;not null;"json:"plateform"`
	Price             float64 `gorm:"size:255;not null;"json:"price"`
	DeadlineDate      string  `gorm:"size:255;not null;"json:"deadline_date"`
	NumberParticipate int     `gorm:"size:255;not null;"json:"number_participate"`
	Statut            string  `gorm:"size:255;not null;"json:"statut"`
}*/

type Tournaments struct {
	gorm.Model
	Title             string
	DateStart         string
	Plateform         string
	Price             float64
	DeadlineDate      string
	NumberParticipate int
	Statut            string
}
