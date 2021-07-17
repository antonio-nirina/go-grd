import React from "react"
import { Link } from "react-router-dom"
//import {useMutation} from "@apollo/client"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import "../admin/admin.css"
import SideBar from "./sidebar"
import Nav from "./nav"
// import {CREATED_TOURNAMENT} from "../../gql/tournament/mutation"

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
	                                            <SunEditor setOptions={
													{
														buttonList:[
															['undo', 'redo',
																'font', 'fontSize', 'formatBlock',
																'bold', 'italic',
																'fontColor', 'hiliteColor', 'textStyle',
																'removeFormat',
																'outdent', 'indent',
																'align', 'horizontalRule', 'list', 'lineHeight',
																'link', 'image',
															]
														]
													}
												} />
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Nombre de participant"/>
	                                                <input type="number" placeholder="Nombre d'equipes" className="no-margin"/>
	                                            </div>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Prix à gagner"/>
	                                                <input type="number" placeholder="Frais de participation" className="no-margin"/>
	                                            </div>
	                                            <input type="text" placeholder="Deadline"/>
	                                            <SunEditor setOptions={
													{
														buttonList:[
															['undo', 'redo',
																'font', 'fontSize', 'formatBlock',
																'bold', 'italic',
																'fontColor', 'hiliteColor', 'textStyle',
																'removeFormat',
																'outdent', 'indent',
																'align', 'horizontalRule', 'list', 'lineHeight',
																'link', 'image',
															]
														]
													}
												} />
												<div className="create-tournament-game">
	        										<Link to="/admin"><button className="btn bg-white"> Annuler</button></Link>
                                					<button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
	        									</div>
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
