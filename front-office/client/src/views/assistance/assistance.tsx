import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"
import thumbnail from "../../assets/image/video.png"

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../assistance/assistance.css"


const Assistance: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
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
		  			<div className="aside-menu">
		  				<div className="support-link">
		  					<div className="link">
		  						<h3><Link to ="/" className="active">Accueil</Link></h3>
		  					</div>
		  					<div className="link">
		  						<h3><Link to ="/">Problème In-Game</Link></h3>
		  						<div className="link">
		  							<li><Link to ="#">Apex Legends</Link></li>
		  							<li><Link to ="#">Call of Duty : Warzone</Link></li>
		  							<li><Link to ="#">Call of Duty : Cold War</Link></li>
		  							<li><Link to ="#">Rocket League</Link></li>
		  							<li><Link to ="#">Fifa</Link></li>
		  						</div>
		  					</div>
		  					<div className="link">
		  						<h3><Link to ="/">Problème Social</Link></h3>
		  						<div className="link">
		  							<li><Link to ="#">Amis</Link></li>
		  							<li><Link to ="#">Chat</Link></li>
		  							<li><Link to ="#">GOGRIND App</Link></li>
		  							<li><Link to ="#">Hightlight</Link></li>		  							
		  						</div>
		  					</div>
		  					<div className="link">
		  						<h3><Link to ="/">Problème de connexion</Link></h3>
		  						<div className="link">
		  							<li><Link to ="#">Identifiant oublié</Link></li>
		  							<li><Link to ="#">Liaison console</Link></li>
		  							<li><Link to ="#">Impossible de rejoindre un lobby</Link></li>		  							
		  						</div>
		  					</div>
		  					
		  					<div className="link">
		  						<h3><Link to ="/contact">Contact</Link></h3>
		  					</div>
		  				</div>
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
	  			<Join/>
	  		</div>			
			<Footer/>
	  	</div>
	</div>
  );
}

export default Assistance;

