import React from "react"
import Header from "../header/header"
import Participate from "../participate/participate"
import Join from "../join/join"
import Footer from "../footer/footer"
import "../annexe/profile.css"
import "../../assets/css/style.css"

const Profile: React.FC = function() {
	

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
