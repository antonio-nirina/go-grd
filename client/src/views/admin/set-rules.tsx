import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import "../admin/admin.css"
import SideBar from "./sidebar"
import Nav from "./nav"

const SetRules: React.FC = function() {
	return(
	    <div className="admin">
			<div className="layout-container">
				<SideBar />
				<div className="content-wrapper">
					<nav className="navbar">
	          			<div></div>
	                    <Nav />
	        		</nav>
	        		<div className="main-content">
	        			<div className="body-content">
	        				<div className="column-rules">
	        					<div className="field">
		        					<div className="group-input">	        						
	                                    <form>                                        
	    									<label htmlFor="title-rules">Ajouter une règle : </label><input type="text" id="title-rules" placeholder="Titre de la règle" />
	    									<div className="wysiwyg"></div>
	    									<button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Ajouter</button>
	    								</form>
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

export default SetRules