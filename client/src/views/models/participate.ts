import {User,Tournament} from "./tournament"
import {Wagger} from "./wagger"
import {TeamModel} from "./team"

export interface ParticipateTournament {
	uid:string
	date:string
	isWin:string
	tournament:Tournament
	user:User
	team:TeamModel
}

export interface ParticipateWagger {
	uid:string
	date:string
	isWin:string
	wagger:Wagger
	user:User
}
