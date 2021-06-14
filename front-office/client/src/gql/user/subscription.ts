import { gql } from '@apollo/client'

export const COUNT_SUBSCRIBE = gql`
	subscription subscribeCounter {
		subscribeCounter{
			time
		}
	}
`


