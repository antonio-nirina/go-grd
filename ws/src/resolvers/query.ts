import { RunTaskTournament } from "src/cron/task-match"
import {NotifiUser,NotifUserConnected,NotifUserDisconnected} from "../user/controller/friendController"
import {User} from "../user/entities/user"
import { CounterType } from "src/counter/entities/counter"

export const Query = {
	NotifiUser: async (obj: any,{user}:{user: User}) => NotifiUser(user),
	NotifUserConnected: async (obj: any,{user}:{user: User}) => NotifUserConnected(user),
	NotifUserDisconnected: async (obj: any,{user}:{user: User}) => NotifUserDisconnected(user),
	RunTaskTournament:async (obj:any,{counter}:{counter:CounterType}) => RunTaskTournament(counter)
}
