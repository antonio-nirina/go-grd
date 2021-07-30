import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"
import Aside from "../assistance/aside"

import "../../assets/css/style.css"
import "../assistance/assistance.css"


const Social: React.FC = function() {	
  return(
  	<div className="assistance">
	    <div className="container">
	  		<Header/>	  		
	  		<div className="main">
	  			<div className="block-center">
			  		<div className="search-container">
			  			<h2>Assistance</h2>
			  			<div className="search-box">
			  				<input type = "text" placeholder ="Rechercher un sujet"/>
			  			</div>
			  		</div>
		  			<div className="aside-menu social">
		  				<Aside />
		  			</div>
		  			<div className="support">
		  				<div className="sup">
		  					<p className="title">Go Grind Support</p>
		  					<p>Trouver les réponses à vos problèmes et vos questions</p>
		  				</div>		  				
		  			</div>
	  			</div>
	  			<Join/>
	  		</div>			
			<Footer/>
	  	</div>
	</div>
  );
}

export default Social;

