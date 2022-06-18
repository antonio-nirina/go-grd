package log

import (
	"os"
	"time"

	"github.com/sirupsen/logrus"
)

var log = logrus.New()

func LogFormater(message string) {
	log.Out = os.Stdout
	log.SetFormatter(&logrus.TextFormatter{})
	now := time.Now().UTC().Format("2006-1-1")
	dirname := "server/log/data"
	err := os.MkdirAll(dirname, 0755)
	if err != nil {
		log.Fatal(err)
	}

	dir, err := os.ReadDir(dirname)
	if err != nil {
		log.Fatal(err)
	}
	filename := ""
	if dir[0].IsDir() {
		filename = dir[0].Name() + "/" + now + "-log.log"
	}

	// You could set this to any `io.Writer` such as a file
	file, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err == nil {
		log.Fatal("Error in file ", err)
	}

	log.Out = file
	log.WithFields(logrus.Fields{
		"Error": "[" + now + "] ",
	}).Error(message)
}
