import {USER_CONNECTED} from "../action/userAction"

const initialState = {
	user:{}
}

export const userConnectedReducer = function (state = initialState, action:any) {
  switch (action.type) {
    case USER_CONNECTED:
      return { ...state, user: action.res}
    default:
      return state
  }
}
