import React from "react"
import { Link } from 'react-router-dom'

import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"

import { faTwitch, faYoutube, faFacebook, faXbox, faPlaystation, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Settings: React.FC = function() {
	
  return(
	<div className="leaderboard settings">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt">
					<h2>Paramètres</h2>
					<div className="title-lead">						
						<div className="menu-left">
							<ul>
								<li className="active_link">
									<Link to="#">Mes infos</Link>
								</li>
								<li>
									<Link to="#">Ma cagnotte</Link>
								</li>
								<li>
									<Link to="#">Mes jeux</Link>
								</li>
								<li>
									<Link to="#">Assistance</Link>
								</li>
							</ul>
						</div>
						<div className="personal">
							<h3>informations personnelles</h3>
							<form className="personal-field">
								<div className="field-container">
									<label htmlFor="email">E-mail</label>
									<input id="email" type="email" value="skouinar@gmail.com"/>
								</div>
								<div className="field-middle">
									<div className="field-container">										
										<input type="text" value="Prénom" />
									</div>
									<div className="field-container">										
										<input type="text" value="Nom" />
									</div>									
								</div>
								<div className="field-middle">
									<div className="field-container">
										<label htmlFor="pseudo">Pseudo</label>
										<input id="pseudo" type="text" value="Skouinar" />
									</div>
									<div className="field-container">
										<label htmlFor="pays">Pays</label>										
										<select>
											<option id="pays">France</option>
											<option>Madagascar</option>
										</select>
									</div>
								</div>
								<div className="field-container">
									<label htmlFor="date">Date de naissance</label>
									<input type="text" value="11/04/1997" />
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
