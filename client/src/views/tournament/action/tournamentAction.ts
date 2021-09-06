export const TOURNAMENT_REGISTER = "tournament_register"

export interface Input{
	uidTournament:string|null
	userUid:string|null
	part:boolean
	numberPart:number
	confirmed:number
}

export const RegisterTournamentAction = function(data:Input) {
	return {
   		type:TOURNAMENT_REGISTER,
   		res:data??{}
 	}
}
