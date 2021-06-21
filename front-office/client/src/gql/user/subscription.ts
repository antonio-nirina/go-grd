import { gql } from '@apollo/client'

export const COUNT_SUBSCRIBE = gql`
	subscription subscribeCounter {
		subscribeCounter{
			time
		}
	}
`
export const NOTIFICATIONS_SUBSCRIBE = gql`
	subscription subscribeNotifications {
		subscribeNotifications {
			uid
			email
			avatar
			username
			count
		}
	}
`

