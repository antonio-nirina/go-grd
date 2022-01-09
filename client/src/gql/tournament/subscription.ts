import { gql } from '@apollo/client'

export const COUNTER_SUBSCRIBER = gql`
	subscription subscribeCounter {
		subscribeCounter {
			id
			time
		}
	}
`
