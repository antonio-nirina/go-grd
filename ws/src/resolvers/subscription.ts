import {
	CHANNEL_ADD_FRIEND,
	CHANNEL_TIMMER,
	CHANNEL_CONNECTED,
	CHANNEL_DISCONNECTED,
	CHANNEL_REDIRECT_TOURNAMENT} from "../common/channels"
import {Pubsub} from "../client/redisClient"


export const Subscription = {
	subscribeCounter: {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_TIMMER)
	},
	subscribeNotifications : {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_ADD_FRIEND)
	},
	subscribeConnected: {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_CONNECTED)
	},
	subscribeDisConnected: {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_DISCONNECTED)
	},
	subscribeRedirectTournament: {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_REDIRECT_TOURNAMENT)
	}
}
