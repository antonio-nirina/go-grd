import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../home/home"
import Ligue from "../ligue/ligue"
import Tournament from "../tournament/tournament"
import Wager from "../wager/wager"
import Assistant from "../assistant/assistant"
import Communaute from "../communaute/communaute"
import Login from "../auth/login"
import Profil from "../profil/profil"
import Inscription from "../auth/inscription"
import ProtectedRoute from "./protectedRoute"
import Register from "../auth/register"

const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<ProtectedRoute path="/tournament" exact component={Tournament} />
			<ProtectedRoute path="/ligue" exact component={Ligue} />
			<ProtectedRoute path="/wager" exact component={Wager} />
			<ProtectedRoute path="/communaute" exact component={Communaute} />
			<ProtectedRoute path="/assistant" exact component={Assistant} />
			<Route path="/login" exact component={Login} />
			<Route path="/inscription" exact component={Inscription} />
			<Route path="/register" exact component={Register} />
			<Route path="/profil" exact component={Profil} />
		</Switch>
	)
}

export default Router
