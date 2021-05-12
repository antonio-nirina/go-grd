import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { rootReducer } from "./reducer"
import Router from "./views/commons/router"

import {createApolloClient} from "./config/apollo-client"
import { loadState, saveState } from "./storage/loadstate"
import {sendDataStore} from "./views/auth/utils"


const store = createStore(rootReducer, loadState())

store.subscribe(function() {
	const nameState = 'userConnected'
	saveState(store.getState().userConnected.user,nameState)
	sendDataStore(store.getState())

})

function App() {
	let client = createApolloClient()

  	return (
		<div className="App">
			<Provider store={store}>
				<ApolloProvider client={client}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</ ApolloProvider>
			</Provider>
		</div>
  	)
}

export default App
