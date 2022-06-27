package log

import (
	"fmt"
	"os"
	"time"

	"github.com/sirupsen/logrus"
)

var log = logrus.New()

func LogFormater(message string) {
	log.Out = os.Stdout
	log.SetFormatter(&logrus.TextFormatter{})
	now := time.Now().UTC().Format("2006-01-01")
	outPath := "/server/log/data/"
	dir, _ := os.Getwd()
	fmt.Println("dir", dir)
	if _, err := os.Stat(outPath); os.IsNotExist(err) {
		err = os.MkdirAll(outPath, 0755)
		if err != nil {
			log.Println("error created dir", err)
		}
	}
	// You could set this to any `io.Writer` such as a file
	file, err := os.OpenFile(outPath+"log_"+now+".log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Println("error msg open file", err)
	}

	log.Out = file
	log.WithFields(logrus.Fields{
		"Error": "[" + file.Name() + "] ",
	}).Error(message)
}
