import React from "react"
import { Switch,Route } from "react-router-dom"
import ProtectedRoute from "./protectedRoute"

import Admin from "../dashboard/admin"
import CreateTournament from "../tournament/create-tournament"
import CreateLeague from "../league/create-league"
import SetRules from "../communaute/set-rules"

import HomeList from "../home/home-list"
import SetHome from "../home/set-home"
import SetAssist from "../assistance/set-assist"
import CreateWaggers from "../wager/create-waggers"
import CreateGame from "../game/create-game"
import ListTournament from "../tournament/list-tournament"
import ListGame from "../game/list-game"
import ListLeague from "../league/list-league"
import ListWagger from "../wager/list-wagger"
import Login from "../auth/login"
import DetailHome from "../home/home-detail"
import Team from "../team/team"
import User from "../user/user"
import DetailUser from "../user/detail-user"
import ListAssist from "../assistance/list-assist"
import DetailAssist from "../assistance/detail-assist"
import CreateTitle from "../assistance/create-titre"

const Router = function() {
	return (
		<Switch>
			<ProtectedRoute path="/" exact component={Admin} />
			<Route path="/admin/login" exact component={Login} />
			<ProtectedRoute path="/admin/create-tournament" exact component={CreateTournament} />
			<ProtectedRoute path="/admin/create-league" exact component={CreateLeague} />
			<ProtectedRoute path="/admin/create-wagger" exact component={CreateWaggers} />
			<ProtectedRoute path="/admin/communaute" exact component={SetRules} />
			<ProtectedRoute path="/admin/tournament" exact component={ListTournament} />
			<ProtectedRoute path="/admin/league" exact component={ListLeague} />
			<ProtectedRoute path="/admin/wagger" exact component={ListWagger} />
			<ProtectedRoute path="/admin/create-game" exact component={CreateGame} />
			<ProtectedRoute path="/admin/list-game" exact component={ListGame} />
			<ProtectedRoute path="/admin/list-home" exact component={HomeList} />
			<ProtectedRoute path="/admin/set-home" exact component={SetHome} />
			<ProtectedRoute path="/admin/detail/:id" exact component={DetailHome} />
			<ProtectedRoute path="/admin/set-assist" exact component={SetAssist} />
			<ProtectedRoute path="/admin/users" exact component={User} />
			<ProtectedRoute path="/admin/detail-user" exact component={DetailUser} />
			<ProtectedRoute path="/admin/teams" exact component={Team} />
			<ProtectedRoute path="/admin/list-assist" exact component={ListAssist} />
			<ProtectedRoute path="/admin/detail/assist/:id" exact component={DetailAssist} />
			<ProtectedRoute path="/admin/create/assistant" exact component={CreateTitle} />
		</Switch>
	)
}

export default Router
