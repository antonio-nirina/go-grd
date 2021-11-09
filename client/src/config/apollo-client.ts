import { ApolloClient, InMemoryCache,HttpLink,split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from "@apollo/client/link/ws"
import {GetCookie} from "../views/auth/utils"

const URI_API = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://api.gmrtl4.fr"
const URI_WS  = process.env.NODE_ENV === "development" ? "ws://localhost:8080/subscriptions" : "wss://ws.gmrtl4.fr/subscriptions"

const httpLink = new HttpLink({
	uri: `${URI_API}/graphql`,
})
const wsLink = new WebSocketLink({
	uri: URI_WS,
	options: {
	  reconnect: true
	}
})

const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query)
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

	if (GetCookie()) {
		const type  = GetCookie()?.type
		token = `${type}=${GetCookie()?.access_token}`
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