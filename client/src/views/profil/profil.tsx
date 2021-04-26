import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../profil/profil.css"
import "../../assets/css/style.css"


const Profil: React.FC = function() {
  return(
    <div className="profil">
      <div className="container">
	      <Header/>
	      <div className="main-content">	      	
	      	<div className="main">
	      		<h1>Profil</h1>
	      		<div className="avatar">
	      			<div className="avatar-info">

	      			</div>
	      		</div>
	      		<div className="premium">
	      			<div className="premium-member">
	      				
	      			</div>
	      		</div>
	      		<div className="set">

	      		</div>
	      	</div>
	      	<aside className="aside"></aside>
	      </div>	      
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profil;
