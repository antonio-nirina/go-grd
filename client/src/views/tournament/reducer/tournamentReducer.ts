import {TOURNAMENT_REGISTER} from "../action/tournamentAction"

const initialState = {
	part:{}
}

export const TournamentReducer = function (state = initialState, action:any) {
  switch (action.type) {
    case TOURNAMENT_REGISTER:
      return { ...state, part: action.res}
    default:
      return state
  }
}
