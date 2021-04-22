package external

import log "github.com/sirupsen/logrus"

func Logger(message string) {

	log.WithFields(log.Fields{
		"request": message,
	}).Fatal(message)
}
