package start

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"

	// _ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

func loadEnv() {
	godotenv.Load()
}

func initMysqlConnection() {
	DbUser := os.Getenv("DB_USER")
	DbPassword := os.Getenv("DB_PWD")
	DbHost := os.Getenv("DB_HOST")
	DbPort := os.Getenv("DB_PORT")
	DbName := os.Getenv("DB_NAME")

	DBURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", DbUser, DbPassword, DbHost, DbPort, DbName)
	_, err := gorm.Open("postgres", DBURL)
	if err != nil {
		fmt.Printf("Cannot connect to %s database postgres")
		log.Fatal("This is the error:", err)
	} else {
		fmt.Printf("We are connected to the %s database postgres")
	}
}

func InitAppGin() *gin.Engine {
	loadEnv()
	initMysqlConnection()

	return gin.Default()
}
