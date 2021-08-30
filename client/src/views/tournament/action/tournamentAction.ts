export const TOURNAMENT_REGISTER = "tournament_register"

interface Input{
	uidTournament:string
	userUid:string
}

export const RegisterTournamentAction = function(data:Input) {
	return {
   		type:TOURNAMENT_REGISTER,
   		res:data??{}
 	}
}