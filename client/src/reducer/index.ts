import { combineReducers } from "redux"

import {userConnectedReducer} from "../views/auth/reducer/userReducer"
import {LeagueReducer} from "../views/league/reducer/leagueReducer"

export const rootReducer = combineReducers({
	userConnected: userConnectedReducer,
	LeagueReducer:LeagueReducer,
})

export type RootState = ReturnType<typeof rootReducer>
