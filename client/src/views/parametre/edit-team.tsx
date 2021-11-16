import React, {useState} from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
import Sidebar from "./sidebar"
import {RootState} from "../../reducer"
import AvatarDefault from "../../assets/image/game-tag.png"
import { faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Team} from "../models/team"

import ImageTeam from "../../assets/image/team/bg-team.jpg"
import LogoTeam from "../../assets/image/team/logo-team.jpg"

const EditTeam: React.FC = function() {

	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  	const [showPopup, setShowPopup] = useState<Boolean>(false)
  	const [showInvitation, setInvitation] = useState<Boolean>(false)
	const onPopup = function(){
		setShowPopup(!showPopup)
	}
	const Invitation = function(){
		setInvitation(!showInvitation)
	}
  return(
	<div className="leaderboard settings">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mes_equipes">
					<div className="title-lead EditTeam">
						<Sidebar />
						<div className="personal">
							<div style={{ backgroundImage: 'url(' + ImageTeam + ')', backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }} className="bg-team">
								<label htmlFor="Imgteam"></label>
								<div className="logo-team">
									<img src={LogoTeam} alt="" className="logo-team"/>
								</div>
							</div>
							<div className="add_team edit">
								<div className="center">
									<p className="name">Growthmarket</p>
									<p className="info_team">
										<span onClick={onPopup}>Edit Team Infos</span>
										<i onClick={Invitation}><FontAwesomeIcon icon={faUserPlus} /></i>
									</p>
								</div>
								<div className="team-list">
									<p>
										<img src={userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar :AvatarDefault} alt="" width="150" height="150"/>
									</p>
								</div>
							</div>
						</div>
						<div className={!showPopup ? "d-none" :"popup_team"}>
							<div className="title_popup">
								<h3>Team Management</h3>
								<i><FontAwesomeIcon icon={faTimes} onClick={onPopup}/></i>
							</div>
							<div className="name_popup edit">
								<form>
									<input type="text" placeholder="Team Name" value="GrowthMarket"/>
									<input type="text" value="Oui"/>
									<div className="next-btn">
										<button className="btn bg-red">Edit the team</button>
										<button className="btn bg-green">Delete the team</button>
									</div>
								</form>
							</div>
						</div>
						<div className={!showInvitation ? "d-none" :"popup_team"}>
							<div className="title_popup">
								<h3>Invite member to your team</h3>
								<i><FontAwesomeIcon icon={faTimes} onClick={Invitation}/></i>
							</div>
							<div className="name_popup edit">
								<form>
									<input type="text" placeholder="Add name" value=""/>
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

export default EditTeam
