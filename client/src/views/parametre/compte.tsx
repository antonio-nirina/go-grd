import React, {useState} from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
import Sidebar from "./sidebar"

import AvatarDefault from "../../assets/image/game-tag.png"

import { faPlusCircle, faTimes, faCamera, faPen, faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Team: React.FC = function() {
  	const [showPopup, setShowPopup] = useState<Boolean>(false)
	const onPopup = function(){
		setShowPopup(!showPopup)
	}
  return(
	<div className="leaderboard settings">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mon_compte">
					<div className="title-lead">
						<Sidebar />
						<div className="personal">
							<div className="my_account">
								<div className="img_account">
									<img src= {AvatarDefault} alt="" width="150" height="150"/>
									<i className={showPopup ? "d-none" :"set"} onClick={onPopup}><FontAwesomeIcon icon={faPen} /></i>
									<p className={showPopup ? "icon-settings" :"d-none"}>
										<i><FontAwesomeIcon icon={faCamera} /></i>
										<i><FontAwesomeIcon icon={faTimes} /></i>
										<i><FontAwesomeIcon icon={faSync} /></i>
									</p>
								</div>
								<div className={showPopup ? "d-none" :"actual_account"}>
									<p className="account_name">TESTOSTAZ</p>
									<p className="account_name">#6177DED78FB09800502913E4</p>
									<p className="adhesion">Membre depuis 26 Octobre 2021</p>
									<p className="account_info">
										<span>Age : 51</span>
										<span>Pays : Albanie</span>
										<span>Langue : fr</span>
									</p>
								</div>
								<div className={!showPopup ? "d-none" :"edit_account"}>
									<form>
										<div className="input_group">
											<label htmlFor="Pseudo">Pseudo</label>
											<input type="text" id="pseudo" value="testostaz"/>
										</div>
										<div className="input_group">
											<label htmlFor="birth">Date de naissance</label>
											<input type="text" id="birth" value="01/02/2001"/>
										</div>
										<div className="input_group">
											<label htmlFor="country">Pays</label>
											<select id="country">
												<option>Népal</option>
												<option>France</option>
											</select>
										</div>
										<div className="input_group">
											<label htmlFor="language">Langue</label>
											<select id="language">
												<option>Français</option>
												<option>Anglais</option>
											</select>
										</div>
										<div className="btn-select">
											<button className="btn bg-red">Mettre à jour</button>
											<button className="btn bg-white">Annuler</button>
										</div>
									</form>
								</div>
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
