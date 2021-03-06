import Schedule from "node-schedule"
import { redis } from "../client/redisClient"
import { RunTaskTournament } from "src/cron/task-match"
import {DURATION_START} from "../common/channels"
import {Pubsub} from "../client/redisClient"
import {CHANNEL_REDIRECT_TOURNAMENT} from "../common/channels"

interface JobInterface {
	uid:string,
	data:dataType
}
interface dataType {
	title:string,
	dateStart:string,
	deadlineDate:string
}
export const TournamentJob = function() {
	redis.subscribe("job_tournament")
	redis.on("message",function(ch,message) {
		console.log("channel", ch)
		let array:JobInterface[] = []
		const result = JSON.parse(message)
		array.push({
			uid:result.uid,
			data:{
				title:result.data.title,
				dateStart:result.data.dateStart,
				deadlineDate:result.data.deadlineDate
			}
		})
		array.forEach(function(e:JobInterface) {
			let date = new Date(e.data.dateStart)
			let runSchedule = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),(date.getMinutes()),0)
			Schedule.scheduleJob(runSchedule,function(){
				RunTaskTournament(e.uid)
			})
		})
	})
}
