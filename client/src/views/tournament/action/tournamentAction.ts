import {loadState} from "../../../storage/loadstate"

export const TOURNAMENT_REGISTER = "tournament_register"

export interface Input{
	uidTournament:string|null
	userUid:string|null
	part:boolean
	numberPart:number
	confirmed:number
}

export const RegisterTournamentAction = function(data:Input) {
	const store = loadState().tournamentSingin.tournament
	if(loadState().tournamentSingin.tournament.length > 0) {
		store.forEach(function(el:Input,index:number) {
			if((el.uidTournament === "" && el.userUid === "") || (el.uidTournament === data.uidTournament && el.userUid === data.userUid)) {
				store[index] = {
						uidTournament:data.uidTournament??"",
						userUid:data.userUid??"",
						part:data.part,
						numberPart:data.numberPart,
						confirmed:data.confirmed
				}
			} else {
				store.push(
					{
						uidTournament:data.uidTournament??"",
						userUid:data.userUid??"",
						part:data.part??false,
						numberPart:data.numberPart??0,
						confirmed:data.confirmed??0
					}
				)
			}
		})
	} else {
		store.push(
			{
				uidTournament:data.uidTournament??"",
				userUid:data.userUid??"",
				part:data.part??false,
				numberPart:data.numberPart??0,
				confirmed:data.confirmed??0
			}
		)
	}

	return {
   		type:TOURNAMENT_REGISTER,
   		res:store??[]
 	}
}
