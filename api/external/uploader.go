/**
Upload file with Form-data
*/
package external

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
)

type FileUpload struct {
	Filename string
	ApiKey string
	Path string
}

const BASE_URL_IMG_BB = "https://api.imgbb.com/1/upload"

func (f *FileUpload) SenderFile() (string, error) {
	filename 		:= fmt.Sprintf("%s,%s",f.Path,f.Filename)
	payload 		:= &bytes.Buffer{}
  	writer 			:= multipart.NewWriter(payload)
  	file, errFile1 	:= os.Open(filename)
  	defer file.Close()
	part1,errFile1 := writer.CreateFormFile("image",filepath.Base(filename))
	_, errFile1 = io.Copy(part1, file)
	
	if errFile1 != nil {
		return "", errFile1
	}
	/*
		_ = writer.WriteField("param", "value")
		err := writer.Close()
		if err != nil {
			return
		}
	*/
	url := fmt.Sprintf("%s,%s,%s",BASE_URL_IMG_BB,"/",f.ApiKey)
	client := &http.Client {}
	req, err := http.NewRequest("POST",url, payload)

	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", writer.FormDataContentType())
	res, err := client.Do(req)

	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	fmt.Println(string(body))

	return "file upload success",nil
}

func (f *FileUpload) DirectoryExists() bool {
	filename := f.Path
	_, err := os.Stat(filename)

	return !os.IsNotExist(err)
}

func (f *FileUpload) FileRemove() string {
	filename := fmt.Sprintf("%s,%s",f.Path,f.Filename)
	_, err := os.Stat(filename)

	if !os.IsNotExist(err) {
		err = os.Remove(filename)
	}
	fmt.Println(err)
	
	return "file was been remove"
}

func (f *FileUpload) CreateDirectory() error {
	if err := os.MkdirAll(filepath.Dir(f.Path), 0755); err != nil {
		return fmt.Errorf("%s: making directory for file: %v", f.Path, err)
	}
	out, err := os.Create(f.Path)
	if err != nil {
		return fmt.Errorf("%s: creating new file: %v", f.Path, err)
	}
	defer out.Close() 
	err = out.Chmod(0644)

	if err != nil && runtime.GOOS != "windows" {
		return fmt.Errorf("%s: changing file mode: %v", f.Path, err)
	}

	return nil
}