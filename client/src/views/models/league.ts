import {Game,Platform} from "./tournament"

export interface League {
	uid:string
	title:string
	statut:Boolean
	organizer:string
	numberTeam:number
	deadlineDate:string
	date:string
	price:number
	priceParticipate:number
	slot:number
	rules:string
	isPublic:Boolean|undefined
	game:Game
	plateform:Platform
}
