import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../home/home"
import Ligue from "../ligue/ligue"
import Tournament from "../tournament/tournament"
import Wager from "../wager/wager"
import Assistant from "../assistant/assistant"
import Communaute from "../communaute/communaute"
import Auth from "../auth/auth"

const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/tournament" exact component={Tournament} />
			<Route path="/ligue" exact component={Ligue} />
			<Route path="/wager" exact component={Wager} />
			<Route path="/communaute" exact component={Communaute} />
			<Route path="/assistant" exact component={Assistant} />
			<Route path="/auth" exact component={Auth} />
		</Switch>
	)
}

export default Router
