import React,{useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"


import {UPDATED_ALL_TEAM} from "../../../gql/team/mutation"

type Inputs = {
	username:string,
}

type ElementType = {
	uid:string|undefined
}

const ElementTeam = function({uid}:ElementType) {
	const [message, setMessage] = useState<string>("")
	const [messageError, setMessageError] = useState<string>("")
	const { register, handleSubmit } = useForm<Inputs>()
	const [updatedTeam]  = useMutation(UPDATED_ALL_TEAM)
	const onSubmit = async function(data:Inputs){
		try {
			const updated = await updatedTeam({variables:{
				uid:uid,
				name:"",
				bann:"",
				bannType:"",
				creationDate:"",
				players:data.username+"_",
				logo:"",
				creator:"",
				tag:"",
				description:"",
				logoType:""
			}})
			if(updated) setMessage(`${data.username} a été inviter dans votre team`)
		} catch(error:any) {
			setMessageError(error.Error)
		}
	}
	return (
		<div className="name_popup edit">
			<div style={{textAlign:"center"}}>{message}</div>
			<div style={{textAlign:"center","color":"#dd0000"}}>{messageError}</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Add name" {...register("username")} />
				<div className="next-btn">
					<button type="submit" className="btn bg-green">Ajouter</button>
					<div className="btn bg-red">Annuler</div>
				</div>
			</form>
		</div>
	)
}

export default ElementTeam
