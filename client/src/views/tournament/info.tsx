import React from "react"
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"

import "../tournament/tournament.css"
import "../../assets/css/style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile } from "@fortawesome/free-solid-svg-icons"


const Info: React.FC = function(props:any) {
	
  return(
  	<div className="Tournament">
		<div className="container">
			<Header/>
			<div className="full-container">				
				
			</div>				
			<Footer/>
		</div>		
    </div>    
  )
}

export default Info
