package external

type FileUpload struct {
	Filename string
	ApiKey string
	ApiSecret string
	BaseUrl string
	Data string
}

func (f *FileUpload) uploaderFile() {
	// curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
}