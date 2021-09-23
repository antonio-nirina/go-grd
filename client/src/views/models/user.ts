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