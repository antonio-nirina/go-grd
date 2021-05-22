package external

type FileUpload struct {
	Filename string
	ApiKey string
	ApiSecret string
	Path string
	Data string
}

const BASE_URL = "https://api.imgbb.com/1/upload"

func (f *FileUpload) uploaderFile() {

}