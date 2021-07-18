import { combineReducers } from "redux"

import {userConnectedReducer} from "../auth/reducer/userReducer"

export const rootReducer = combineReducers({
	userConnected: userConnectedReducer,
})

export type RootState = ReturnType<typeof rootReducer>
