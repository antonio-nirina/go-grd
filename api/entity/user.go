package entity

type User struct {
	ID        string `json:"_id"`
	Uid       string `json:"uid"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Password  string `json:"password"`
	Username  string `json:"username"`
	IsBanned  bool   `json:"is_banned"`
	Avatar    string `json:"avatar,omitempty"`
	Language  string `json:"language"`
	Point     int    `json:"point"`
}
