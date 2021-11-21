import {User} from "./tournament"

export interface TeamModel {
	uid:string
	name:string
	creationDate:string
	creator:string
	logo:string
	players:User[]
	records:number
	banniere:string
	tag:string
}
