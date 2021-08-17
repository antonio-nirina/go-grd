import React from 'react'

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"


const SetAssist: React.FC = function() {

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
	        				<div className="column-home assistance">
	        					<div className="field">
	        						<div className="title">
	        							<h1>Dynamisation de la page assistance</h1>
	        							<div className="create-game">
	        								<button className="btn bg-red"><i><FontAwesomeIcon icon={faPlus} size="lg"/></i>Ajouter Nouveau bloc</button>
	        							</div>
	        						</div>
		        					<div className="group-input">		        						
	                                    <form className="wysiwyg-container">
	                                    	{/*Classe line pour ajouter une ligne, class both pour la colonne
	                                    	Nb : 1 ligne = 2 colonne*/}
	                                    	<div className="line">
		                                    	<div className="both">
		                                    	<div className="bloc">
		                                    		<div className="field">
		                                    			<div className="group-input">
		                                    				<div className="add-bloc">
			                                        			<div className="link-master">
				    												<label htmlFor="title-assist">Ajouter le titre : </label>
				    												<input type="text" placeholder="titre" id="title-assist"/>
				    											</div>
				    											<div className="under-link">
				    												<label htmlFor="underTitle">Ajouter le sous-titre : </label>
				    												<input type="text" placeholder="Sous-titre" id="underTitle" />
				    											</div>
				    										</div>
				    									</div>
				    								</div>
	    											<div className="wysiwyg">
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
																		'fullScreen']
																]
															}
														} />
	    											</div>
	    											<div className="btn-container clear">
	    												<button className="btn bg-white"><FontAwesomeIcon icon={faTimes} /> Supprimer</button>
		    											<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Ajouter</button>
		    										</div>
		    									</div>		    									
		    									</div>
		    									<div className="both">
			                                    	<div className="bloc">
			                                    		<div className="field">
			                                    			<div className="group-input">
			                                    				<div className="add-bloc">
				                                        			<div className="link-master">
					    												<label htmlFor="title-assist">Ajouter le titre : </label>
					    												<input type="text" placeholder="titre" id="title-assist"/>
					    											</div>
					    											<div className="under-link">
					    												<label htmlFor="underTitle">Ajouter le sous-titre : </label>
					    												<input type="text" placeholder="Sous-titre" id="underTitle" />
					    											</div>
					    										</div>
					    									</div>
					    								</div>
		    											<div className="wysiwyg">
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
																			'fullScreen']
																	]
																}
															} />
		    											</div>
		    											<div className="btn-container clear">
		    												<button className="btn bg-white"><FontAwesomeIcon icon={faTimes} /> Supprimer</button>
			    											<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Ajouter</button>
			    										</div>
			    									</div>		    									
		    									</div>
		    								</div>
		    								<div className="line">
		                                    	<div className="both">
		                                    	<div className="bloc">
		                                    		<div className="field">
		                                    			<div className="group-input">
		                                    				<div className="add-bloc">
			                                        			<div className="link-master">
				    												<label htmlFor="title-assist">Ajouter le titre : </label>
				    												<input type="text" placeholder="titre" id="title-assist"/>
				    											</div>
				    											<div className="under-link">
				    												<label htmlFor="underTitle">Ajouter le sous-titre : </label>
				    												<input type="text" placeholder="Sous-titre" id="underTitle" />
				    											</div>
				    										</div>
				    									</div>
				    								</div>
	    											<div className="wysiwyg">
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
																		'fullScreen']
																]
															}
														} />
	    											</div>
	    											<div className="btn-container clear">
	    												<button className="btn bg-white"><FontAwesomeIcon icon={faTimes} /> Supprimer</button>
		    											<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Ajouter</button>
		    										</div>
		    									</div>		    									
		    									</div>
		    									<div className="both">
			                                    	<div className="bloc">
			                                    		<div className="field">
			                                    			<div className="group-input">
			                                    				<div className="add-bloc">
				                                        			<div className="link-master">
					    												<label htmlFor="title-assist">Ajouter le titre : </label>
					    												<input type="text" placeholder="titre" id="title-assist"/>
					    											</div>
					    											<div className="under-link">
					    												<label htmlFor="underTitle">Ajouter le sous-titre : </label>
					    												<input type="text" placeholder="Sous-titre" id="underTitle" />
					    											</div>
					    										</div>
					    									</div>
					    								</div>
		    											<div className="wysiwyg">
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
																			'fullScreen']
																	]
																}
															} />
		    											</div>
		    											<div className="btn-container clear">
		    												<button className="btn bg-white"><FontAwesomeIcon icon={faTimes} /> Supprimer</button>
			    											<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Ajouter</button>
			    										</div>
			    									</div>		    									
		    									</div>
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
  	)
}

export default SetAssist
