import React from "react"
import { Link } from "react-router-dom"

import { faPlus, faChevronRight} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBar from "../header/sidebar"
import Nav from "../header/nav"


const CreateGame: React.FC = function() {
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
	                                <h1>Crée jeux</h1>
	                            </div>
	        					<div className="create-tournament-game">
	        						<Link to="/admin"><button className="btn bg-white"> Annuler</button></Link>
	                                <button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
	        					</div>
	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form>	                                      		                                        	
	                                            <input type="text" placeholder="Nom du jeux"/>
	                                            <div className="input-group">
	                                            	<label htmlFor="logo-game">Importer une image du logo</label>
	                                            	<label htmlFor="img-game">Importer une image du jeux</label>
	                                            </div>
	                                            <div className="input-group">	                                            	
	                                                <input type="file" id="logo-game"/>	                                                
	                                                <input type="file" id="img-game" className="no-margin"/>
	                                            </div>		                                            
	                                            <textarea placeholder="Description..."></textarea>
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

export default CreateGame
