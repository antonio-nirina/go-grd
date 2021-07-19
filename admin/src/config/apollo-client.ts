import { ApolloClient, InMemoryCache,HttpLink,split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'


const URI_API = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://admin.gmrtl4.fr"

const httpLink = new HttpLink({
	uri: `${URI_API}/graphql`,
})


const ACCESS_TOKEN: string  = "access_token"

const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query)
	  return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	  );
	},
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
