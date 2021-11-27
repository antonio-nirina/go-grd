import React, {useState,useMemo} from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"

import Header from "../../header/header"
import Footer from "../../footer/footer"
import "../../parametre/parametre.css"
import Sidebar from "../sidebar"
import {RootState} from "../../../reducer"
// import AvatarDefault from "../../assets/image/game-tag.png"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {TeamModel} from "../../models/team"
import {GET_ONE_TEAM_BY_USER} from "../../../gql/team/query"
import { dateLongCreated } from "../../tools/dateConvert"

import { User } from "../../models/tournament"
import LogoTeam from "../../../assets/image/team/logo-team.jpg"
import CreateTeam from "./create-team"


const Team: React.FC = function() {
	const [showPopup, setShowPopup] = useState<boolean>(false)
	const [teams, setTeams] = useState<TeamModel[]>([])
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

	const {loading,error,data} 	= useQuery(GET_ONE_TEAM_BY_USER, {
		variables: {
			uid:userConnectedRedux.user.uid,
		},
	})

	useMemo(() => {
		if(!loading && !error && data) {
			setTeams(data.FindTeamByUser)
		}

	},[loading,error,data])

	const onOpen = function(isOpen:boolean){
		setShowPopup(isOpen)
	}

	const onPopup = function() {
		setShowPopup(!showPopup)
	}

	const updatedTeam = function(newTeam:TeamModel) {
		setTeams([...teams,newTeam])
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
								teams.length > 0 ? teams?.map(function(tem:TeamModel,index:number) {
									return (
										<Link to={`/edit-team/${tem.uid}`} key={index} title="" className="my_team">
											<img src={tem.banniere ? tem.banniere : LogoTeam} width="150" height="150" alt=""/>
											<strong>{tem.name}</strong>
											<div className="team_infos" >
												<div className="info_title">
													<p>Created</p>
													<p>Team Owner</p>
													{tem.players.map(function(user:User,indic:number){
														return (
															<span key={indic}>
																<p>{user.lastname}</p>
																<p>{user.firstname}</p>
															</span>
														)
													})}
													<p>Players</p>

												</div>
												<div className="team_data">
													<p className="left">{dateLongCreated(tem.creationDate)}</p>
													<p className="center">{tem.creator}</p>
													<p className="center">{tem.players.length === 0 ? 1 : tem.players.length}</p>
												</div>
											</div>
										</Link>
									)
								}) : <></>
							}
							<div className="add_team" onClick={onPopup}>
								<i><FontAwesomeIcon icon={faPlusCircle} /></i>
								<p>Create a team</p>
							</div>
						</div>
						<CreateTeam
							handleOpen={onOpen}
							showPopup={showPopup}
							handleTeam={updatedTeam}
						/>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default Team
