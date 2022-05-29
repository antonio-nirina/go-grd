package start

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm"
	"gopkg.in/yaml.v3"
	"gorm.io/gorm"

	// _ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
)

type DatabaseConfig struct {
	Db *gorm.DB
}

type loadModel struct {
	Models []string `yaml:"models"`
}

func loadEnv() {
	godotenv.Load()
}

func initMysqlConnection() {
	DbUser := os.Getenv("DB_USER")
	DbPassword := os.Getenv("DB_PWD")
	DbHost := os.Getenv("DB_HOST")
	DbPort := os.Getenv("DB_PORT")
	DbName := os.Getenv("DB_NAME")

	// DBURL := DbUser + ":" + DbPassword + "@tcp(" + DbHost + ":" + DbPort + ")/" + DbName + "?charset=utf8mb4&parseTime=True&loc=Local"
	// fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", DbUser, DbPassword, DbHost, DbPort, DbName)

	DBURL := "postgres://" + DbUser + ":" + DbPassword + "@" + DbHost + ":" + DbPort + "/" + DbName
	db, err := gorm.Open(postgres.Open(DBURL), &gorm.Config{})

	if err != nil {
		fmt.Println("Cannot connect to database postgres")
		log.Fatal("This is the error#############:", err)
	} else {
		fmt.Println("We are connected to the database postgres")
	}

	var load loadModel
	load.GetModels()
	// db.AutoMigrate(&models.User{})
	var dtab DatabaseConfig
	dtab.Db = db
}

func InitAppGin() *gin.Engine {
	loadEnv()
	initMysqlConnection()

	return gin.Default()
}

func (l *loadModel) GetModels() {
	pwd, _ := os.Getwd()
	fmt.Println("dir", pwd)
	yamlFile, err := ioutil.ReadFile(pwd + "/load.yaml")
	if err != nil {
		log.Printf("yamlFile.Get err   #%v ", err)
	}

	data := make(map[interface{}]interface{})
	err = yaml.Unmarshal(yamlFile, &data)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}
	fmt.Println("l=file list", data)
}