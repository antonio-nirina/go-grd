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


const Info: React.FC = function(props:any) {

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
				
				<div className="banniere">
					
				</div>
				<div className="tabs">
					<ul>
						<li><Link to="#">Info</Link></li>
						<li><Link to="#">Match</Link></li>
						<li><Link to="#">Teams</Link></li>
						<li><Link to="#">Règles</Link></li>
					</ul>
				</div>
				<div className=""></div>
			</div>
			<Footer/>
		</div>
    </div>
  )
}

export default Info
