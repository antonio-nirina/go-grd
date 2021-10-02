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
import ListSubject from "../assistance/list-subject"

const Router = function() {
	return (
		<Switch>
			<ProtectedRoute path="/" exact component={Admin} />
			<Route path="/admin/login" exact component={Login} />
			<Route path="/admin/create-tournament" exact component={CreateTournament} />
			<Route path="/admin/create-league" exact component={CreateLeague} />
			<Route path="/admin/create-wagger" exact component={CreateWaggers} />
			<Route path="/admin/communaute" exact component={SetRules} />
			<Route path="/admin/tournament" exact component={ListTournament} />
			<Route path="/admin/league" exact component={ListLeague} />
			<Route path="/admin/wagger" exact component={ListWagger} />
			<Route path="/admin/create-game" exact component={CreateGame} />
			<Route path="/admin/list-game" exact component={ListGame} />
			<Route path="/admin/list-home" exact component={HomeList} />
			<Route path="/admin/set-home" exact component={SetHome} />
			<Route path="/admin/detail/:id" exact component={DetailHome} />
			<Route path="/admin/set-assist" exact component={SetAssist} />
			<Route path="/admin/users" exact component={User} />
			<Route path="/admin/detail-user" exact component={DetailUser} />
			<Route path="/admin/teams" exact component={Team} />
			<Route path="/admin/list-assist" exact component={ListAssist} />
			<Route path="/admin/detail/assist/:id" exact component={DetailAssist} />
			<Route path="/admin/create/subject" exact component={CreateTitle} />
			<Route path="/admin/list/subject" exact component={ListSubject} />
		</Switch>
	)
}

export default Router
