import Cookies from 'js-cookie'
import {GetCookie} from "../views/auth/utils"

export const loadState 	=  function() {
	const user :string | null = GetCookie("userConnected")
	const singUpLeague :string | null  = localStorage.getItem("leagueSingin")
	const singUpTournament :string | null  = localStorage.getItem("tournamentSingin")
	let storage = {
		userConnected:{
			user:{}
		},
		leagueSingin:{
			league:{
				uidLeague:"",
				userUid:"",
				part:false
			}
		},
		tournamentSingin:{
			tournament:{
				uidTournament:"",
				userUid:"",
				part:false
			}
		}
	}

	if(user){
		storage.userConnected.user = user
	}

	if(singUpLeague) storage.leagueSingin.league.part = Boolean(singUpLeague)
	if(singUpTournament) storage.tournamentSingin.tournament.part = Boolean(singUpTournament)

	return storage
}

export const saveState = function(state:any,name:string) {
	const serializedState = JSON.stringify(state)
	Cookies.set(name, serializedState)
}
