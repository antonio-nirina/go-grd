import {CHANNEL_ADD_FRIEND,CHANNEL_TIMMER} from "../common/channels"
import {Pubsub} from "../client/redisClient"


export const Subscription = {
	subscribeCounter: {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_TIMMER)
	},
	subscribeNotifications : {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_ADD_FRIEND)
	},
}
