import React from "react"
import { Route, Switch } from "react-router-dom"
import ProtectedRoute from "./protectedRoute"

import Admin from "../dashboard/admin"
import CreateTournament from "../tournament/create-tournament"
import CreateLeague from "../league/create-league"
import SetRules from "../communaute/set-rules"
import CreateWaggers from "../wager/create-waggers"
import ListTournament from "../tournament/list-tournament"
import ListLeague from "../league/list-league"
import ListWagger from "../wager/list-wagger"
import Login from "../auth/login"

const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Admin} />
			<Route path="/admin/login" exact component={Login} />
			<Route path="/admin/create-tournament" exact component={CreateTournament} />
			<Route path="/admin/create-league" exact component={CreateLeague} />
			<Route path="/admin/create-wagger" exact component={CreateWaggers} />
			<Route path="/admin/communaute" exact component={SetRules} />
			<Route path="/admin/tournament" exact component={ListTournament} />
			<Route path="/admin/league" exact component={ListLeague} />
			<Route path="/admin/wagger" exact component={ListWagger} />
		</Switch>
	)
}

export default Router
