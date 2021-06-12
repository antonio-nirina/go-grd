import { gql } from '@apollo/client'

export const COUNT_SUBSCRIBE = gql`
	subscription subscribeCounter {
		subscribeCounter{
			key
		}
	}
`


export const HELLO_SUBSCRIBE = gql`
	subscription helloSaid {
		helloSaid{
			id
    		msg
		}
	}
`
