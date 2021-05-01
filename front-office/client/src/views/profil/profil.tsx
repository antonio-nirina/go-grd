import React from "react"

import Header0 from "../header/header0"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "../../assets/image/avatar.png"
import "../../assets/css/style.css"
import ReactDOM from "react-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'


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
		      				<li><a href="#wall" className="active">Mon mur</a></li>
		      				<li><a href="#game">Mes jeux</a></li>
		      				<li><a href="#">Mes équipes</a></li>
		      				<li><a href="#">Mes tournois</a></li>
		      				<li><a href="#">Mes resultats</a></li>
		      				<li><a href="#">Premium</a></li>
		      			</ul>
		      		</div>
		      		<div className="wall" id="wall">
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
		      					<a href="#" className="btn bg-yellow mg15">Valider</a>
		      				</div>
		      			</div>		      					      			
		      		</div>
		      	</div>
	      		<div id="game" className="my-games">
	      			<h2>Mes jeux</h2>
	      			<div className="img-game">
	      				<Carousel swipeable={true} centerSlidePercentage={20} dynamicHeight={false} centerMode={true} showArrows={true} autoPlay={true} interval={8000} infiniteLoop={true} showThumbs={false} transitionTime={1000}>
					        <div className="game-slide"><img src="https://i.ibb.co/ByGkhS1/apexlegend.jpg" alt="apexlegend" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/Yd2v60Q/blackops.jpg" alt="blackops"/></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/TK5JYMz/fifa21.jpg" alt="fifa21" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/Dtym1JK/fortnite.jpg" alt="fortnite" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/9VPnb7p/mwarfare.jpg" alt="mwarfare" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/89xKdw2/rainbowsix-siege.jpg" alt="rainbowsix-siege"/></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/CPDzC7n/rocketl.jpg" alt="rocketl" /></div>
					      	<div className="game-slide"><img src="https://i.ibb.co/8Y0r1NH/warzone.jpg" alt="warzone" /></div>
	    				</Carousel>
	    				<div className="bt-game-container">
	    					<a href="#" className="btn bg-yellow">Ajouter jeux</a>
	    				</div>
	      			</div>
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

