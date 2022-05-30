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
	"github.com/thoussei/antonio/server/models"
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
	list, err := load.GetModels()

	if err != nil {
		// logrus
		log.Printf("Error  #%v ", err)
	}

	var dtab DatabaseConfig
	dtab.Db = db
	for _, v := range list {
		fmt.Println(v)
		dtab.Db.AutoMigrate(&models.Tournaments{})
	}
}

func InitAppGin() *gin.Engine {
	loadEnv()
	initMysqlConnection()

	return gin.Default()
}

func (l *loadModel) GetModels() ([]string, error) {
	// exec.Command(ls) who know path load.yaml
	yamlFile, err := ioutil.ReadFile("server/load.yaml")
	if err != nil {
		return []string{}, err
	}

	listModels := make(map[string][]string)
	err = yaml.Unmarshal(yamlFile, &listModels)

	if err != nil {
		return []string{}, err
	}

	return listModels["models"], nil
}
