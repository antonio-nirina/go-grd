export interface Tournament {
	uid:string
	title:string
	statut:Boolean
	description:string
	numberParticipate:number
	numberTeam:number
	format:string
	deadlineDate:string
	winners:string[]
	tchat:string
	dateStart:string
	price:string[]
	priceParticipate:string
	rules:string
	isTeam:boolean
	maps:string
	laps:string[]
	server:string
	isPublic:Boolean|undefined
	region:string
	game:Game
	plateform:Platform[]
}

export interface Game {
	uid:string
	name:string
	image:string
	logo:string
	slug:string
}

export interface Platform {
	uid:string
	description:string
	name:string
}

export interface User {
	uid:string
	firstname:string
	lastname:string
	email:string
	username:string
	avatar:string
	language:string
	point:number
}
