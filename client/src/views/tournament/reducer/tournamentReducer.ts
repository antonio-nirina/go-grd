import {TOURNAMENT_REGISTER} from "../action/tournamentAction"

const initialState = {
	tournament:{}
}

export const TournamentReducer = function (state = initialState, action:any) {
  switch (action.type) {
    case TOURNAMENT_REGISTER:
      // return { ...state, tournament: action.res}
      return { ...state, tournament:{
      		...[action.res.uidTournament],
      		userUid: action.res.userUid,
      		part: action.res.part,
      		numberPart: action.res.numberPart,
      		confirmed:action.res.confirmed}
      	}
    default:
      return state
  }
}
