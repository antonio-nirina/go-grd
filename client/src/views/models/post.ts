import {User} from "./tournament"

export interface PostModel {
	uid:string
	content:string
	imageType:string
	files:string
	user:User
}
