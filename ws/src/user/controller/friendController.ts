import {runTaskTournament} from "../../cron/task-match"
import {User} from "../entities/user"
import {Pubsub} from "../../client/redisClient"
import {CHANNEL_ADD_FRIEND} from "../../common/channels"
import { Notifications } from "../types/notifications"

export const NotifiUser = async function(user:User) : Promise<User> {
	const res:Notifications = {
		uid:user.uid,
		avatar:user.avatar,
		email:user.email,
		username:user.username,
		count:user.count
	}

	Pubsub.publish(CHANNEL_ADD_FRIEND,{subscribeNotifications:res})

	return user
}


