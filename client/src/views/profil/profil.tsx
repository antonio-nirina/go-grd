import React from "react"
import { useSelector,useDispatch } from "react-redux"
import { Carousel } from "react-responsive-carousel"
import Popup from "reactjs-popup"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "../../assets/image/avatar.png"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'
// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {RootState} from "../../reducer"
import {changeLanguageUserConnected} from "../auth/action/userAction"
import IconXbox from "../../assets/image/icon-xbox.png"
import IconPs from "../../assets/image/playstation.png"


const Profil: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const dispatch = useDispatch()

	const onChangeLanguage = function(e:any) {
		if(parseInt(e.target.value) === 1) {
			dispatch(changeLanguageUserConnected(userConnectedRedux.user,"en"))
		} else {
			dispatch(changeLanguageUserConnected(userConnectedRedux.user,"fr"))
		}
		//
	}
  return(
	<div className="profil connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<div className="wall-bloc">
		      		<div className="tabs">
		      			<ul>
		      				<li><a href="#wall" className="active">Mon mur</a></li>
		      				<li><a href="#">Compte de jeux</a></li>

		      				<li><a href="#game">Mes jeux</a></li>
		      				<li><a href="#">Mes équipes</a></li>
		      				<li><a href="#">Mes tournois</a></li>
		      				<li><a href="#">Mes resultats</a></li>		      				
		      				<li><a href="#">Premium</a></li>		      				
		      			</ul>
		      		</div>
		      		<div className="wall" id="wall">
		      			<div className="avatar">
			      			<p className="setavatar"><img src = {Avatar} /><i><FontAwesomeIcon icon={faPen}/></i></p>
			      			<p className="pseudo"><strong>Noob_021</strong></p>
		      			</div>
		      			<div className="avatar-info">

		      				<div className="table">
		      					<div className="cell">
		      						<strong>Plateforme</strong>
		      						<p><span>Playstation</span></p>
		      					</div>
		      					<div className="cell">
		      						<strong>Serveur</strong>
		      						<p><span>Asia</span></p>
		      					</div>
		      					<div className="cell">
		      						<strong>Expérience</strong>
		      						<p><span>5</span></p>
		      					</div>
		      					<div className="cell">
		      						<strong>Durée de jeux</strong>
		      						<p><span>6 heures</span></p>
		      					</div>
		      				</div>
		      			</div>
		      			<div className="stat">
		      				<div className="float">
		      					<strong>Mes stats</strong>
		      				</div>
		      				<div className="float">
			      				<p>Victoire : <span>40%</span></p>
			      				<div className="myProgress">
		    						<div className="myBar" style={{width:"40%", background:"#6642a9"}}></div>
		    					</div>
		    					<p>Defaite : <span>25%</span></p>
		    					<div className="myProgress">
		    						<div className="myBar" style={{width:"25%", background:"#1da1f2"}}></div>
		    					</div>
		    					<p>Abandon : <span>75%</span></p>
		    					<div className="myProgress">
		    						<div className="myBar" style={{width:"75%", background:"#f9753d"}}></div>
		    					</div>
		    				</div>
		      			</div>
		      		</div>
		      	</div>
		      	<div className="about-bloc">
		      		<div className="about-me">
		      			<div className="field">
		      				<h2>Modifier votre profil</h2>
		      				<input type="text" placeholder="Pseudo"/>
		      				<input type="number" placeholder="Numéro de téléphone"/>
		      				<input type="text" placeholder="Entrez la date d'adhésion"/>
							<select onChange={onChangeLanguage}>
								<option>FR</option>
								<option>EN</option>
						  	</select>
		      				<div className="btn-container">
		      					<a href="#" className="btn bg-yellow mg15">Valider</a>
		      				</div>
		      			</div>
		      		</div>
		      	</div>
		      	<div className="account-game">
		      		<h2>Mes comptes de jeux</h2>
		      		<div className="itemGame">
		      			<p className="img-account"><img src={IconXbox} alt="xbox" width="84" height="83"/></p>
		      			<p>PSN id</p>		      			
		      			<Popup
							    trigger={<button className="btn bg-white">Preuve-Platree<i></i></button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3>Modifier votre compte de jeux</h3></div>
							        <div className="content set-team">
							          {' '}
										<div className="set-account">
											<label>PSN id</label><input type="text" placeholder="Preuve-platree"/>										
										</div>						          
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> Valider </button>}
							            	
							          	>
						            		
										</Popup>						          		
						        	</div>
						     	</div>
						    </Popup>

		      		</div>
		      		<div className="itemGame">
		      			<p className="img-account"><img src={IconPs} alt="xbox" width="84" height="83"/></p>
		      			<p>XboxLive</p>
		      			<Popup
							    trigger={<button className="btn bg-white">Preuve-Platree<i></i></button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3>Modifier votre compte de jeux</h3></div>
							        <div className="content set-team">
							          {' '}
										<div className="set-account">
											<label>PSN id</label><input type="text" placeholder="Preuve-platree"/>										
										</div>						          
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> Valider </button>}
							            	
							          	>
						            		
										</Popup>						          		
						        	</div>
						     	</div>
						    </Popup>
		      		</div>
		      	</div>
	      		<div id="game" className="my-games">
	      			<h2>Mes jeux</h2>
	      			<div className="img-game">
	      				<Carousel swipeable={true} centerSlidePercentage={20} dynamicHeight={false} centerMode={true} showArrows={true} autoPlay={true} interval={8000} infiniteLoop={true} showThumbs={false} transitionTime={1000}>
					        <div className="game-slide"><img src="https://i.ibb.co/ByGkhS1/apexlegend.jpg" alt="apexlegend" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/Yd2v60Q/blackops.jpg" alt="blackops"/></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/TK5JYMz/fifa21.jpg" alt="fifa21" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/Dtym1JK/fortnite.jpg" alt="fortnite" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/9VPnb7p/mwarfare.jpg" alt="mwarfare" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/89xKdw2/rainbowsix-siege.jpg" alt="rainbowsix-siege"/></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/CPDzC7n/rocketl.jpg" alt="rocketl" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/8Y0r1NH/warzone.jpg" alt="warzone" /></div>
	    				</Carousel>
	    				<div className="bt-game-container">
	    					<Popup
							    trigger={<button className="btn bg-yellow"> Ajouter jeux </button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3>Selectionner parmis nos listes de jeux</h3></div>
							        <div className="content">
							          {' '}
							          <img src="https://i.ibb.co/8Y0r1NH/warzone.jpg" alt="warzone" />
							          <img src="https://i.ibb.co/CPDzC7n/rocketl.jpg" alt="rocketl" />
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> Ajouter jeux </button>}
							            	position="top center"
							            	nested
							          	>
						            		<span>
												Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
												magni omnis delectus nemo, maxime molestiae dolorem numquam
												mollitia, voluptate ea, accusamus excepturi deleniti ratione
												sapiente! Laudantium, aperiam doloribus. Odit, aut.
						            		</span>
										</Popup>
						          		<button className="btn bg-white">Valider</button>
						        	</div>
						     	</div>
						    </Popup>
	    				</div>
	      			</div>
	      		</div>
	      		<div className="my-teams">
	      			<h2>Mes équipes</h2>
	      			<div className="team-mate">
	      				<div className="team-bloc">
	      					<div className="team-banniere">
	      						<div className="imgcontainer">
	      							<img src="https://i.ibb.co/C59KCSd/team-mate.png" alt="team-mate" className="imgresp"/>
	      						</div>
	      						<div className="team-img">
	      							<img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="75"/>
	      						</div>
      							<div className="team-name">
      								<p>MY TEAM NAME</p>
      								<p>#Tag</p>
      								<p>Créee le 05/03/2020</p>
      								<p>Propriétaire</p>
      								<p>1 joueurs</p>
      							</div>
	      					</div>
	      				</div>
	      				<div className="bt-game-container">
	    					<Popup
							    trigger={<button className="btn bg-yellow"> Ajouter une équipe </button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3>Ajouter une équipe</h3></div>
							        <div className="content set-team">
							          {' '}
										<div className="set-team">
											<input type="text" placeholder="Nom de l'équipe" />
											<input type="text" placeholder="Tag de l'équipe" />
										</div>
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> Créer l'équipe </button>}
							            	position="top center"
							            	nested
							          	>

										</Popup>
						        	</div>
						     	</div>
						    </Popup>
	    				</div>
	      			</div>
	      		</div>
	      		<div className="mes-tournois">
      				<div className="tournois">
        				<h2>Mes tournois</h2>
        				<div className="tab-content">
        					<strong>Tournois</strong>
        					<table>
        						<thead>
        							<tr>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faCalendarAlt}/></i>Date</td>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faGamepad}/></i>Jeux</td>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faTrophy}/></i>Trounois</td>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faMedal}/></i>Rang</td>
        								<td></td>
        							</tr>
        						</thead>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faMobile}/></i>
									CoD Mobile</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        					</table>
        					<div className="filter">
        						<p>Items per page: 10 <span>1 - 10 of 10</span></p>
        						<p>
        							<i className="iconPager"><FontAwesomeIcon icon={faStepBackward}/></i>
        							<i className="iconPager"><FontAwesomeIcon icon={faChevronLeft}/></i>
        							<i className="iconPager"><FontAwesomeIcon icon={faChevronRight}/></i>
        							<i className="iconPager"><FontAwesomeIcon icon={faStepForward}/></i>
        						</p>
        					</div>
        				</div>
        				<div className="tab-content">
        					<strong>Leagues</strong>
        					<table>
        						<thead>
        							<tr>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faCalendarAlt}/></i>Date</td>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faGamepad}/></i>Jeux</td>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faTrophy}/></i>Tournois</td>
        								<td><i className="iconStatus"><FontAwesomeIcon icon={faMedal}/></i>Rang</td>
        								<td></td>
        							</tr>
        						</thead>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        						<tr>
        							<td>04/04/2021</td>
        							<td>Fifa21</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
        							<td>Top 8</td>
        							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
        						</tr>
        					</table>
        					<div className="filter">
        						<p>Items per page: 10 <span>1 - 10 of 10</span></p>
        						<p>
        							<i className="iconPager"><FontAwesomeIcon icon={faStepBackward}/></i>
        							<i className="iconPager"><FontAwesomeIcon icon={faChevronLeft}/></i>
        							<i className="iconPager"><FontAwesomeIcon icon={faChevronRight}/></i>
        							<i className="iconPager"><FontAwesomeIcon icon={faStepForward}/></i>
        						</p>
        					</div>
        				</div>
        			</div>
	      		</div>
	      		<div className="mes-resultats">
	      			<h2>Mes résultats</h2>
	      			<div className="tab-content">
	      				<table>
    						<thead>
    							<tr>
									<td><i className="iconStatus"><FontAwesomeIcon icon={faCalendarAlt}/></i>Date</td>
    								<td><i className="iconStatus"><FontAwesomeIcon icon={faGamepad}/></i>Jeux</td>
    								<td><i className="iconStatus"><FontAwesomeIcon icon={faTrophy}/></i>Tournois</td>
    								<td><i className="iconStatus"><FontAwesomeIcon icon={faTrophy}/></i>Ligues</td>
    								<td><i className="iconStatus"><FontAwesomeIcon icon={faMedal}/></i>Rang</td>
    								<td></td>
    							</tr>
    						</thead>
    						<tr>
    							<td>04/04/2021</td>
    							<td>Fifa21</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faMobile}/></i>
									CoD Mobile</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faMobile}/></i>
									CoD Mobile</td>
    							<td>Top 10</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
    						</tr>
    						<tr>
    							<td>04/04/2021</td>
    							<td>Fifa21</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faMobile}/></i>
									CoD Mobile</td>
    							<td>Top 5</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
    						</tr>
    						<tr>
    							<td>04/04/2021</td>
    							<td>Fifa21</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faPlaystation}/></i>Classic Cup</td>
    							<td>Top 40</td>
    							<td><i className="iconStatus"><FontAwesomeIcon icon={faInfoCircle}/></i></td>
    						</tr>
    					</table>
    					<div className="filter">
    						<p>Items per page: 10 <span>1 - 10 of 10</span></p>
    						<p>
    							<i className="iconPager"><FontAwesomeIcon icon={faStepBackward}/></i>
    							<i className="iconPager"><FontAwesomeIcon icon={faChevronLeft}/></i>
    							<i className="iconPager"><FontAwesomeIcon icon={faChevronRight}/></i>
    							<i className="iconPager"><FontAwesomeIcon icon={faStepForward}/></i>
    						</p>
        				</div>
	      			</div>
	      		</div>
	      		<div className="premium">
	      			<h2>Premium</h2>
	      			<div className="prem-bloc">
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/80vD8kD/stat.png" alt="stat" width="75" height="75"/>
	      						<strong>Formation avancée</strong>
	      						<p>Entraîne-toi comme un champion avec nos guides confirmés et experts crées avec des pro</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/mXW82Tt/seek.png" alt="seek" width="75" height="75" className="ht75"/>
	      						<strong>Etre repéré par les pro</strong>
	      						<p>Entraîne-toi comme un champion avec nos guides confirmés et experts crées avec des pro</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/0KkJNYk/paiment.png" alt="paiment" width="75" height="75"/>
	      						<strong>Paiement rapide</strong>
	      						<p>Entraîne-toi comme un champion avec nos guides confirmés et experts crées avec des pro</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/xDfySTm/wallet.png" alt="wallet" width="75" height="75"/>
	      						<strong>Porte-monnaie de paiement minimum</strong>
	      						<p>Entraîne-toi comme un champion avec nos guides confirmés et experts crées avec des pro</p>
	      					</div>
	      				</div>
	      				<div className="btn-container">
	      					<a href="#" className="btn bg-yellow">4.99 € / Mois</a>
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

export default Profil;
