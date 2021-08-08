import React,{useEffect} from "react"
import { useSelector } from "react-redux"

import Popup from "reactjs-popup"
import { faPen, faChartBar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from "../header/header"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "./avatar"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'

import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import HistoryTournament from "./historyTournament"
import HistoryResult from "./historyResult"
import AccountGame from "./accountGame"
import Me from "./me"


const Profil: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	useEffect(() => {
		const params = window.location.search

		if (window.opener) {
			window.opener.postMessage(params,"")
		   	window.close()
		}
	},[])


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
			      						Translation(userConnectedRedux.user.language).profil.platform
									}
		      						</strong>
		      						<p><span>Playstation</span></p>
		      					</div>
		      					<div className="cell">
		      						<strong>
		      						{
		      							Translation(userConnectedRedux.user.language).profil.server
									}
									</strong>
		      						<p>
		      							<span>
		      							{
		      								Translation(userConnectedRedux.user.language).profil.asia
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
		      								Translation(userConnectedRedux.user.language).profil.exp
										}</strong>
		      						<p><span>6 {Translation(userConnectedRedux.user.language).profil.hours}</span></p>
		      					</div>
		      				</div>
		      			</div>
		      		</div>
		      	</div>
		      	<div className="statistique">
		      		<div className="start-game">
		      			<div className="start">
		      				<img src="https://i.ibb.co/TKD3yZT/apex-legends.webp" alt="apex-legends" />
		      				<span><FontAwesomeIcon icon={faChartBar} />Statistiques</span>
		      			</div>
		      		</div>
		      		<div className="flexbox">
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
		      	<Me />
		      	<AccountGame />

	      		<div className="my-teams" id="myteams">
	      			<h2>{Translation(userConnectedRedux.user.language).profil.team}</h2>
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
      								<p>{Translation(userConnectedRedux.user.language).profil.teamName} : </p>
      								<p>#Tag</p>
      								<p>{Translation(userConnectedRedux.user.language).profil.create}</p>

      								<p>{Translation(userConnectedRedux.user.language).profil.owner} : </p>

      								<p>1 {Translation(userConnectedRedux.user.language).profil.gamer}</p>
      							</div>
	      					</div>
	      				</div>
	      				<div className="bt-game-container">
	    					<Popup
							    trigger={<button className="btn bg-red">{Translation(userConnectedRedux.user.language).profil.createTeam} </button>}
							    modal
							    nested
  							>
  							{(close:any) => (
					    	<div className="modal">
						        <button className="close" onClick={close}>
						          &times;
						        </button>
						        <div className="header"> <h3>{Translation(userConnectedRedux.user.language).profil.addTeam}</h3></div>
									<div className="uploadLogoteam">
										<div className="bg-team">
											<img src="https://i.ibb.co/C59KCSd/team-mate.png" className="imgresp" alt="" />
										</div>
										<div className="logoteam-container">
											<p className="setlogoTeam">
												<img src = "https://i.ibb.co/dQPw2Vd/teamlogo.png" width="100" alt="" />
												<label htmlFor="setLogoTeam"><FontAwesomeIcon icon={faPen} /></label>
												<input type="file" id="setLogoTeam" className="uploadLogoFile" name="logoFile"/>
											</p>
										</div>
									</div>
							        <div className="content set-team">
							          {' '}
										<div className="set-team">
											<input type="text" placeholder={Translation(userConnectedRedux.user.language).profil.teamName} />
											<input type="text" placeholder={Translation(userConnectedRedux.user.language).profil.tagTeam} />
										</div>
							        </div>
						        	<div className="actions">
							          	<button className="btn bg-red">{Translation(userConnectedRedux.user.language).profil.createTeam}</button>
						        	</div>
						     	</div>
						    )}
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
	      						<img src="https://i.ibb.co/xfFSpWL/stat.png" alt="stat" width="75" height="75"/>
	      						<strong>{Translation(userConnectedRedux.user.language).profil.formation}</strong>
	      						<p>{Translation(userConnectedRedux.user.language).profil.training}</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/9brkwNV/seek.png" alt="seek" width="75" height="75" className="ht75"/>
	      						<strong>{Translation(userConnectedRedux.user.language).profil.pro}</strong>
	      						<p>{Translation(userConnectedRedux.user.language).profil.training}</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/x8xPYTT/paiment.png" alt="paiment" width="75" height="75"/>
	      						<strong>{Translation(userConnectedRedux.user.language).profil.paiement}</strong>
	      						<p>{Translation(userConnectedRedux.user.language).profil.training}</p>
	      					</div>
	      				</div>
	      				<div className="item-bloc">
	      					<div className="img-prem">
	      						<img src="https://i.ibb.co/xfyrM1J/wallet.png" alt="wallet" width="75" height="75"/>
	      						<strong>{Translation(userConnectedRedux.user.language).profil.wallet}</strong>
	      						<p>{Translation(userConnectedRedux.user.language).profil.training}</p>
	      					</div>
	      				</div>	      				
	      			</div>
	      			<div className="btn-container">
	      				<span  className="btn bg-red">4.99 € / {Translation(userConnectedRedux.user.language).profil.month}
						</span>
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
