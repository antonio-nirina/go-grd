import {LEAGUE_REGISTER} from "../action/leagueAction"

const initialState = {
	league:{}
}

export const LeagueReducer = function (state = initialState, action:any) {
  switch (action.type) {
    case LEAGUE_REGISTER:
      return { ...state, league: action.res}
    default:
      return state
  }
}
