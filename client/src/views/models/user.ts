import {GameType} from "./game"
export interface USerModel {
    uid:string
    firstname:string
    lastname:string
    username:string
    email:string
    avatar:string
    roles:Array<string>
    language:string
    Friends:Array<USerModel>
}

export interface GameUserModel {
	uid:string
	Email:string
	Games:GameType
}
