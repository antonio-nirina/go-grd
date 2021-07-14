import {User} from "../entities/user"
import {Pubsub} from "../../client/redisClient"
import {CHANNEL_ADD_FRIEND,CHANNEL_CONNECTED,CHANNEL_DISCONNECTED} from "../../common/channels"
import { Notifications } from "../types/notifications"
import {HgetRedis} from "../../client/redisClient"

// const CONNECTED:string = "_connect"
// const DISCONNECT:string  = "_disconnect"

export const NotifiUser = async function(user:User) : Promise<User> {
	const res:Notifications = {
		uidNotif:user.uidNotif,
		uid:user.uid,
		uidReq:user.uidReq,
		avatar:user.avatar,
		email:user.email,
		username:user.username,
		count:user.count
	}

	Pubsub.publish(CHANNEL_ADD_FRIEND,{subscribeNotifications:res})

	return user
}

export const NotifUserConnected = async function(user:User): Promise<User> {
	// const data = HgetRedis(CONNECTED,user.uid)
	Pubsub.publish(CHANNEL_CONNECTED,{subscribeConnected:user})

	return user
}

export const NotifUserDisconnected = async function(user:User): Promise<User> {
	Pubsub.publish(CHANNEL_DISCONNECTED,{subscribeDisConnected:user})

	return user
}

