import { ApolloClient, InMemoryCache,HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {GetCookie} from "../auth/utils"

const URI_API = "https://api.gmrtl4.fr" // process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://api.gmrtl4.fr"

const httpLink = new HttpLink({
	uri: `${URI_API}/graphql`,
})

export const createApolloClient = () => {
	let token = ""

	if (GetCookie()) {
		const type  = GetCookie().type
		token = `${type}=${GetCookie().access_token}`
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
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	})

	return client
}
