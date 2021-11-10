import {User} from "./tournament"

export interface Team {
	uid:string
	name:string
	creator:User
	players:User[]
	records:number


}
