import { ApolloClient, InMemoryCache,HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
	uri: `http://localhost:4000`,
})

const ACCESS_TOKEN: string  = "access_token"

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
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	})

	return client
}
