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
import Team from "../parametre/team/team"
import EditTeam from "../parametre/team/edit-team"
import Compte from "../parametre/compte"
import Bracket from "../tournament/bracket"
// import RulesLeague from "../annexe/rules-league"
import Wager from "../wager/wager"
import Waggers from "../waggers/waggers"
import Tableau from "../waggers/tableau"
import WaggersRules from "../waggers/waggersrules"
import WaggersGame from "../waggers/waggersgame"
import Joingame from "../waggers/joingame"
import Resultat from "../waggers/resultat"
import View from "../wager/view"
import Lobby from "../wager/lobby"
import NextAssistance from "../assistance/nextAssistant"
import Contact from "../assistance/contact"
import Communaute from "../communaute/communaute"
import Stream from "../stream/stream"
import Login from "../auth/login"
import Profil from "../profil/profil"
import Parametre from "../parametre/parametre"
import Jackpot from "../parametre/jackpot"
import Mygames from "../parametre/mygames"
import InitPass from "../auth/initpass"
import Code from "../auth/code"
import NewPassword from "../auth/new-password"
import Change from "../auth/change"
import UpdatePassword from "../auth/updatePassword"
import ProtectedRoute from "./protectedRoute"
import Register from "../auth/register"
import Account from "../auth/account"
import Game from "../auth/game"
import TournamentGame from "../tournament/tournament-game"
import PageTournois from "../tournois/tournois"
import WagerPage from "../wagerpage/wager"
import JoinTournament from "../tournament/join-tournament"
import Stat from "../version/stat/stat"
import ConfirmPart from "./confirmPart"
import ContentPaiement from "./contentPaiement"
import GameList from "../auth/game-list"
import TournamentRules from "../tournament/tournament-rules"
import MatchTournament from "../tournament/match-tournament"
// import LeagueGame from "../league/league-game"

const Router = function() {
	return (
		<Switch>
			<Route path="/" exact component={Index} />
			<Route path="/index" exact component={Index} />
			<ProtectedRoute path="/leaderboard" exact component={Leaderboard} />
			<ProtectedRoute path="#" exact component={Tournament} />
			<ProtectedRoute path="/tournament" exact component={Tournois} />
			<ProtectedRoute path="/tournament-game" exact component={TournamentGame} />
			<ProtectedRoute path="/info" exact component={Info} />
			<ProtectedRoute path="/bracket" exact component={Bracket} />
			<ProtectedRoute path="/matches" exact component={Matches} />
			<ProtectedRoute path="/acount/team" exact component={Team} />
			<ProtectedRoute path="/edit-team/:uid" exact component={EditTeam} />
			<ProtectedRoute path="/account" exact component={Compte} />
			<ProtectedRoute path="#" exact component={Wager} />
			<ProtectedRoute path="/joingame" exact component={Joingame} />
			<ProtectedRoute path="/join-tournament" exact component={JoinTournament} />
			<ProtectedRoute path="/result" exact component={Resultat} />
			<ProtectedRoute path="/waggers" exact component={Waggers} />
			<ProtectedRoute path="/board" exact component={Tableau} />
			<ProtectedRoute path="/waggers-rules" exact component={WaggersRules} />
			<ProtectedRoute path="/tournament-rules" exact component={TournamentRules} />
			<ProtectedRoute path="/waggers-game" exact component={WaggersGame} />
			<ProtectedRoute path="/view" exact component={View} />
			<ProtectedRoute path="/lobby" exact component={Lobby} />
			<ProtectedRoute path="/communaute" exact component={Communaute} />
			<ProtectedRoute path="/contact" exact component={Contact} />
			<ProtectedRoute path="/profil" exact component={Profil} />
			<ProtectedRoute path="/setting" exact component={Parametre} />
			<ProtectedRoute path="/acount/jackpot" exact component={Jackpot} />
			<ProtectedRoute path="/acount/mygames" exact component={Mygames} />
			<ProtectedRoute path="/tournois" exact component={PageTournois} />
			<ProtectedRoute path="/wagger" exact component={WagerPage} />
			<ProtectedRoute path="/stat" exact component={Stat} />
			<ProtectedRoute path="/confirmed-join/tournament" exact component={ConfirmPart} />
			<ProtectedRoute path="/payement/tournament" exact component={ContentPaiement} />
			<ProtectedRoute path="/add/game/favorit" exact component={GameList} />
			<ProtectedRoute path="/stream/twitch/:username/:game" exact component={Stream} />
			<ProtectedRoute path="/match-tournament" component={MatchTournament} />
			<Route path="/update-password" exact component={UpdatePassword} />
			<Route path="/game" exact component={Game} />
			<Route path="/login" exact component={Login} />
			<Route path="/register" exact component={Register} />
			<Route path="/account/register" exact component={Account} />
			<Route path="/forgot-password" exact component={InitPass} />
			<Route path="/code" exact component={Code} />
			<Route path="/new-password" exact component={NewPassword} />
			<Route path="/change" exact component={Change} />
			<Route path="/assistance" exact component={NextAssistance} />

		</Switch>
	)
}

export default Router
