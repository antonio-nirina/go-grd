import React from "react"

import Header0 from "../header/header0"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "../../assets/image/avatar.png"
import "../../assets/css/style.css"
import ReactDOM from "react-dom"


const Profil: React.FC = function() {
  return(
    <div className="profil connected">
      <div className="container">
	      <Header0/>
	      <div className="main-content">	      	
	      	<div className="main-pro">
	      		<div className="wall-bloc">	      			
		      		<div className="tabs">
		      			<ul>
		      				<li><a href="#" className="active">Mon mur</a></li>
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
			      			<p className="pseudo"><strong>Noob_021</strong></p>
		      			</div>
		      			<div className="avatar-info">
		      				
		      				<div className="table">
		      					<div className="cell">
		      						<h2>Plateform</h2>
		      						<p><span>Playstation</span></p>
		      					</div>
		      					<div className="cell">
		      						<h2>Serveur location</h2>
		      						<p><span>Asia</span></p>
		      					</div>
		      					<div className="cell">
		      						<h2>Expérience</h2>
		      						<p><span>5</span></p>
		      					</div>
		      					<div className="cell">
		      						<h2>Game duration</h2>
		      						<p><span>6 heures</span></p>
		      					</div>
		      				</div>	      				
		      			</div>
		      			<div className="stat">
		      				<div className="float">
		      					<h2>Mes stats</h2>
		      				</div>
		      				<div className="float">
			      				<p>Victoire : <span>40%</span></p>
			      				<div className="myProgress">    						
		    						<div className="myBar" style={{width:"40%", background:"#6642a9"}}></div>    						
		    					</div>
		    					<p>Defaite : <span>25%</span></p>
		    					<div className="myProgress">
		    						<div className="myBar" style={{width:"25%", background:"#1da1f2"}}></div>    						
		    					</div>
		    					<p>Abandon : <span>75%</span></p>
		    					<div className="myProgress">
		    						<div className="myBar" style={{width:"75%", background:"#f9753d"}}></div>    						
		    					</div>
		    				</div>
		      			</div>	      			
		      		</div>
		      	</div>
		      	<div className="about-bloc">
		      		<div className="about-me">
		      			<div className="field">
		      				<h2>Modifier votre profil</h2>
		      				<input type="text" placeholder="Pseudo"/>		      				
		      				<input type="number" placeholder="Numéro de téléphone"/>
		      				<input type="text" placeholder="Date de naissance"/>		      				
		      				<input type="text" placeholder="Entrez la date d'adhésion"/>		      				
		      				<input type="age" placeholder="Votre age"/>
		      				<input type="text" placeholder="Description"/>


		      				<div className="btn-container">
		      					<button className="btn bg-yellow mg15">Valider</button>
		      				</div>
		      			</div>		      					      			
		      		</div>
		      	</div>
	      		<div className="my-games">
	      			{/*<h2>Mes jeux</h2>
	      			<div className="img-game"></div>*/}
	      		</div>
	      		<div className="my-teams">
	      			{/*<h2>Mes équipes</h2>
	      			<div className="img-game"></div>*/}
	      		</div>
	      		<div className="mes-tournois">
	      			{/*<h2>Mes tournois</h2>
	      			<div className="img-game"></div>*/}
	      		</div>
	      		<div className="mes-resultats">
	      			{/*<h2>Mes résultats</h2>
	      			<div className="img-game"></div>*/}
	      		</div>
	      		<div className="premium">
	      			{/*<h2>Premium</h2>
	      			<div className="img-game"></div>*/}
	      		</div>

	      	</div>	      	
	      </div>	      
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profil;

