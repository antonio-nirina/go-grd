import React from "react"
import { Switch } from "react-router-dom"
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
			<ProtectedRoute path="/" exact component={Admin} />
			<ProtectedRoute path="/admin/login" exact component={Login} />
			<ProtectedRoute path="/admin/create-tournament" exact component={CreateTournament} />
			<ProtectedRoute path="/admin/create-league" exact component={CreateLeague} />
			<ProtectedRoute path="/admin/create-wagger" exact component={CreateWaggers} />
			<ProtectedRoute path="/admin/communaute" exact component={SetRules} />
			<ProtectedRoute path="/admin/tournament" exact component={ListTournament} />
			<ProtectedRoute path="/admin/league" exact component={ListLeague} />
			<ProtectedRoute path="/admin/wagger" exact component={ListWagger} />
		</Switch>
	)
}

export default Router
