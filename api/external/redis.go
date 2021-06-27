package external

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

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
	p, err := json.Marshal(value)
    
    if err != nil {
       Logger(fmt.Sprintf("%v", err))
    }
	
	err = Rdb.Set(ctx, key, p, 0).Err()

	if err != nil {
        Logger(fmt.Sprintf("%v", err))
    } 
}
// - HSet("myhash", map[string]interface{}{"key1": "value1", "key2": "value2"})
func SetHmsetRedis(key string,value interface{}) {
	fmt.Println(value)
	err := Rdb.HSet(ctx,key,value)
	if err != nil {
        Logger(fmt.Sprintf("%v", err))
    } 
}

func GetHmsetRedis(key string, field string) {
	err := Rdb.HMGet(ctx,key,field)
	if err != nil {
        Logger(fmt.Sprintf("%v", err))
    } 
}

func RemoveHmsetRedis(key string, field string) {
	err := Rdb.HDel(ctx,key,field)
	if err != nil {
        Logger(fmt.Sprintf("%v", err))
    } 
}
