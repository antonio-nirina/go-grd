import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../home/home"

const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
		</Switch>
	)
}

export default Router
