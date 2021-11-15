import React, {useState} from "react"

import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
import Sidebar from "./sidebar"
import {RootState} from "../../reducer"
import AvatarDefault from "../../assets/image/game-tag.png"
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Team} from "../models/team"


const Team: React.FC = function() {

	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  	const [showPopup, setShowPopup] = useState<Boolean>(false)
	const onPopup = function(){
		setShowPopup(!showPopup)
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
							<div className="my_team">
								<img src={userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar :AvatarDefault} alt="" width="150" height="150"/>
								<strong>GROWTHMARKET</strong>
								<div className="team_infos">
									<div className="info_title">
										<p>Created</p>
										<p>Team Owner</p>
										<p>players</p>
									</div>
									<div className="team_data">
										<p>25 Oct 2021</p>
										<p>Testostaz</p>
										<p>1</p>
									</div>
								</div>
							</div>
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
								<form>
									<input type="text" placeholder="Team Name"/>
									<input type="text" placeholder="Team Tag"/>
									<input type="text" placeholder="Team Description"/>
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
