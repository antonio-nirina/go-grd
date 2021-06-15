import React from "react"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import Popup from "reactjs-popup"
// import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
// faCogs, faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile,

import Header from "../header/header"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "./avatar"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'
// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar"

import "react-circular-progressbar/dist/styles.css"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import HistoryTournament from "./historyTournament"
import HistoryResult from "./historyResult"
import AccountGame from "./accountGame"
import Me from "./me"

const Profil: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

  return(
	<div className="profil connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<div className="wall-bloc" id="wall">
		      		<div className="tabs">
		      			<ul>
		      				<li><a href="#wall" className="active">
							  		{
			      						Object.keys(userConnectedRedux.user).length > 0 ?
										Translation(userConnectedRedux.user.language).profil.wall
										:
										Translation("fr").profil.wall
									}
							  </a></li>
		      				<li><a href="#account">
								  {
			      						Object.keys(userConnectedRedux.user).length > 0 ?
										Translation(userConnectedRedux.user.language).profil.account
										:
										Translation("fr").profil.account
									}
							</a></li>
		      				<li><a href="#game">
							   {
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.games
									:
									Translation("fr").profil.games
								}
							  </a></li>
		      				<li><a href="#myteams">
							  {
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.team
									:
									Translation("fr").profil.team
								}
							  </a></li>
		      				<li><a href="#story">
							  {
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.tournaments
									:
									Translation("fr").profil.tournaments
								}
							  </a></li>
		      				<li><a href="#results">
							   {
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.result
									:
									Translation("fr").profil.result
								}</a></li>
		      				<li><a href="#premium">
							  {
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).profil.premium
									:
									Translation("fr").profil.premium
								}
							  </a></li>
		      			</ul>
		      		</div>
		      		<div className="wall" id="wall">
		      			<Avatar />
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
		      			<div className="account-name">
		      				<p>
		      					<img src="https://i.ibb.co/VMGk5bF/twitch.png" alt="twitch" width="40px" height="auto"/>
		      					<span className="account-title">Twitch</span>
		      					<span>Stream sur Go Grind ! Connectez vous à votre compte Twitch</span>
		      					<button className="btn bg-yellow">Connectez-vous</button>
		      				</p>
		      			</div>
		      		</div>
		      	</div>
		      	<Me />
		      	<AccountGame />

	      		<div className="my-teams" id="myteams">
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
	      		<div className="premium" id="premium">
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
								Translation("fr").profil.month}
							</a>
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
