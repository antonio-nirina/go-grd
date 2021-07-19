import React from "react"
import { Link } from "react-router-dom"

import { faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBar from "../header/sidebar"
import Nav from "../header/nav"


const CreateWaggers: React.FC = function() {
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
	                                <h1>Crée wagger</h1>
	                            </div>
	        					<div className="create-tournament-game">
	        						<Link to="/admin"><button className="btn bg-white"> Annuler</button></Link>
	                                <button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
	        					</div>
	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form>	                                      		                                        	
	                                        	<select id="select-mode">
	                                                <option value="">Selectionnez le mode de jeux...</option>
	                                                <option value="0">1v1</option>
	                                                <option value="1">3v3</option>	                                                
	                                            </select>
	                                            <select id="rank">
	                                                <option value="">Rank...</option>
	                                                <option value="0">Platine</option>
	                                                <option value="1">Diamond</option>	                                                
	                                            </select>                                          
	                                            <select id="format">
	                                                <option value="">Format...</option>
	                                                <option value="0">B03</option>
	                                                <option value="1">B01</option>	                                                
	                                            </select>
	                                            <select id="entry">
	                                                <option value="">Entrée...</option>
	                                                <option value="0">Public</option>
	                                                <option value="1">Privée</option>	                                                
	                                            </select>	                                           
	                                            <input type="text" placeholder="Heure"/>
	                                            <input type ="text" placeholder="Date" />	                                            
	                                            <textarea placeholder="Description..."></textarea>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Nombre de participant"/>
	                                                <input type="number" placeholder="Nombre d'equipes" className="no-margin"/>
	                                            </div>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Prix"/>
	                                                <input type="number" placeholder="Frais d'inscription" className="no-margin"/>
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

export default CreateWaggers
