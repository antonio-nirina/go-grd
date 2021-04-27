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
	      				<div>
	      				
	      				</div>
	      			</div>
	      			<div className="stat">

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

