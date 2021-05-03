package external

import (
	"context"
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}
}

var ctx = context.Background()
var host = fmt.Sprintf("%s,%s",os.Getenv("HOST_REDIS"),os.Getenv("PORT_REDIS"))
var rdb = redis.NewClient(&redis.Options{
	Addr:     host,
	Password: "", // no password set
	DB:       0,  // use default DB
})

func GetDataRedis(key string) (interface{},error) {
	data, err := rdb.Get(ctx, key).Result()

    if err == redis.Nil {
        return nil,err
    } 
	
	if err != nil {
        return nil,err
    }
	
	return data,nil
}

func SetDataRedis(key string,value interface{})  {
	err := rdb.Set(ctx, key, value, 0).Err()

	if err != nil {
        Logger(fmt.Sprintf("%v", err))
    } 
}