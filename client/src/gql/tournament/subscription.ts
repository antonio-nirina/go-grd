import { gql } from '@apollo/client'

export const COUNTER_SUBSCRIBER = gql`
	subscription subscribeCounter {
		subscribeCounter {
			id
			time
		}
	}
`
export const SUBSCRIBER_REDIRECT = gql`
	subscription subscribeRedirectTournament {
		subscribeRedirectTournament {
			uid
			title:String,
			dateStart:String,
			deadlineDate:String
		}
	}
`
