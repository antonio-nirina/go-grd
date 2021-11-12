import {Game,Platform} from "./tournament"

export interface Wagger {
	uid:string|undefined
	title:string|undefined
	statut:boolean|undefined
	description:string|undefined
	deadlineDate:string|""
	format:string|undefined
	date:string|""
	price:number|undefined
	priceParticipate:number|undefined
	participant:number|undefined
	isPublic:boolean|undefined
	game:Game
	plateform:Platform[]
	gameWay:string|undefined
}
