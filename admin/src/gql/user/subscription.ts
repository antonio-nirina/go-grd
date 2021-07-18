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
			uidNotif
			uidReq
			uid
			email
			avatar
			username
			count
		}
	}
`
export const USER_CONNECTED = gql`
	subscription subscribeConnected {
		subscribeConnected {
			uidNotif
			uidReq
			uid
			email
			username
			isConnected
			avatar
		}
	}
`
