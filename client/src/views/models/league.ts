import {Game,Platform} from "./tournament"

export interface League {
	uid:string
	title:string
	statut:boolean
	organizer:string
	numberTeam:number
	description:string
	deadlineDate:string
	date:string
	price:number
	priceParticipate:number
	numberParticipate:number
	rules:string
	isTeam:boolean
	isPublic:boolean|undefined
	game:Game
	plateform:Platform
}
