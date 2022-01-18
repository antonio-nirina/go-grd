import exp from 'constants'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import  Redis  from "ioredis"


const options = {
	host: "127.0.0.1",
	port: 6379,
	retry_strategy: (options:any) => {
	  // reconnect after
	  return Math.max(options.attempt * 100, 3000)
	}
}
export const redis = new Redis()
export const Pubsub = new RedisPubSub({
	connection: options,
	publisher: new Redis(options),
  	subscriber: new Redis(options)
})

export const GetRedis = async (key:string) => {
	try {
	  const data = await redis.get(key)
	  return data ? JSON.parse(data) : {}
	} catch (e) {
		console.log(e)
	  return null
	}
  }

export const SetRedis = async (key:string, data:any) => {
	try {
	  await redis.set(key, JSON.stringify(data))
	  return true
	} catch (e) {
		console.log(e)
	  return false
	}
}

export const HgetRedis = async (key:string, field:string) => {
	try {
		const data = await redis.hget(key,field)

		return data ? JSON.parse(data) : {}
	} catch (e) {
		console.log("error", e)
	  return false
	}
}

export const BloPoPRedis = async (key:string) => {
	try {
		const data = await redis.blpop(key)
		console.log("data", data)
	} catch (e) {
		console.log("error", e)
	  return false
	}
}



