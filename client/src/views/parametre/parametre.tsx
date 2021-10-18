import React from "react"
import { useForm } from "react-hook-form"

import { useSelector } from "react-redux"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"

import { faTwitch, faYoutube, faFacebook, faXbox, faPlaystation, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {RootState} from "../../reducer"
import Sidebar from "./sidebar"

type Inputs = {
	email:string,
	firstname:string,
	username:string,
	country:string,
	birtDate:string
}

const Settings: React.FC = function() {
	const { register, handleSubmit } 	= useForm<Inputs>()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const onSubmit = async function(data:Inputs){
		
	}
  return(
	<div className="leaderboard settings">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mes_infos">
					<h2>Paramètres</h2>
					<div className="title-lead">						
						<Sidebar />
						<div className="personal">
							<h3>informations personnelles</h3>
							<form className="personal-field" onSubmit={handleSubmit(onSubmit)}>
								<div className="field-container">
									<label htmlFor="email">E-mail</label>
									<input id="email" type="email" value={userConnectedRedux.user.email} {...register("email")} name="email" />
								</div>
								<div className="field-middle">
									<div className="field-container">										
										<input type="text" value={userConnectedRedux.user.firstname} {...register("firstname")} name="firstname" />
									</div>
									<div className="field-container">										
										<input type="text" value={userConnectedRedux.user.lastname} />
									</div>									
								</div>
								<div className="field-middle">
									<div className="field-container">
										<label htmlFor="pseudo">Pseudo</label>
										<input id="pseudo" type="text" value={userConnectedRedux.user.username} {...register("username")} name="username" />
									</div>
									<div className="field-container">
										<label htmlFor="pays">Pays</label>
										<input id="pays" type="text" value={userConnectedRedux.user.country} {...register("country")} name="country" />										
									</div>
								</div>
								<div className="field-container">
									<label htmlFor="date">Date de naissance</label>
									<input type="text" value={userConnectedRedux.user.birtDate} {...register("birtDate")} name="birtDate" />
								</div>
							</form>							
							<h3>Réseaux sociaux</h3>							
							<div className="rss-view">
								<div className="double">
									<div className="reseau-container">
										<div className="rss-container">
											<i><FontAwesomeIcon icon={faTwitch} /></i>
											<p>									
												<strong>Twitch</strong>
												<span>Skouinar</span>
											</p>
										</div>									
									</div>
									<div className="reseau-container">
										<div className="rss-container">
											<i><FontAwesomeIcon icon={faYoutube} /></i>
											<p>									
												<strong>Youtube</strong>
												<span>Non connecté</span>
											</p>
										</div>									
									</div>
									<div className="reseau-container">
										<div className="rss-container">
											<i><FontAwesomeIcon icon={faFacebook} /></i>
											<p>									
												<strong>Facebook</strong>
												<span>Non connecté</span>
											</p>
										</div>									
									</div>
								</div>
								<div className="double">
									<div className="reseau-container">
										<div className="rss-container">
											<i><FontAwesomeIcon icon={faXbox} /></i>
											<p>									
												<strong>Xbox</strong>
												<span>Skouinar</span>
											</p>
										</div>									
									</div>
									<div className="reseau-container">
										<div className="rss-container">
											<i><FontAwesomeIcon icon={faPlaystation} /></i>
											<p>									
												<strong>Playstation</strong>
												<span>Non connecté</span>
											</p>
										</div>									
									</div>
									<div className="reseau-container">
										<div className="rss-container">
											<i><FontAwesomeIcon icon={faTwitter} /></i>
											<p>									
												<strong>Twiiter</strong>
												<span>@Skouinar</span>
											</p>
										</div>									
									</div>
								</div>	
							</div>
							<div className="btn-container">
								<button className="btn bg-red">Enregistre les modifications</button>
							</div>
						</div>
					</div>				
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	);
}

export default Settings;
