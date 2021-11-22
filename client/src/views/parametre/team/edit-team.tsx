import React, {useState,useMemo,useRef} from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"

import Header from "../../header/header"
import Footer from "../../footer/footer"
import "../../parametre/parametre.css"
import Sidebar from "../sidebar"
import {RootState} from "../../../reducer"
import AvatarDefault from "../../../assets/image/game-tag.png"
import { faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {GET_ONE_TEAM} from "../../../gql/team/query"
import {TeamModel} from "../../models/team"

import ImageTeam from "../../../assets/image/team/bg-team.jpg"
import LogoTeam from "../../../assets/image/team/logo-team.jpg"
import EditOrDelete from "./EditDelete"
import ElementTeam from "./elementTeam"

const EditTeam: React.FC = function() {
	const contentFile = useRef<HTMLInputElement>(null)
	const contentBannier = useRef<HTMLInputElement>(null)
	const { uid } = useParams<any>()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  	const [showPopup, setShowPopup] = useState<boolean>(false)
  	const [showInvitation, setInvitation] = useState<Boolean>(false)
	const [team, setTeam] = useState<TeamModel>()

	const {loading,error,data} 	= useQuery(GET_ONE_TEAM, {
		variables: {
			uid:uid,
		},
	})

	useMemo(() => {
		if(!loading && !error && data) {
			setTeam(data.FindOneTeam)
		}

	},[loading,error,data])
	const onPopup = function(){
		setShowPopup(!showPopup)
	}
	const Invitation = function(){
		setInvitation(!showInvitation)
	}
	const handleUploadLogo = function() {
		contentFile.current?.click()
	}
	const handleUploadBannier = function() {
		contentBannier.current?.click()
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
							<input type="file" name="logo" ref={contentFile} className="d-none"  />
							<input type="file" name="banniere" className="d-none" />
							<div
								style={{ backgroundImage:`url(${team?team.logo : ImageTeam})`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat',cursor:"pointer" }}
								className="bg-team"
								onClick={handleUploadLogo}
							>
								<div className="logoteam_container">
									<div className="logo-team">
										<img src={team ? team.banniere : LogoTeam} alt="team-game" className="logo-team" onClick={handleUploadBannier}/>
									</div>
								</div>
							</div>
							<div className="add_team edit">
								<div className="center">
									<p className="name">{team?.name}</p>
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
							<EditOrDelete name={team?.name} tag={team?.tag} uid={team?.uid} />
						</div>
						<div className={!showInvitation ? "d-none" :"popup_team"}>
							<div className="title_popup">
								<h3>Invite member to your team</h3>
								<i><FontAwesomeIcon icon={faTimes} onClick={Invitation}/></i>
							</div>
							<ElementTeam uid={team?.uid} />
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
