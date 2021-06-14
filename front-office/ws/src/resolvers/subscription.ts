import {CHANNEL_PROOF,CHANNEL_READY,CHANNEL_TIMMER} from "../common/channels"
import {Pubsub} from "../client/redisClient"


export const Subscription = {
	subscribeCounter: {
		subscribe: () => Pubsub.asyncIterator(CHANNEL_TIMMER)
	}
}
