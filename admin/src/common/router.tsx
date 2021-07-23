import React from "react"
import { Switch } from "react-router-dom"
import ProtectedRoute from "./protectedRoute"

import Admin from "../dashboard/admin"
import CreateTournament from "../tournament/create-tournament"
import CreateLeague from "../league/create-league"
import SetRules from "../communaute/set-rules"
import SetHome from "../home/set-home"
import CreateWaggers from "../wager/create-waggers"
import CreateGame from "../game/create-game"
import ListTournament from "../tournament/list-tournament"
import ListGame from "../game/list-game"
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
			<ProtectedRoute path="/admin/create-game" exact component={CreateGame} />
			<ProtectedRoute path="/admin/list-game" exact component={ListGame} />
			<ProtectedRoute path="/admin/set-home" exact component={SetHome} />
		</Switch>
	)
}

export default Router
