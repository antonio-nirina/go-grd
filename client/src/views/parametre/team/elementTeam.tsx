import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"

import {GetUserFilter} from "../../commons/common-query"
import {UPDATED_ALL_TEAM} from "../../../gql/team/mutation"
import {User} from "../../models/tournament"
import avatar from "../../../assets/image/game-tag.png"
import "./team.css"

type Inputs = {
}

type ElementType = {
	uid:string|undefined
}

type UserSelect = {
	uid:string,
	username:string
}

const ElementTeam = function({uid}:ElementType) {
	const [message, setMessage] = useState<string>("")
	const [messageError, setMessageError] = useState<string>("")
	const [usernames, setUsernames] = useState<User[]>([])
	const [listUsername, setListUsername] = useState<string>("")
	const [userSelected, setUserSelected] = useState<UserSelect[]>([])
	const [listUid, setListUid] = useState<string>("")

	const {  handleSubmit } = useForm<Inputs>()
	const [updatedTeam]  = useMutation(UPDATED_ALL_TEAM)

	const onSubmit = async function(data:Inputs){
		try {
			const updated = await updatedTeam({variables:{
				uid:uid,
				name:"",
				bann:"",
				bannType:"",
				creationDate:"",
				players:listUid,
				logo:"",
				creator:"",
				tag:"",
				description:"",
				logoType:""
			}})
			if(updated) setMessage(`${listUsername}} a été inviter dans votre team`)
		} catch(error:any) {
			setMessageError(error.Error)
		}
	}
	const handleUsername = async function(event:React.FormEvent<HTMLInputElement>) {
		if(event.currentTarget.value.split("").length === 3) {
			const usernames = await GetUserFilter(event.currentTarget.value)
			if(usernames) {
				let array:User[] = []

				usernames.forEach((element:User) => {
					array.push({
						uid:element.uid,
						firstname:element.firstname,
						lastname:element.lastname,
						email:element.email,
						username:element.username,
						avatar:element.avatar,
						language:"",
						point:0
					})
				})
				setUsernames(array)

			}
		}
	}

	const handleSelected = function(user:User) {
		const checked = userSelected.find((e:UserSelect) => user.uid === e.uid)
		if(!checked) {
			let listArray:string[] = []
			let listUidArray:string[] = []
			let element:UserSelect = {
				uid:user.uid,
				username:user.username
			}
			setUserSelected([...userSelected,element])
			userSelected.forEach(function(selected:UserSelect) {
				listArray.push(selected.username)
				listUidArray.push(selected.uid)
			})
			setListUsername(listArray.join(" "))
			setListUid(listUidArray.join("_"))
		}
	}

	const handleRemoved = function(uid:string) {
		let newElement = userSelected.filter((el:UserSelect) => el.uid !== uid )
		setUserSelected(newElement)
	}

	return (
		<div className="name_popup edit">
			<div style={{textAlign:"center"}}>{message}</div>
			<div style={{textAlign:"center","color":"#dd0000"}}>{messageError}</div>
			<div style={{"fontSize":"10px","textAlign":"center"}}>Tu peux ajouter des utilisateurs sur Go-Grind</div>
			<div className="group-team">
				{userSelected.map(function(params:UserSelect,index:number) {
					return(
						<div className="choice-team" key={index}>
							<div className="username-choice">{params.username}</div>
							<div className="close-rem" onClick={()=>handleRemoved(params.uid)}>
								&times;
							</div>
						</div>
					)
				})}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Add name" onKeyUp={handleUsername} />
				<div className="">
					{usernames.map(function(el:User,index:number){
						return (
							<div className="list-user"  key={index} onClick={() => handleSelected(el)}>
								<div className="image-avatar">
									<img src={el.avatar ? el.avatar : avatar} style={{"width":"29px", "height":"29px","borderRadius":"25px"}} alt={el.uid} />
								</div>
								<div className="username">{el.username}</div>
							</div>
						)
					})}
				</div>
				<div className="next-btn">
					<button type="submit" className="btn bg-green">Ajouter</button>
					<div className="btn bg-red">Annuler</div>
				</div>
			</form>
		</div>
	)
}

export default ElementTeam
