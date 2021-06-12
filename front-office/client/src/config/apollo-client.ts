import { ApolloClient, InMemoryCache,HttpLink,split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from "@apollo/client/link/ws"



const httpLink = new HttpLink({
	uri: `http://localhost:4000`,
})
const wsLink = new WebSocketLink({
	uri: 'ws://localhost:4000/subscriptions',
	options: {
	  reconnect: true
	}
})

const ACCESS_TOKEN: string  = "access_token"

const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query);
	  return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	  );
	},
	wsLink,
	httpLink,
)

export const createApolloClient = () => {
	let token = ""
	const storage = localStorage.getItem(ACCESS_TOKEN)
	if (storage) {
		const type  = JSON.parse(storage).type
		token = `${type}=${JSON.parse(storage).access_token}`
	}
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			}
		}
	})
	const client =  new ApolloClient({
		link: authLink.concat(splitLink),
		cache: new InMemoryCache()
	})

	return client
}
