import {User} from "./tournament"

export interface TeamModel {
	uid:string
	name:string
	creationDate:string
	creator:User
	players:User[]
	records:number
	banniere:string
}
