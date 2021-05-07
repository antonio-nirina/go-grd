import React from "react"

import Header0 from "../header/header0"
import Footer from "../footer/footer"
import "../profil/profil.css"
import Avatar from "../../assets/image/avatar.png"
import "../../assets/css/style.css"
import ReactDOM from "react-dom"
import Participate from "../participate/participate"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


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
		      				<li><a href="#wall" className="active"><i></i>Mon mur</a></li>
		      				<li><a href="#game"><i></i>Mes jeux</a></li>
		      				<li><a href="#"><i></i>Mes équipes</a></li>
		      				<li><a href="#"><i></i>Mes tournois</a></li>
		      				<li><a href="#"><i></i>Mes resultats</a></li>
		      				<li><a href="#"><i></i>Premium</a></li>
		      			</ul>
		      		</div>
		      		<div className="wall" id="wall">
		      			<div className="avatar">
			      			<p><img src = {Avatar} /></p>
			      			<p className="pseudo"><strong>Noob_021</strong></p>
		      			</div>
		      			<div className="avatar-info">
		      				
		      								
		      			</div>
		      			<div className="stat">
		      				
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
	    					<Popup
							    trigger={<button className="btn bg-yellow"> Ajouter jeux </button>}
							    modal
							    nested
  							>
					    	<div className="modal">
						        <button className="close">
						          &times;
						        </button>
						        <div className="header"> <h3>Selectionner parmis nos listes de jeux</h3></div>
							        <div className="content">
							          {' '}
							          <img src="https://i.ibb.co/8Y0r1NH/warzone.jpg" alt="warzone" />
							          <img src="https://i.ibb.co/CPDzC7n/rocketl.jpg" alt="rocketl" />
							        </div>
						        	<div className="actions">
							          	<Popup
							            	trigger={<button className="btn bg-yellow"> Ajouter jeux </button>}
							            	position="top center"
							            	nested
							          	>
						            		<span>
												Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
												magni omnis delectus nemo, maxime molestiae dolorem numquam
												mollitia, voluptate ea, accusamus excepturi deleniti ratione
												sapiente! Laudantium, aperiam doloribus. Odit, aut.
						            		</span>
										</Popup>
						          		<button className="btn bg-white">Valider</button>
						        	</div>
						     	</div>
						    </Popup>
	    				</div>
	      			</div>
	      		</div>
	      		<div className="my-teams">
	      			<h2>Mes équipes</h2>
	      			<div className="team-mate">
	      				<div className="team-bloc">
	      					<div className="team-banniere">
	      						<div className="imgcontainer">
	      							<img src="https://i.ibb.co/C59KCSd/team-mate.png" alt="team-mate" className="imgresp"/>
	      						</div>
	      						<div className="team-logo">
	      							<img src="https://i.ibb.co/dQPw2Vd/teamlogo.png" alt="teamlogo" width="75"/>
	      							<div className="team-name">
	      								<p>TEAM NAME</p>
	      								<p>#Tag</p>
	      							</div>	      					
	      						</div>	      							      						
	      					</div>
	      				</div>
	      				<div className="bt-game-container">
	    					<a href="#" className="btn bg-yellow">Ajouter une équipe</a>
	    				</div>
	      			</div>
	      		</div>
	      		<div className="mes-tournois">	      			
      				<div className="participate">
        				<Participate/>
        			</div>
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

