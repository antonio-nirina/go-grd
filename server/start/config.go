package start

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm"
	"github.com/thoussei/antonio/server/models"
	_ "gopkg.in/yaml.v3"
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
		log.Fatal("Cannot connect to database postgres this is the error#############:", err)
	} else {
		fmt.Println("We are connected to the database postgres")
	}

	var load loadModel
	load.GetModels(db)
}

func InitAppGin() *gin.Engine {
	loadEnv()
	initMysqlConnection()

	return gin.Default()
}

func (l *loadModel) GetModels(db *gorm.DB) {
	// exec.Command(ls) who know path load.yaml
	// yamlFile, _ := ioutil.ReadFile("server/load.yaml")
	// listModels := make(map[string](map[string]string))
	// err := yaml.Unmarshal(yamlFile, &listModels)
	// var extractModels []reflect.Type
	// var dataModels []reflect.Type
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Game{})
	db.AutoMigrate(&models.Tournaments{})
}
