package models

import (
	"time"

	"gorm.io/gorm"
)

/*type User struct {
	ID        uint      `gorm:"primaryKey"`
	FirstName string    `gorm:"size:255;not null;"json:"firstname,omitempty"`
	LastName  string    `gorm:"size:255;not null;" json:"content"`
	Password  string    `gorm:"size:255;not null;"json:"password"`
	Email     string    `gorm:"size:255;not null;"json:"email"`
	Username  string    `gorm:"size:255;not null;"json:"username"`
	IsBanned  bool      `gorm"json:"isBanned"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}*/

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	Password  string
	Email     string
	Username  string
	IsBanned  bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
