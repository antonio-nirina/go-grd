package handlers

// Response Type
type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    interface{}
}
