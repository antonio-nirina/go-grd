import React, {useState,useEffect} from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import {useMutation} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
import Sidebar from "./sidebar"
import {RootState} from "../../reducer"
import AvatarDefault from "../../assets/image/game-tag.png"
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {TeamModel} from "../models/team"
import {GET_ONE_TEAM_BY_USER} from ".././../gql/team/query"
import { dateLongCreated } from "../tools/dateConvert"
import {SAVED_NEW_TEAM} from "../../gql/team/mutation"

type Inputs = {
	name:string,
	tag:string,
	description:string,

}

const Team: React.FC = function() {
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [teams, setTeams] = useState<TeamModel[]>([])
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  	const [showPopup, setShowPopup] = useState<boolean>(false)
	const onPopup = function(){
		setShowPopup(!showPopup)
	}
	const [createdTeam]  = useMutation(SAVED_NEW_TEAM)

	const {loading,error,data} 	= useQuery(GET_ONE_TEAM_BY_USER, {
		variables: {
			uid:userConnectedRedux.user.uid,
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setTeams(data.FindTeamByUser)
		}
	},[loading,error,data])

	const onSubmit = async function(data:Inputs){
		const teamCreated = await createdTeam({ variables: {
			name: data.name,
			creationDate:(new Date()).toISOString(),
			players:"",
			logo:"",
			description:data.description,
			tag:data.tag,
			logoType:"",
			creator:userConnectedRedux.user.uid
		} })

		if(teamCreated.data.createTeam) {
			setShowPopup(false)
			setTeams([...teams,teamCreated.data.createTeam])
		}
	}

  return(
	<div className="leaderboard settings">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mes_equipes">
					<div className="title-lead">
						<Sidebar />
						<div className="personal">
							<h2>Mes équipes</h2>
							{
								teams?.map(function(tem:TeamModel,index:number) {
									return (
										<Link to={`/edit-team/${tem.uid}`} title="" className="my_team" key={index}>
											<img src={tem.banniere} alt={`team-gamer-${tem.name}`} />
											<strong>{tem.name}</strong>
											<div className="team_infos" >
												<div className="info_title">
													<p>{tem.creator}</p>
													<p>Team Owner</p>
													<p>{tem.players}</p>
												</div>
												<div className="team_data">
													<p>{dateLongCreated(tem.creationDate)}</p>
													<p>{tem.creator}</p>
													<p>{tem.players.length === 0 ? 1 : tem.players.length}</p>
												</div>
											</div>
										</Link>
									)
								})
							}
							<div className="add_team" onClick={onPopup}>
								<i><FontAwesomeIcon icon={faPlusCircle} /></i>
								<p>Create a team</p>
							</div>
						</div>
						<div className={!showPopup ? "d-none" :"popup_team"}>
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
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default Team
