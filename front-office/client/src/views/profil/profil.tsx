import React from "react"
import { useSelector,useDispatch } from "react-redux"
import { Carousel } from "react-responsive-carousel"
import Popup from "reactjs-popup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
// faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile,
import { faPen, faCogs,  } from "@fortawesome/free-solid-svg-icons"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "../../assets/image/game-tag.png"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'
// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import {RootState} from "../../reducer"
import {changeLanguageUserConnected} from "../auth/action/userAction"
import IconXbox from "../../assets/image/icon-xbox.png"
import IconPs from "../../assets/image/playstation.png"
import {Translation} from "../../lang/translation"
import HistoryTournament from "./historyTournament"
import HistoryResult from "./historyResult"


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
			      			<p className="setavatar"><img src = {Avatar} />
			      			<label htmlFor="setavatar"><FontAwesomeIcon icon={faPen} /></label>
			      			<input type="file" id="setavatar" className="uploadFile" name="file"/>
			      			</p>
			      			<p className="pseudo"><strong>{userConnectedRedux.user.username}</strong></p>
		      			</div>
		      			<div className="avatar-info">
		      				<div className="table">
		      					<div className="cell">
		      						<strong>
		      						{
			      						Object.keys(userConnectedRedux.user).length > 0 ?
										Translation(userConnectedRedux.user.language).profil.platform
										:
										Translation("fr").profil.platform
									}
		      						</strong>
		      						<p><span>Playstation</span></p>
		      					</div>
		      					<div className="cell">
		      						<strong>
		      						{
		      							Object.keys(userConnectedRedux.user).length > 0 ?
										Translation(userConnectedRedux.user.language).profil.server
										:
										Translation("fr").profil.server
									}
									</strong>
		      						<p>
		      							<span>
		      							{
		      								Object.keys(userConnectedRedux.user).length > 0 ?
											Translation(userConnectedRedux.user.language).profil.asia
											:
											Translation("fr").profil.asia
										}
										</span>
									</p>
		      					</div>
		      					<div className="cell">
		      						<strong>Expérience</strong>
		      						<p><span>5</span></p>
		      					</div>
		      					<div className="cell">
		      						<strong>{
		      								Object.keys(userConnectedRedux.user).length > 0 ?
											Translation(userConnectedRedux.user.language).profil.exp
											:
											Translation("fr").profil.exp
										}</strong>
		      						<p><span>6 {Object.keys(userConnectedRedux.user).length > 0 ?
											Translation(userConnectedRedux.user.language).profil.hours
											:
											Translation("fr").profil.hours}</span></p>
		      					</div>
		      				</div>
		      			</div>
		      			<div className="stat">
		      				<div className="float">
		      					<strong>
		      					{
		      						Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.stats
									:
									Translation("fr").profil.stats
								}
		      					</strong>
		      				</div>
		      				<div className="float">
			      				<p>{
		      						Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.victory
									:
									Translation("fr").profil.victory
								} : <span>40%</span></p>
			      				<div className="myProgress">
		    						<div className="myBar" style={{width:"40%", background:"#6642a9"}}></div>
		    					</div>
		    					<p>{
		      						Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.defeat
									:
									Translation("fr").profil.defeat
								} : <span>25%</span></p>
		    					<div className="myProgress">
		    						<div className="myBar" style={{width:"25%", background:"#1da1f2"}}></div>
		    					</div>
		    					<p>{
		      						Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.retreat
									:
									Translation("fr").profil.retreat
								} : <span>75%</span></p>
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
		      				<h2>{
		      						Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.set
									:
									Translation("fr").profil.set
								}</h2>
		      				<input type="text" placeholder={
		      						Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.pseudonym
									:
									Translation("fr").profil.pseudonym
								}/>
		      				<input type="number" placeholder={Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.number
									:
									Translation("fr").profil.number}/>
		      				<input type="text" placeholder={Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.adhesion
									:
									Translation("fr").profil.adhesion}/>
									<div className="btn-container">
		      							<a href="#" className="btn bg-yellow mg15">{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.validate
									:
									Translation("fr").profil.validate}</a>
		      						</div>
		      				<div className="lang-container">
		      					<div className="lang-setting">
		      						<i><FontAwesomeIcon className="little-icon" icon={faCogs}/></i>
		      						<div className="lgdrpdwn">
		      							<p className="lg-opt">{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.lang
									:
									Translation("fr").profil.lang}</p>
		      							<p className="lg-desc">{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.choice
									:
									Translation("fr").profil.choice}</p>
										<select onChange={onChangeLanguage}>
											<option>FR</option>
											<option>EN</option>
							  			</select>
									</div>
		      					</div>
							</div>
		      			</div>
		      		</div>
		      	</div>
		      	<div className="account-game">
		      		<h2>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.account
									:
									Translation("fr").profil.account}</h2>
		      		<div className="itemGame">
		      			<p className="img-account"><img src={IconPs} alt="xbox" width="45" height="45"/></p>
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
						        <div className="header"> <h3>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.setAccount
									:
									Translation("fr").profil.setAccount}</h3></div>
							        <div className="content set-team">
							          {' '}
										<div className="set-account">
											<label>PSN id</label><input type="text" placeholder="Preuve-platree"/>
										</div>
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.validate
									:
									Translation("fr").profil.validate} </button>}
							          	>
										</Popup>
						        	</div>
						     	</div>
						    </Popup>

		      		</div>
		      		<div className="itemGame">
		      			<p className="img-account"><img src={IconXbox} alt="xbox" width="45" height="45"/></p>
		      			<p>XboxLive</p>
		      			<Popup
							    trigger={<button className="btn bg-white">XXXXXXXX<i></i></button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.setAccount
									:
									Translation("fr").profil.setAccount}</h3></div>
							        <div className="content set-team">
							          {' '}
										<div className="set-account">
											<label>PSN id</label><input type="text" placeholder="XXXXXXXX"/>
										</div>
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.validate
									:
									Translation("fr").profil.validate} </button>}

							          	>

										</Popup>
						        	</div>
						     	</div>
						    </Popup>
		      		</div>
		      	</div>
	      		<div id="game" className="my-games">
	      			<h2>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.game
									:
									Translation("fr").profil.game}</h2>
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
							    trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.addGame
									:
									Translation("fr").profil.addGame} </button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3> {Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.selectGame
									:
									Translation("fr").profil.selectGame}</h3></div>
							        <div className="content">
							          {' '}
							          <img src="https://i.ibb.co/8Y0r1NH/warzone.jpg" alt="warzone" />
							          <img src="https://i.ibb.co/CPDzC7n/rocketl.jpg" alt="rocketl" />
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
											Translation(userConnectedRedux.user.language).profil.addGame
											:
											Translation("fr").profil.addGame} </button>}
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
						          		<button className="btn bg-white">{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.validate
									:
									Translation("fr").profil.validate}</button>
						        	</div>
						     	</div>
						    </Popup>
	    				</div>
	      			</div>
	      		</div>
	      		<div className="my-teams">
	      			<h2>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.team
									:
									Translation("fr").profil.team}</h2>
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
      								<p>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.teamName
									:
									Translation("fr").profil.teamName} : </p>
      								<p>#Tag</p>
      								<p>
      								{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.create
									:
									Translation("fr").profil.create} : 05/03/2020</p>

      								<p>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.owner
									:
									Translation("fr").profil.owner} : </p>

      								<p>1 {Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.gamer
									:
									Translation("fr").profil.gamer}</p>
      							</div>
	      					</div>
	      				</div>
	      				<div className="bt-game-container">
	    					<Popup
							    trigger={<button className="btn bg-yellow"> {Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.createTeam
									:
									Translation("fr").profil.createTeam} </button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.addTeam
									:
									Translation("fr").profil.addTeam}</h3></div>
							        <div className="content set-team">
							          {' '}
										<div className="set-team">
											<input type="text" placeholder={Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.teamName
									:
									Translation("fr").profil.teamName} />
											<input type="text" placeholder={Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.tagTeam
									:
									Translation("fr").profil.tagTeam} />
										</div>
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow">{ Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.createTeam
									:
									Translation("fr").profil.createTeam} </button>}
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
	      		<HistoryTournament />
	      		<HistoryResult />
	      		<div className="premium">
	      			<h2>Premium</h2>
	      			<div className="prem-bloc">
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/80vD8kD/stat.png" alt="stat" width="75" height="75"/>
	      						<strong>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.formation
									:
									Translation("fr").profil.formation}</strong>
	      						<p>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.training
									:
									Translation("fr").profil.training}</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/mXW82Tt/seek.png" alt="seek" width="75" height="75" className="ht75"/>
	      						<strong>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.pro
									:
									Translation("fr").profil.pro}</strong>
	      						<p>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.training
									:
									Translation("fr").profil.training}</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/0KkJNYk/paiment.png" alt="paiment" width="75" height="75"/>
	      						<strong>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.pro
									:
									Translation("fr").profil.paiement}</strong>
	      						<p>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.training
									:
									Translation("fr").profil.training}</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/xDfySTm/wallet.png" alt="wallet" width="75" height="75"/>
	      						<strong>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.wallet
									:
									Translation("fr").profil.wallet}</strong>
	      						<p>{Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.training
									:
									Translation("fr").profil.training}</p>
	      					</div>
	      				</div>
	      				<div className="btn-container">
	      					<a href="#" className="btn bg-yellow">4.99 € / {Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.month
									:
									Translation("fr").profil.month}</a>
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
