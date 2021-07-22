import React from 'react'

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from "@fortawesome/free-solid-svg-icons"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"


const SetHome: React.FC = function() {

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
	        				<div className="column-home">
	        					<div className="field">
	        						<div className="title">
	        							<h1>Dynamisation de la page d'accueil</h1>
	        						</div>
		        					<div className="group-input">		        						
	                                    <form className="wysiwyg-container">
		                                    <div className="both">
		                                    	<div className="flex-group">
		    										<label htmlFor="title-home">Bloc 1 à gauche : </label>
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
		    										<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Modifier</button>
		    									</div>
		    									<div className="flex-group">
		    										<label htmlFor="title-home">Bloc 1 à droite : </label>
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
		    										<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Modifier</button>
		    									</div>
		    								</div>
		    								<div className="both">
		                                    	<div className="flex-group">
		    										<label htmlFor="title-home">Bloc 2 à gauche : </label>
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
		    										<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Modifier</button>
		    									</div>
		    									<div className="flex-group">
		    										<label htmlFor="title-home">Bloc 2 à droite : </label>
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
		    										<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Modifier</button>
		    									</div>
		    								</div>
		    								<div className="both">
		                                    	<div className="flex-group">
		    										<label htmlFor="title-home">Bloc 3 à gauche : </label>
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
		    										<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Modifier</button>
		    									</div>
		    									<div className="flex-group">
		    										<label htmlFor="title-home">Bloc 3 à droite : </label>
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
		    										<button className="btn bg-red"><FontAwesomeIcon icon={faPen} /> Modifier</button>
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

export default SetHome
