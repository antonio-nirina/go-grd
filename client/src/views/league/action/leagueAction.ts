export const LEAGUE_REGISTER = "league_register"

interface Input{
	uidLeague:string
	userUid:string
}

export const RegisterLeagueAction = function(data:Input) {
	return {
   		type:LEAGUE_REGISTER,
   		res:data??{}
 	}
}