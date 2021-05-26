import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from "../home/home"
import Ligue from "../ligue/ligue"
import Tournament from "../tournament/tournament"
import Info from "../tournament/info"
import Matches from "../tournament/matches"
import Teams from "../tournament/teams"
import Rules from "../tournament/rules"
import Wager from "../wager/wager"
import Assistant from "../assistant/assistant"
import Communaute from "../communaute/communaute"
import Login from "../auth/login"
import Profil from "../profil/profil"
import Inscription from "../auth/inscription"
import InitPass from "../auth/initpass"
import UpdatePassword from "../auth/updatePassword"
import ProtectedRoute from "./protectedRoute"
import Register from "../auth/register"

const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/tournament" exact component={Tournament} />
			<Route path="/info" exact component={Info} />
			<Route path="/matches" exact component={Matches} />
			<Route path="/teams" exact component={Teams} />
			<Route path="/rules" exact component={Rules} />
			<Route path="/ligue" exact component={Ligue} />
			<Route path="/wager" exact component={Wager} />
			<Route path="/communaute" exact component={Communaute} />
			<Route path="/assistant" exact component={Assistant} />
			<Route path="/login" exact component={Login} />
			<Route path="/inscription" exact component={Inscription} />
			<Route path="/register" exact component={Register} />
			<Route path="/forgot-password" exact component={InitPass} />
			<Route path="/update-password" exact component={UpdatePassword} />
			<Route path="/profil" exact component={Profil} />
		</Switch>
	)
}

export default Router