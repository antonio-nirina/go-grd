import React from "react"
// import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"

import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faPlaystation } from "@fortawesome/free-brands-svg-icons"
// import { faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile } from "@fortawesome/free-solid-svg-icons"


const Rules: React.FC = function(props:any) {

  return(
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="details">
					<p className="name-target">Tournois : <span>Rocket League</span></p>
					<p className="starting">Date de commencement : <span>19 Juin 2022, 17:00</span></p>
					<p className="status">Status : <span>ouvert</span></p>
				</div>
				
				<div className="banniere"></div>
				<div className="tabs">
					<ul>
						<li><Link to="/info">Info</Link></li>
						<li><Link to="/matches">Match</Link></li>
						<li><Link to="/teams">Equipes</Link></li>
						<li><Link to="/rules" className="active">Règles</Link></li>
					</ul>
				</div>
				<div className="txt">
					<h2>Bienvenue dans le tournois Rocket League S1</h2>
					<p>This tournament only allows rank Veteran or lower. It’s fine if you start as Gold/Silver/Veteran and rank up during the tournament but all players in the team need to be Veteran or lower to be able to play this tournament.</p>
					<p>2 tournaments per week every Tuesday 19:00 and Saturday 18:00.</p>
					<p>The tournament has room for 16 teams and the winners in each tournament will get 50 EUR skin gift cards to split on. Each tournament ends the same day and only takes around 3-4 hours if you go to the final. </p>
					<p><strong>NO SMURF ACCOUNTS ALLOWED!</strong></p>
					<p>If we find out that smurf accounts sign up we will ban that account + their main account. To make sure the tournament is accurate for lower ranks, will we doublecheck so you don't have higher than faceit lvl 5.</p>
					<p><strong>HOW DO I REGISTER A TEAM FOR THE TOURNAMENT?</strong></p>
					<div className="list">
						<li>- Create a team on Esportal and register for the tournament!</li>
						<li>- Players in all regions are allowed</li>
						<li>- Teams will be accepted using first-come-first-serve (keep our register conditions in mind!)</li>
						<li>- The tournament will be played on Swedish servers</li>					
					</div>
					<p><strong>HOW DO I PLAY ON THE TOURNAMENT DAY?</strong></p>
					<div className="list">
						<li>- The team on top of a match will be considered as the "home team".</li>
						<li>- Losing a game will mean you're eliminated from the tournament.</li>
						<li>- All matches are being played as a BO1.</li>						
					</div>
					<p><strong>MAP POOL & MAP VETO</strong></p>
					<div className="list">
						<li>- Captains from each team take turns banning one map each until only one map remains. This map will be played.</li>
						<li>- The map pool is the current "Active Duty Map Pool" from Valve.</li>
						<li>- Map pool: Vertigo, Dust2, Nuke, Inferno, Mirage, Train, Overpass.</li>						
					</div>
				</div>
				<div className="tableau">
					<div className="state">
						<p>16 <span>slots</span></p>
						<p>27 <span>En attente</span></p>
						<p>7 <span className="confirm">Confirmé</span></p>
					</div>
					<div className="info-target">
						<div className="line">
							<p>Début</p>
							<span>Mar, 18 Mai 2021, 19:00</span>
						</div>
						<div className="line">
							<p>Fin</p>
							<span>Mar, 18 Mai 2021, 19:00</span>
						</div>
						<div className="line">
							<p>Participants</p>
							<span>16</span>
						</div>
						<div className="line">
							<p>Mode</p>
							<span>Elimination</span>
						</div>
					</div>
				</div>
			</div>			
			<Footer/>
		</div>
    </div>
  )
}

export default Rules
