import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"

import Router from "./views/commons/router"

import {createApolloClient} from "./config/apollo-client"

function App() {
	let client = createApolloClient()

  	return (
		<div className="App">
			<header className="app-header">
			<ApolloProvider client={client}>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</ ApolloProvider>
			</header>
		</div>
  	)
}

export default App
