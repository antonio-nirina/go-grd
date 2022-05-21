package models

import "gorm.io/gorm"

/*type Game struct {
	ID         uint   `gorm:"primaryKey"`
	Name       string `gorm:"size:255;not null;"json:"name,omitempty"`
	Image      string `gorm:"size:255;not null;"json:"image,omitempty"`
	Logo       string `gorm:"size:255;not null;"json:"logo,omitempty"`
	Notes      int    `gorm:"size:255;not null;"json:"notes,omitempty"`
	Slug       string `gorm:"size:255;not null;"json:"slug,omitempty"`
	NameTWITCH string `gorm:"size:255;not null;"json:"name_twitch,omitempty"`
	IdTWITCH   string `gorm:"size:255;not null;"json:"id_twitch,omitempty"`
}*/

type Game struct {
	gorm.Model
	Name       string
	Image      string
	Logo       string
	Notes      int
	Slug       string
	NameTWITCH string
	IdTWITCH   string
}
