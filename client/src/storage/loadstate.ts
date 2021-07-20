import Cookies from 'js-cookie'
import {GetCookie} from "../views/auth/utils"

export const loadState 	=  function() {
	const user :string | null = GetCookie("userConnected")
	let storage = {
		userConnected:{
			user:{}
		},
	}

	if(user){
		storage.userConnected.user = user
	}

	return storage
}

export const saveState = function(state:any,name:string) {
	const serializedState = JSON.stringify(state)
	Cookies.set(name, serializedState)
}
