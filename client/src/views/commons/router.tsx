import React from "react"
import { Route, Switch } from "react-router-dom"
import Index from "../version/home/index"

// import Ligue from "../annexe/ligue"
import Tournament from "../tournament/tournament"
import Tournois from "../annexe/tournois"
import Leaderboard from "../leaderboard/leaderboard"
import Info from "../tournament/info"
// import InfoLeague from "../annexe/info-league"
import Matches from "../tournament/matches"
// import MatchesLeague from "../annexe/matches-league"
import Teams from "../tournament/teams"
import Bracket from "../tournament/bracket"
import Rules from "../tournament/rules"
// import RulesLeague from "../annexe/rules-league"
import Wager from "../wager/wager"
import Waggers from "../waggers/waggers"
import Tableau from "../waggers/tableau"
import WaggersRules from "../waggers/waggersrules"
import WaggersGame from "../waggers/waggersgame"
import Joingame from "../waggers/joingame"
import View from "../wager/view"
import Lobby from "../wager/lobby"
import Assistant from "../assistant/assistant"
import Assistance from "../assistance/assistance"
import Contact from "../assistance/contact"
import Communaute from "../communaute/communaute"
import Login from "../auth/login"
import Profil from "../profil/profil"
import Parametre from "../parametre/parametre"
import Jackpot from "../parametre/jackpot"
import Mygames from "../parametre/mygames"
import Inscription from "../auth/inscription"
import InitPass from "../auth/initpass"
import UpdatePassword from "../auth/updatePassword"
import ProtectedRoute from "./protectedRoute"
import Register from "../auth/register"
import Account from "../auth/account"
import Game from "../auth/game"
import TournamentGame from "../tournament/tournament-game"
// import LeagueGame from "../league/league-game"


const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Index} />
			<Route path="/index" exact component={Index} />
			<ProtectedRoute path="/Leaderboard" exact component={Leaderboard} />
			<ProtectedRoute path="/tournois" exact component={Tournament} />
			<ProtectedRoute path="/tournament" exact component={Tournois} />
			<ProtectedRoute path="/tournament-game" exact component={TournamentGame} />
			<ProtectedRoute path="/info" exact component={Info} />
			<ProtectedRoute path="/bracket" exact component={Bracket} />
			<ProtectedRoute path="/matches" exact component={Matches} />
			<ProtectedRoute path="/teams" exact component={Teams} />
			<ProtectedRoute path="/rules" exact component={Rules} />
			<ProtectedRoute path="/wager" exact component={Wager} />
			<ProtectedRoute path="/joingame" exact component={Joingame} />
			<ProtectedRoute path="/waggers" exact component={Waggers} />
			<ProtectedRoute path="/tableau" exact component={Tableau} />
			<ProtectedRoute path="/waggers-rules" exact component={WaggersRules} />
			<ProtectedRoute path="/waggers-game" exact component={WaggersGame} />
			<ProtectedRoute path="/view" exact component={View} />
			<ProtectedRoute path="/lobby" exact component={Lobby} />
			<ProtectedRoute path="/communaute" exact component={Communaute} />
			<ProtectedRoute path="/assistant" exact component={Assistant} />
			<ProtectedRoute path="/assistance" exact component={Assistance} />
			<ProtectedRoute path="/contact" exact component={Contact} />
			<ProtectedRoute path="/profil" exact component={Profil} />
			<ProtectedRoute path="/parametre" exact component={Parametre} />
			<ProtectedRoute path="/update-password" exact component={UpdatePassword} />
			<ProtectedRoute path="/jackpot" exact component={Jackpot} />
			<ProtectedRoute path="/mygames" exact component={Mygames} />
			<ProtectedRoute path="/update-password" exact component={UpdatePassword} />
			<Route path="/login" exact component={Login} />
			<Route path="/inscription" exact component={Inscription} />
			<Route path="/register" exact component={Register} />
			<ProtectedRoute path="/game" exact component={Game} />
			<ProtectedRoute path="/account" exact component={Account} />
			<Route path="/forgot-password" exact component={InitPass} />
		</Switch>
	)
}

export default Router
