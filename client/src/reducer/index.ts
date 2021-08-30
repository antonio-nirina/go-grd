import { combineReducers } from "redux"

import {userConnectedReducer} from "../views/auth/reducer/userReducer"
import {LeagueReducer} from "../views/league/reducer/leagueReducer"
import {TournamentReducer} from "../views/tournament/reducer/tournamentReducer"

export const rootReducer = combineReducers({
	userConnected: userConnectedReducer,
	LeagueReducer:LeagueReducer,
	TournamentReducer:TournamentReducer,
})

export type RootState = ReturnType<typeof rootReducer>
