import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import Aside from "../assistance/aside"

import thumbnail from "../../assets/image/video.png"
import "../../assets/css/style.css"
import "../assistance/assistance.css"


const Assistance: React.FC = function() {	
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
		  			<div className="aside-menu accueil">
		  				<Aside />
		  			</div>
		  			<div className="support">
		  				<div className="sup">
		  					<p className="title">Go Grind Support</p>
		  					<p>Trouver les réponses à vos problèmes et vos questions</p>
		  				</div>
		  				<div className="under-title">
		  					<div className="advice">
		  						<div className="carre"></div>
		  						<div className="right">
		  							<p className="medium">Problèmes populaires</p>
		  							<p className="light">Retrouver les réponses aux questions les plus posées</p>
		  						</div>		  					
		  					</div>
		  					<div className="clear"></div>
		  					<div className="advice">
		  						<div className="carre"></div>
		  						<div className="right">
		  							<p className="medium">Nos techniciens à votre écoute</p>
		  							<p className="light">Rejoignez nos réseaux sociaux pour discuter avec nos techniciens en direct</p>
		  						</div>		  					
		  					</div>
		  				</div>
		  				<div className="under-title">
		  					<p className="medium">Comment déposer une requête support ?</p>
		  					<div className="tuto-video">
		  						 <video controls poster={thumbnail} width="477" height="268">
              						<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
            					</video>
		  					</div>
		  				</div>
		  			</div>
	  			</div>
	  		</div>			
			<Footer/>
	  	</div>
	</div>
  );
}

export default Assistance;

