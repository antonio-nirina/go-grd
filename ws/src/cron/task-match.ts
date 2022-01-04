import { ObjectID } from "mongodb"
import cron from "node-cron"

import {Pubsub} from "../client/redisClient"
import {CHANNEL_TIMMER} from "../common/channels"
import { Times } from "../user/types/times"
import { CounterType } from "src/counter/entities/counter"


// https://github.com/node-cron/node-cron
export const RunTaskTournament = function(counter:CounterType):string {
	let currSec:number = 60
	let minute:number = 1
	// SetRedis(idTounament,{time: 0})
	const task = cron.schedule(`${counter.sec} ${counter.min} ${counter.hours} ${counter.day} ${counter.month}`, async () => {
		currSec = currSec - 1
		if(currSec == 0 && minute > 0) {
			currSec = 60
			minute = minute - 1
		}
		let chrono = `${minute > 9 ? minute : "0"+minute} : ${currSec > 9 ? currSec : "0"+currSec}`
		const result:Times = {
			id: new ObjectID().toHexString(),
			time: chrono,
		}
		// await SetRedis(idTounament,{time: currSec*60})
		Pubsub.publish(CHANNEL_TIMMER,{subscribeCounter:result})
	})
	Pubsub.subscribe(CHANNEL_TIMMER,function(msg){
		let data:any = msg.subscribeCounter.time
		let array:Array<string> = data.split(":")
		const mins:number = parseInt(array[0].trim())
		const secs:number = parseInt(array[1].trim())

		if (mins === 0 && secs === 0) {
			task.stop()
		}
	})

	return "Ok"
}


