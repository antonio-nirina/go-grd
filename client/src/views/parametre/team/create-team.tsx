import React, {useState} from "react"
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import {  faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux"

import {RootState} from "../../../reducer"
import {SAVED_NEW_TEAM} from "../../../gql/team/mutation"

type Inputs = {
	name:string,
	tag:string,
	description:string,
}

type CreateType = {
	handleOpen:Function,
	showPopup:boolean
	handleTeam:Function,
}

const CreateTeam = function({handleOpen,showPopup,handleTeam}:CreateType) {
	const [isShow, setIsShow] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

	const { register, handleSubmit } = useForm<Inputs>()
	const onPopup = function(){
		handleOpen(false)
		setIsShow(false)
	}
	const [createdTeam]  = useMutation(SAVED_NEW_TEAM)

	const onSubmit = async function(data:Inputs){
		const teamCreated = await createdTeam({ variables: {
			name: data.name,
			creationDate:(new Date()).toISOString(),
			players:[userConnectedRedux.user.uid].join("_"),
			description:data.description ? data.description : "",
			tag:data.tag,
			creator:userConnectedRedux.user.uid
		} })

		if(teamCreated.data.createTeam) {
			handleTeam(teamCreated.data.createTeam)
			handleOpen(false)
		}
	}

	return (
		<div className={!isShow && !showPopup   ? "d-none" :"popup_team"}>
			<div className="title_popup">
				<h3>Team creation</h3>
				<i><FontAwesomeIcon icon={faTimes} onClick={onPopup}/></i>
			</div>
			<div className="name_popup">
				<p>Give a name to your team :</p>
				<form  onSubmit={handleSubmit(onSubmit)}>
					<input id="name" type="text" {...register("name")} name="name" placeholder="Team Name" />
					<input id="tag" type="text" {...register("tag")} name="tag" placeholder="Team Tag" />
					<input id="description" type="text" {...register("description")} name="description" placeholder="Team Description" />
					<button className="btn bg-red">Create the team</button>
				</form>
			</div>
		</div>

	)
}

export default CreateTeam
