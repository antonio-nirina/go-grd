package cmd

import (
	"fmt"
	"io"
	"log"
	"os"

	"github.com/robfig/cron/v3"
	logrus "github.com/sirupsen/logrus"
)

func RunCmdScheduler() {
	logrus.Info("Create cron log.....")
	c := cron.New()
	c.AddFunc("@every 1s", func() {
		fmt.Println("Every hour on the half hour")
	})
	fn := logOutput()
	defer fn()
	c.Start()
	logrus.Info("End cron *****")
}

func logOutput() func() {
	logfile := `logfile.txt`
	f, _ := os.OpenFile(logfile, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0666)
	out := os.Stdout
	mw := io.MultiWriter(out, f)
	r, w, _ := os.Pipe()
	os.Stdout = w
	os.Stderr = w
	log.SetOutput(mw)
	exit := make(chan bool)

	go func() {
		_, _ = io.Copy(mw, r)
		exit <- true
	}()

	return func() {
		_ = w.Close()
		<-exit
		_ = f.Close()
	}

}
