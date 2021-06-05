package external

import log "github.com/sirupsen/logrus"

func Logger(message string) {

	log.WithFields(log.Fields{
		"request": message,
	}).Fatal(message)
}

/*
*
* Retry function after d seconds
*/
func ForeverSleep(d time.Duration, f RetryFunc) {
	for i := 0; ; i++ {
		err := f(i)
		if err == nil {
			return
		}
		time.Sleep(d)
	}
}