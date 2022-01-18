import { ApolloServer } from "apollo-server"
import { SubscriptionServer } from 'subscriptions-transport-ws'
import resolvers from "./resolvers"
import {typeDefs}  from './schema/schema'
import {TournamentJob} from "./init/tournamentJobConsumer"

//(async function bootstrapAsync(): Promise<void> {
const PORT = 8080

/*const corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
}*/
const server = new ApolloServer({
	typeDefs,
	resolvers,
	cors:false,
	playground: true,
	introspection: true,
	subscriptions: {
		path:"/subscriptions",
		onConnect: (connectionParams, webSocket, context) => {
			console.log(connectionParams)
		},
		onDisconnect: (webSocket, context) => {
			console.log('Client disconnected')
		},
	}
})
TournamentJob()
server.listen(PORT).then(({ url }) => { console.log(`🚀 Query at ${url}`)})
//})()

