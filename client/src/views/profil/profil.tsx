import React,{useEffect} from "react"
// import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import {UPDATE_AVATAR} from "../../gql/user/mutation"
import {useMutation} from "@apollo/client"
import {RootState} from "../../reducer"

import fr from "../../assets/image/fr.png"
import ps from "../../assets/image/playstation.png"
import AvatarDefault from "../../assets/image/game-tag.png"
import Game from "../../assets/image/game.png"

import Fifa from "../../assets/image/profil/fifa.png"
import Fortnite from "../../assets/image/profil/fortnite.png"
import Warzone from "../../assets/image/profil/warzone.png"
import Rocketleague from "../../assets/image/profil/rocketleague.png"


// import Popup from "reactjs-popup"
import { faXbox, faPlaystation, faTwitch, faYoutube, faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons"
import { faChartBar, faStar, faUsers} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from "../header/header"
import Join from "../join/join"
import Footer from "../footer/footer"
import "./profil.css"
import Avatar from "./avatar"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'
// import {Translation} from "../../lang/translation"

// import {RootState} from "../../reducer"


const Profile: React.FC = function() {
	//const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	useEffect(() => {
		const params = window.location.search

		if (window.opener) {
			window.opener.postMessage(params,"")
		   	window.close()
		}
	},[])
	const [updatedAvatar] = useMutation(UPDATE_AVATAR)
	const dispatch = useDispatch()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)


  return(
	<div className="profil connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<div className="gamer-stats">
		      		<div className="wall-bloc" id="wall">
			      		<div className="wall" id="wall">
			      			<Avatar />
			      		</div>
			      	</div>
			      	<div className="statistique">
			      		<div className="stat-content">
				      		
				      		<div className="flexbox">
				      			<div className="start-game">
					      			<div className="start">
					      				<img src={Game} alt="apex-legends" />
					      				<span><FontAwesomeIcon icon={faChartBar} />Statistiques</span>
					      			</div>
				      			</div>
				      			<div className="info-container">
					      			<div className="flex-items">
					      				<p>92 <span>Parties</span></p>
					      				<p>32 <span>Top 1</span></p>
					      				<p>35% <span>Taux de victoires</span></p>
					      			</div>
					      			<div className="flex-items">
					      				<p>L L W L<span>Score recents</span></p>
					      				<p>2.75<span>K/D</span></p>
					      				<p>923<span>Placement FR</span></p>
					      			</div>
					      			<div className="flex-items">
					      				<p>Ligue<span>-</span></p>
					      				<p>Placement<span>-</span></p>
					      				<p>Score<span>-</span></p>
					      			</div>
					      		</div>
				      		</div>
				      		<div className="with-stat">
				      			<div>
				      				<img src={Fifa} alt="" height="50"/>
			      					<p>Fifa 21 <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
			      				</div>
			      				<div>
				      				<img src={Fortnite} alt="" height="50"/>
			      					<p>Fortnite <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
			      				</div>
			      				<div>
				      				<img src={Warzone} alt="" height="50"/>
			      					<p>COD : Warzone <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
			      				</div>
			      				<div>
				      				<img src={Rocketleague} alt="" height="50"/>
			      					<p>Rocket League <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
			      				</div>
			      				
			      			</div>
				      	</div>
				      	<div className="stat-content">
				      		<div className="teamname">
					      		<div className="bloc-team-mate">
					      			<div className="avatar-name">
					      				<div>
					      					<img src={AvatarDefault} alt="" className="avatar-lead"/>
					      				</div>
					      				<div>
					      					<span>nomdeteam</span>
					      				</div>
					      			</div>
					      			<div className="setting-accounts">
						      			<div>
						      				<img src={ps} alt=""/>
						      			</div>
						      			<div>
						      				<img src={fr} alt=""/>
						      			</div>
						      		</div>
					      			<div className="team-number">
					      				<span>25 <i><FontAwesomeIcon icon={faUsers} /></i></span>
					      			</div>
					      		</div>
					      		<div className="media">				      	
							      	<div className="social">
					      				<Link to="#"><i><FontAwesomeIcon icon={faTwitch} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faYoutube} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faFacebook} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faTwitter} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faXbox} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faPlaystation} /></i></Link>
							      	</div>
	    						</div>
				      		</div>					      		
				      	</div>
					      		      		
			      	</div>			      	
			      	<div className="part">
						<div className="undertitle">
							<h2>Tournois</h2>
							<p>Derniers résultats en tournois de {userConnectedRedux.user.username}</p>
						</div>
						<div className="content waggers-link">
							<div className="fixed">
								<span>Nom</span>
								<span>Place</span>
								<span>Cashprize</span>
								<span>Format</span>
								<span>Nombre de Joueurs</span>
								<span>Date</span>
							</div>
							<div className="row-container">
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
							</div>

						</div>								
					</div>
					<div className="part">
						<div className="undertitle">
							<h2>Wagers</h2>
							<p>Derniers résultats de {userConnectedRedux.user.username}</p>
						</div>
						<div className="content waggers-link">
							<div className="fixed">
								<span>Nom</span>
								<span>Place</span>
								<span>Cashprize</span>
								<span>Format</span>
								<span>Nombre de Joueurs</span>
								<span>Date</span>
							</div>
							<div className="row-container">
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
								<div className="row">
									<span>Apex Daily Cup</span>
									<span>1rd</span>
									<span>100€</span>
									<span>3V3</span>
									<span>16 Equipes</span>
									<span>04/04/2021 - 5:00PM</span>
								</div>
							</div>
						</div>								
					</div>
					<div className="part mur">
						<div className="undertitle">
							<h2>Mur</h2>
							<p>Toutes les dernières actualités de {userConnectedRedux.user.username}</p>
						</div>
						<div className="content waggers-link">
							<div className="fixed">
								<span>Succès</span>
								<span className="center">Commentaires</span>
								<span className="aright">1-4 &gt;</span>							
							</div>
							<div className="row-container">
								<div className="row">
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faStar} /></i></span>
										</div>
									</div>
									<div className="note">
										<img src={AvatarDefault} alt="" width="45"/>
										<p>
											<span>Défi</span>
											TonioPlancha a réussi l0 top 1 sur Apex...
										</p>
										<div className="icon">
											<span><i><FontAwesomeIcon icon={faStar} /></i></span>
										</div>
									</div>
								</div>

								<div className="comment-container">
									<div className="comments">										
										<img src={AvatarDefault} alt="" width="50"/>										
										<p>
											<span>{userConnectedRedux.user.username}</span>											
											<input type="text" placeholder="Ajouter un commentaire..." />
										</p>
									</div>
									<div className="comments">									
										<img src={AvatarDefault} alt="" width="50"/>
										<p>
											<span>CAPELAJR <i>21 Juillet à 3:54 PM</i></span>
											+ rep Funny Booooooy
										</p>
										
									</div>
								</div>	
							</div>													
						</div>
					</div>				 	  					
			    </div>			   
	      	</div>
	      </div>
	      <Join/>
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profile;
