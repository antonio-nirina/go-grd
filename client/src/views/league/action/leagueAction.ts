export const LEAGUE_REGISTER = "league_register"

export interface Input{
	uidLeague:string|null
	userUid:string|null
	part:boolean
}

export const RegisterLeagueAction = function(data:Input) {
	return {
   		type:LEAGUE_REGISTER,
   		res:data??{}
 	}
}
