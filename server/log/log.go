package log

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/sirupsen/logrus"
)

var log = logrus.New()

func LogFormater(message string) {
	log.Out = os.Stdout
	log.SetFormatter(&logrus.TextFormatter{})
	now := time.Now().UTC().Format("2006-01-01")
	path, err := os.Getwd()
	if err != nil {
		log.Println("error msg path", err)
	}

	//Create output path
	outPath := filepath.Join(path, "server/log/data/")
	fmt.Println("pathhh", outPath)
	//Create dir output using above code

	if _, err := os.Stat(outPath); os.IsNotExist(err) {
		err = os.Mkdir(outPath, 0755)
		if err != nil {
			log.Println("error created dir", err)
		}
	}

	if err != nil {
		log.Println("error msg created dir", err)
	}

	filename, err := os.Create(outPath + now + "-log.log")
	if err != nil {
		log.Println("error msg create file", err)
	}

	// You could set this to any `io.Writer` such as a file
	file, err := os.OpenFile(filename.Name(), os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err == nil {
		log.Println("error msg open file", err)
	}

	log.Out = file
	log.WithFields(logrus.Fields{
		"Error": "[" + now + "] ",
	}).Error(message)
}
