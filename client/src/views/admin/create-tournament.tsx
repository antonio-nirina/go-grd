import React from "react"
import { Link } from "react-router-dom"

import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../admin/admin.css"
import SideBar from "./sidebar"
import Nav from "./nav"


const CreateTournament: React.FC = function() {
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
	                                <h1>Création d'un tournois</h1>
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
	                                            <select id="jeux">
	                                                <option value="">Selectionnez le jeux...</option>
	                                                <option value="0">Apex Legends</option>
	                                                <option value="1">League of Legends</option>
	                                                <option value="2">Rocket League</option>
	                                            </select>
	                                            <input type ="text" placeholder="Date" />
	                                            <select id="platform">
	                                                <option value="">Selectionnez les plateformes...</option>
	                                                <option value="0">Playstation</option>
	                                                <option value="1">Xbox</option>
	                                            </select>
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
	                                            <button className="btn bg-red">Modifier les règles</button>
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

export default CreateTournament
