import React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "../../assets/image/avatar.png"
import "../../assets/css/style.css"


const Profil: React.FC = function() {
  return(
    <div className="profil">
      <div className="container">
	      <Header/>
	      <div className="main-content">	      	
	      	<div className="main-pro">
	      		<div className="tabs">
	      			<ul>
	      				<li><a href="#">Mon mur</a></li>
	      				<li><a href="#">Mes jeux</a></li>
	      				<li><a href="#">Mes équipes</a></li>
	      				<li><a href="#">Mes tournois</a></li>
	      				<li><a href="#">Mes resultats</a></li>
	      				<li><a href="#">Premium</a></li>
	      			</ul>
	      		</div>
	      		<div className="wall">
	      			<div className="avatar">
		      			<p><img src = {Avatar} /></p>
		      			<p><strong>Noob_021</strong></p>
	      			</div>
	      			<div className="avatar-info">
	      				
	      				<div className="table">
	      					<div className="cell">
	      						<p>Plateform</p>
	      						<p><span>Playstation</span></p>
	      					</div>
	      					<div className="cell">
	      						<p>Serveur location</p>
	      						<p><span>Asia</span></p>
	      					</div>
	      					<div className="cell">
	      						<p>Exp</p>
	      						<p><span>5</span></p>
	      					</div>
	      					<div className="cell">
	      						<p>Game duration</p>
	      						<p><span>6 heures</span></p>
	      					</div>
	      				</div>	      				
	      			</div>
	      			<div className="stat">
	      				<h2>Mes stats</h2>
	      				<p>Kill</p>
	      				<p>Death</p>
	      				<p>Assist</p>
	      			</div>
	      			<div className="percent">
	      				<h2>Win rate</h2>
	      				<p>85%</p>
	      			</div>
	      		</div>
	      		<div className="about-me">
	      			<div className="first">
	      				<input type="text" placeholder="Changer de pseudo"/>
	      				<input type="numéro" placeholder="Numéro de téléphone"/>
	      				<div className="lang">
	      					<p>Langue <span></span></p>
	      				</div>
	      			</div>
	      			<div className="second">
	      				<div className="audience">
	      					<h2>Stats globale</h2>
	      					<p>Nombre de victoire : <span>540</span></p>
	      					<p>Nombre de défaite : <span>230</span></p>
	      				</div>
	      			</div>
	      			<div className="third">
	      				<div className="graph"></div>
	      			</div>
	      		</div> 
	      		<div className="my-games">
	      			<h2>Mes jeux</h2>
	      			<div className="img-game"></div>
	      		</div>
	      		<div className="my-teams">
	      			<h2>Mes équipes</h2>
	      			<div className="img-game"></div>
	      		</div>
	      		<div className="mes-tournois">
	      			<h2>Mes tournois</h2>
	      			<div className="img-game"></div>
	      		</div>
	      		<div className="mes-resultats">
	      			<h2>Mes résultats</h2>
	      			<div className="img-game"></div>
	      		</div>
	      		<div className="premium">
	      			<h2>Premium</h2>
	      			<div className="img-game"></div>
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

