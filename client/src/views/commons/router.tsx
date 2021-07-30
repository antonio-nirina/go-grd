import React from "react"
import { Route, Switch } from "react-router-dom"
import Index from "../version/home/index"

import Ligue from "../annexe/ligue"
import Tournament from "../tournament/tournament"
import Tournois from "../annexe/tournois"
import Info from "../tournament/info"
import Matches from "../tournament/matches"
import Teams from "../tournament/teams"
import Rules from "../tournament/rules"
import Wager from "../wager/wager"
import Waggers from "../waggers/waggers"
import WaggersGame from "../waggers/waggersgame"
import Joingame from "../waggers/joingame"
import View from "../wager/view"
import Lobby from "../wager/lobby"
import Assistant from "../assistant/assistant"
import Assistance from "../assistance/assistance"
import Ingame from "../assistance/in-game"
import Social from "../assistance/social"
import HelpConnexion from "../assistance/aide-connexion"
import Contact from "../assistance/contact"
import Communaute from "../communaute/communaute"
import League from "../league/league"
import Login from "../auth/login"
import Profil from "../profil/profil"
import Profile from "../annexe/profile"
import Inscription from "../auth/inscription"
import InitPass from "../auth/initpass"
import UpdatePassword from "../auth/updatePassword"
import ProtectedRoute from "./protectedRoute"
import Register from "../auth/register"
import TournamentGame from "../tournament/tournament-game"


const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Index} />
			<Route path="/index" exact component={Index} />
			<ProtectedRoute path="/tournois" exact component={Tournament} />
			<ProtectedRoute path="/tournament" exact component={Tournois} />
			<ProtectedRoute path="/tournament-game" exact component={TournamentGame} />
			<ProtectedRoute path="/info" exact component={Info} />
			<ProtectedRoute path="/matches" exact component={Matches} />
			<ProtectedRoute path="/teams" exact component={Teams} />
			<ProtectedRoute path="/rules" exact component={Rules} />
			<ProtectedRoute path="/ligue" exact component={Ligue} />
			<ProtectedRoute path="/league" exact component={League} />
			<ProtectedRoute path="/wager" exact component={Wager} />
			<ProtectedRoute path="/joingame/:id" exact component={Joingame} />
			<ProtectedRoute path="/waggers" exact component={Waggers} />
			<ProtectedRoute path="/waggers-game" exact component={WaggersGame} />
			<ProtectedRoute path="/view" exact component={View} />
			<ProtectedRoute path="/lobby" exact component={Lobby} />
			<Route path="/communaute" exact component={Communaute} />			
			<ProtectedRoute path="/assistant" exact component={Assistant} />
			<ProtectedRoute path="/assistance" exact component={Assistance} />
			<ProtectedRoute path="/aide-in-game" exact component={Ingame} />
			<ProtectedRoute path="/aide-social" exact component={Social} />
			<ProtectedRoute path="/aide-connexion" exact component={HelpConnexion} />
			<ProtectedRoute path="/contact" exact component={Contact} />
			<ProtectedRoute path="/profil" exact component={Profil} />
			<ProtectedRoute path="/profile" exact component={Profile} />
			<ProtectedRoute path="/update-password" exact component={UpdatePassword} />			
			<Route path="/login" exact component={Login} />
			<Route path="/inscription" exact component={Inscription} />
			<Route path="/register" exact component={Register} />
			<Route path="/forgot-password" exact component={InitPass} />			
		</Switch>
	)
}

export default Router
