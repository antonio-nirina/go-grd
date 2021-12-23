export interface Tournament {
	uid:string
	title:string
	statut:boolean
	description:string
	numberParticipate:number
	gameWay:string
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
	isPublic:boolean
	region:string
	game:Game
	plateform:Platform[]
	spectateur:string
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


