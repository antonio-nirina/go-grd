import React,{useEffect,useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"

import {UPDATED_ALL_TEAM,DELETED_TEAM} from "../../../gql/team/mutation"

type Inputs = {
	name:string,
	tag:string
}

type ManagementType = {
	name:string|undefined,
	tag:string|undefined,
	uid:string|undefined
}

const EditOrDelete = function({name,tag,uid}:ManagementType) {
	const [message, setMessage] = useState<string>("")
	const [messageError, setMessageError] = useState<string>("")
	const { register, handleSubmit,setValue } 	= useForm<Inputs>()
	const [updatedTeam]  = useMutation(UPDATED_ALL_TEAM)
	const [deletedTeam]  = useMutation(DELETED_TEAM)

	useEffect(() => {
		setValue("name", name??"")
	},[])

	const onSubmit = async function(data:Inputs){
		try {
			if(data.name && data.tag) {
				const updated = await updatedTeam({variables:{
					uid:uid,
					name:data.name,
					bann:"",
					bannType:"",
					creationDate:"",
					players:"",
					logo:"",
					creator:"",
					tag:data.tag,
					description:"",
					logoType:""
				}})
				if(updated) setMessage(`Modification succèss`)
			} else {
				const deleted = await deletedTeam({
					variables:{
						uid:uid
					}
				})
				if(deleted) setMessage(`Team à été supprimer avec succèss`)
			}
		} catch(error:any) {
			setMessageError(error.toString())
		}


	}
	return (
		<div className="name_popup edit">
			<div style={{textAlign:"center"}}>{message}</div>
			<div style={{textAlign:"center","color":"#dd0000"}}>{messageError}</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Team Name" {...register("name")}  />
				<input type="text" placeholder="Tag" {...register("tag")} />
				<div className="next-btn">
					<button type="submit" className="btn bg-red">Edit the team</button>
					<button className="btn bg-green">Delete the team</button>
				</div>
			</form>
		</div>
	)
}

export default EditOrDelete
