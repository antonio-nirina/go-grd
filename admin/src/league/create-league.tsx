import React from "react"
import { Link } from "react-router-dom"

import { faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBar from "../header/sidebar"
import Nav from "../header/nav"


const CreateLeague: React.FC = function() {
	return(
	    <div className="admin create-tournament">
			<div className="layout-container">
				<SideBar />
				<div className="content-wrapper">
					<nav className="navbar">
	          			<div></div>
	      				<Nav />
	        		</nav>
	        		<div className="main-content">
	        			<div className="body-content">
	        				<div className="column-tournament">
	        					<div className="title">
	                                <h1>Création d'une ligue</h1>
	                            </div>
	        					<div className="create-tournament-game">
	        						<Link to="/admin"><button className="btn bg-white"> Annuler</button></Link>
	                                <button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
	        					</div>
	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form>
	                                        	<input type="text" placeholder="Nom"/>
	                                        	<select id="select-game">
	                                                <option value="">Selectionnez le jeux...</option>
	                                                <option value="0">Apex Legends</option>
	                                                <option value="1">League of Legends</option>
	                                                <option value="2">Rocket League</option>
	                                            </select>
	                                            <select id="slot">
	                                                <option value="">Slot...</option>
	                                                <option value="0">16</option>
	                                                <option value="1">32</option>
	                                                <option value="2">64</option>
	                                                <option value="3">128</option>
	                                            </select>
	                                            <input type="text" placeholder="Nom de l'organisateur"/>
	                                            <input type ="text" placeholder="Date" />	                                            
	                                            <textarea placeholder="Description..."></textarea>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Nombre de participant"/>
	                                                <input type="number" placeholder="Nombre d'equipes" className="no-margin"/>
	                                            </div>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Prix"/>
	                                                <input type="number" placeholder="Frais de participation" className="no-margin"/>
	                                            </div>
	                                            <input type="text" placeholder="Deadline"/>
	                                            <Link to="/set-rules"><button className="btn bg-red">Modifier les règles <FontAwesomeIcon icon={faChevronRight} /> </button></Link>
	                                        </form>
	                                    </div>
	                                </div>
	                            </div>
	        				</div>
	        			</div>
	        		</div>
				</div>
			</div>
	  	</div>
  )
}

export default CreateLeague
