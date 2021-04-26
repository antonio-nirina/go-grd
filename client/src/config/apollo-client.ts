import { ApolloClient, InMemoryCache,HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
	uri: `http://localhost:4000`,
})

const ACCESS_TOKEN: string  = "access_token"

export const createApolloClient = () => {
	const authLink = setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: localStorage.getItem(ACCESS_TOKEN) ? `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` : "",
			}
		}
	})
	const client =  new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	})

	return client
}
