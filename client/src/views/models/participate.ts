import {User,Tournament} from "./tournament"
import {Wagger} from "./wagger"

export interface ParticipateTournament {
	uid:string
	date:string
	isWin:string
	tournament:Tournament
	user:User
	team:string
}

export interface ParticipateWagger {
	uid:string
	date:string
	isWin:string
	wagger:Wagger
	user:User
}
