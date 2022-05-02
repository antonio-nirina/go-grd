package start

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	// _ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

func LoadEnv() {
	godotenv.Load()
}

func InitMysqlConnection() {
	LoadEnv()
	DbUser := os.Getenv("DB_USER")
	DbPassword := os.Getenv("DB_PWD")
	DbHost := os.Getenv("DB_HOST")
	DbPort := os.Getenv("DB_PORT")
	DbName := os.Getenv("DB_NAME")

	DBURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", DbUser, DbPassword, DbHost, DbPort, DbName)
	_, err := gorm.Open("mysql", DBURL)
	if err != nil {
		fmt.Printf("Cannot connect to %s database mysql")
		log.Fatal("This is the error:", err)
	} else {
		fmt.Printf("We are connected to the %s database mysql")
	}
}