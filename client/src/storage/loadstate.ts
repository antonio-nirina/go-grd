import Cookies from 'js-cookie'
import {GetCookie} from "../views/auth/utils"

export const loadState 	=  function() {
	const user :string | null = GetCookie("userConnected")
	// const singUpLeague :string | null  = localStorage.getItem("leagueSingin")
	//const singUpTournament :string | null  = GetCookie("tournamentSingin")

	let storage = {
		userConnected:{
			user:{}
		},
		tournamentSingin:{
			tournament:[{
				uidTournament:"",
				userUid:"",
				part:false,
				numberPart:0,
				confirmed:0
				}
			]
		},
		partTournament:{
			tournament:[
				{
					uidTournament:"",
					userUid:"",
					confirmed:0
				}
			]
		}
	}

	if(user){
		storage.userConnected.user = user
	}

	// if(singUpTournament) storage.tournamentSingin.tournament = singUpTournament

	return storage
}

export const saveState = function(state:any,name:string) {
	const serializedState = JSON.stringify(state)
	Cookies.set(name, serializedState)
}
