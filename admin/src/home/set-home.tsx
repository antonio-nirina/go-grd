import React,{useState} from "react"

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import {useHistory } from "react-router-dom"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATE_HOME_PAGE_CONTENT} from "../gql/home/mutation"

const style = {
	"cursor":"pointer"
}

type Inputs = {
	title:string,
	titleSous:string
}

const SetHome: React.FC = function() {
	const history = useHistory()
	const { handleSubmit } 	= useForm<Inputs>()
	const [content, setContent] 		= useState<string>("")
	const [title, setTitle] 			= useState<string>("")
	const [titleUnder, setTitleUnder] 	= useState<string>("")
	const [createdHomePage]  			= useMutation(CREATE_HOME_PAGE_CONTENT)

	const onSubmit1 = async function(data:Inputs){
		const result = await createdHomePage({ variables: {
			location:"",
			title:title,
			underTitle:titleUnder,
			content:content,
		} })
		if (result.data.createHomeContent) {
			setContent("")
			history.push("/admin/list-home")
		}
	}

	const handleText1 = function(content: string) {
		setContent(content)
	}

	const handleTitle = function(event:any) {
		setTitle(event.target.value)
	}

	const handleUnderTitle = function(event:any) {
		setTitleUnder(event.target.value)
	}

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
	        			<div className="column-home assistance">
        					<div className="field">
        						<div className="title">
        							<h1>Dynamisation de la page d'accueil</h1>
        							<div className="create-game">
        								<button className="btn bg-red"><i><FontAwesomeIcon icon={faPlus} size="lg"/></i>Ajouter Nouveau bloc</button>
        							</div>
        						</div>
	        					<div className="group-input">		        						
                                    <form className="wysiwyg-container" onSubmit={handleSubmit(onSubmit1)}>
                                    	{/*Classe line pour la ligne, class both pour la colonne
	                                    	Nb : 1 ligne = 2 colonne*/}                                   	
                                    	<div className="line">
		                                    <div className="both">
		                                    	<div className="bloc">
		                                    		<div className="field">
		                                    			<div className="group-input">
		                                    				<div className="add-bloc">
			                                        			<div className="link-master">
				    												<label htmlFor="title-assist">Ajouter le titre : </label>
				    												<input onChange={handleTitle} type="text" placeholder="titre" id="title-assist"/>
				    											</div>
				    											<div className="under-link">
				    												<label htmlFor="underTitle">Ajouter le sous-titre : </label>
				    												<input type="text" onChange={handleUnderTitle} placeholder="Sous-titre" id="underTitle" />
				    											</div>
				    										</div>
				    									</div>
				    								</div>
	    											<div className="wysiwyg">
			    										<SunEditor
			    											onChange={handleText1}
			    											setOptions={
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
		    											<button className="btn bg-red"><FontAwesomeIcon icon={faPen} style={style} /> Ajouter</button>
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
  	)
}

export default SetHome
