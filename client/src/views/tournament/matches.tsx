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


const Matches: React.FC = function(props:any) {

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
						<li><Link to="/matches" className="active">Match</Link></li>
						<li><Link to="/teams">Equipes</Link></li>
						<li><Link to="/rules">Règles</Link></li>
					</ul>
				</div>				
				<div className="matches">
					<h2>Horaires</h2>
					<p><strong>Date de commencement</strong></p>
					<table className="versus">
						<tr>
							<td className="schedule">19 Juillet, 2021 17:00</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">TIKIS Esports</span>
								<span className="flag"><img src="https://i.ibb.co/mC6JsHb/fr.png" alt="fr" width="25" height="25" /></span>
							</td>
							<td className="vs">vs</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">TIKIS Esports</span>
								<span className="flag"><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="gb" width="25" height="25" /></span>
							</td>
						</tr>
						<tr>
							<td className="schedule">19 Juillet, 2021 17:00</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">TIKIS Esports</span>
								<span className="flag"><img src="https://i.ibb.co/mC6JsHb/fr.png" alt="fr" width="25" height="25" /></span>
							</td>
							<td className="vs">vs</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">TIKIS Esports</span>
								<span className="flag"><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="gb" width="25" height="25" /></span>
							</td>
						</tr>
						<tr>
							<td className="schedule">19 Juillet, 2021 17:00</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">TIKIS Esports</span>
								<span className="flag"><img src="https://i.ibb.co/mC6JsHb/fr.png" alt="fr" width="25" height="25" /></span>
							</td>
							<td className="vs">vs</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">Random team</span>
								<span className="flag"><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="gb" width="25" height="25" /></span>
							</td>
						</tr>
						<tr>
							<td className="schedule">19 Juillet, 2021 17:00</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">Random team</span>
								<span className="flag"><img src="https://i.ibb.co/mC6JsHb/fr.png" alt="fr" width="25" height="25" /></span>
							</td>
							<td className="vs">vs</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">TIKIS Esports</span>
								<span className="flag"><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="gb" width="25" height="25" /></span>
							</td>
						</tr>
						<tr>
							<td className="schedule">19 Juillet, 2021 17:00</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">TIKIS Esports</span>
								<span className="flag"><img src="https://i.ibb.co/mC6JsHb/fr.png" alt="fr" width="25" height="25" /></span>
							</td>
							<td className="vs">vs</td>
							<td className="about-team">
								<span className="team-flag"><img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="25" height="25" /></span>
								<span className="tag-name">Random team</span>
								<span className="flag"><img src="https://i.ibb.co/gvSwfSp/gb.png" alt="gb" width="25" height="25" /></span>
							</td>
						</tr>
					</table>
				</div>
			</div>			
			<Footer/>
		</div>
    </div>
  )
}

export default Matches
