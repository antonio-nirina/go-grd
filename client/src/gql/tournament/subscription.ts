import { gql } from '@apollo/client'

export const COUNTER_SUBSCRIBER = gql`
	subscription subscribeCounter {
		subscribeCounter {
			id
			time
			uid
		}
	}
`
export const SUBSCRIBER_REDIRECT = gql`
	subscription subscribeRedirectTournament {
		subscribeRedirectTournament {
			uid
			title
			dateStart
			deadlineDate
		}
	}
`
