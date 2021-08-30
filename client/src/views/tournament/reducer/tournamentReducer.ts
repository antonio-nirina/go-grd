import {TOURNAMENT_REGISTER} from "../action/tournamentAction"

const initialState = {
	tournament:{}
}

export const TournamentReducer = function (state = initialState, action:any) {
  switch (action.type) {
    case TOURNAMENT_REGISTER:
      return { ...state, league: action.res}
    default:
      return state
  }
}
