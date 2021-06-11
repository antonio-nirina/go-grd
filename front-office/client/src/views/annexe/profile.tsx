import React from "react"
import { useSelector } from "react-redux"

// import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
// faCogs, faCalendarAlt, faInfoCircle, faGamepad, faTrophy, faMedal, faStepBackward, faStepForward, faChevronRight, faChevronLeft, faMobile,

import Header from "../header/header"
import Participate from "../participate/participate"
import Join from "../join/join"
import Footer from "../footer/footer"
import "../annexe/profile.css"
import "../../assets/css/style.css"

// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar"

import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"

const Profile: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)

  return(
	<div className="profile connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<Participate/>
	      		<Join/>
	      	</div>
	      </div>
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profile;
