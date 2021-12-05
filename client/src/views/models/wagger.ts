import {Game,Platform} from "./tournament"

export interface Wagger {
	uid:string
	title:string
	statut:boolean
	description:string
	deadlineDate:string|""
	format:string
	date:string|""
	price:number
	priceParticipate:number
	participant:number
	isPublic:boolean
	game:Game
	plateform:Platform[]
	gameWay:string
}
