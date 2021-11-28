import {TOURNAMENT_REGISTER,TOURNAMENT_PART} from "../action/tournamentAction"

const initialState = {
	tournament:{}
}

export const TournamentReducer = function (state = initialState, action:any) {
  switch (action.type) {
    case TOURNAMENT_REGISTER:
      return { ...state, tournament: action.res}
	case TOURNAMENT_PART:
		return { ...state, tournament: action.res}
    default:
      return state
  }
}
