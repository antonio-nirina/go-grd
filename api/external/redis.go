package external

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)

type UserRed struct {
	Username string
	Email    string
}
var Rdb *redis.Client
var ctx = context.Background()

func init() {
	err := godotenv.Load()
	
	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}

	var host = fmt.Sprintf("%s:%s",os.Getenv("HOST_REDIS"),os.Getenv("PORT_REDIS"))
	Rdb = redis.NewClient(&redis.Options{
		Addr:     host,
		Password: "", // no password set
		DB:       0,  // use default DB
	})
}

var Names []string = []string{"Jasper", "Johan", "Edward", "Niel", "Percy", "Adam", "Grape", "Sam", "Redis", "Jennifer", "Jessica", "Angelica", "Amber", "Watch"}
var SirNames []string = []string{"Ericsson", "Redisson", "Edisson", "Tesla", "Bolmer", "Andersson", "Sword", "Fish", "Coder"}
var EmailProviders []string = []string{"Hotmail.com", "Gmail.com", "Awesomeness.com", "Redis.com"}

func GetDataRedis(key string) (interface{},error) {
	data, err := Rdb.Get(ctx, key).Result()

    if err == redis.Nil {
        return nil,err
    } 
	
	if err != nil {
        return nil,err
    }
	
	return data,nil
}

func SetDataRedis(key string,value interface{})  {
	err := Rdb.Set(ctx, key, value, 0).Err()

	if err != nil {
        Logger(fmt.Sprintf("%v", err))
    } 
}

func SetMessagePublish(){
	for {
		reqBodyBytes := new(bytes.Buffer)
		json.NewEncoder(reqBodyBytes).Encode(GenerateRandomUser())
		data := &UserRed{}
		body, err := ioutil.ReadAll(reqBodyBytes)
		err = json.Unmarshal(body, data)
		
		if err != nil {
			fmt.Println(err)
		}

		fmt.Println("fff", data)
		err = Rdb.Publish(ctx, "new_users",data.Email).Err()
		if err != nil {
			panic(err)
		}

		rand.Seed(time.Now().UnixNano())
		n := rand.Intn(4)
		time.Sleep(time.Duration(n) * time.Second)
	}
}

func GenerateRandomUser() *UserRed {
	rand.Seed(time.Now().UnixNano())
	nameMax := len(Names)
	sirNameMax := len(SirNames)
	emailProviderMax := len(EmailProviders)

	nameIndex := rand.Intn(nameMax-1) + 1
	sirNameIndex := rand.Intn(sirNameMax-1) + 1
	emailIndex := rand.Intn(emailProviderMax-1) + 1

	return &UserRed{
		Username: Names[nameIndex] + " " + SirNames[sirNameIndex],
		Email:    Names[nameIndex] + SirNames[sirNameIndex] + "@" + EmailProviders[emailIndex],
	}
}

func GetPublish() {
	topic := Rdb.Subscribe(ctx, "new_users")
	channel := topic.Channel()

	fmt.Println("channel",channel)
}