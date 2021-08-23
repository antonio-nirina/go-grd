import React,{useState,useEffect} from 'react'
import {useMutation,useQuery} from "@apollo/client"
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons"
import {useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATE_ASSIST} from "../gql/assist/mutation"
import {GET_ALL_SUBJECT} from "../gql/assist/query"

type Inputs = {
	title:string
	titleUnder:string
}

const SetAssist: React.FC = function() {
	const history = useHistory()
	const { register, formState: { errors },handleSubmit } 	= useForm<Inputs>()
	const [content, setContent] 		= useState<string>("")
	const [title, setTitle] 			= useState<string>("")
	const [titles, setTitles] 			= useState<any>([])
	const [createdAssist]  				= useMutation(CREATE_ASSIST)
	const {loading,error,data} 			= useQuery(GET_ALL_SUBJECT)

	const onSubmit = async function(data:Inputs){
		const result = await createdAssist({ variables: {
			location:"",
			title:title,
			underTitle:data.titleUnder,
			content:content,
		} })
		if (result.data.createAssistContent) {
			history.push("/admin/list-assist")
		}
	}

	useEffect(() => {
		if(!loading && !error && data) {
			setTitles(data.FindAllSubject)
		}
	},[loading,error,data])

	const handleText = function(content: string) {
		setContent(content)
	}

	const handleTitle = function(event:any) {
		setTitle(event.target.value)
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
	        			<div className="body-content">
	        				<div className="column-home assistance">
	        					<div className="field">
	        						<div className="title">
	        							<h1>Dynamisation de la page assistance</h1>
	        						</div>
		        					<div className="group-input">		        						
	                                    <form onSubmit={handleSubmit(onSubmit)} className="wysiwyg-container">
	                                    	{/*Classe line pour ajouter une ligne, class both pour la colonne
	                                    	Nb : 1 ligne = 2 colonne*/}
		    								<div className="line">
		                                    	<div className="both">
		                                    	<div className="bloc">
		                                    		<div className="field">
		                                    			<div className="group-input">
		                                    				<div className="add-bloc">
		                                    					<select id="jeux" onChange={handleTitle}>
					                                                <option value="">Selectionnez le titre...</option>
					                                                {
					                                                	titles?.map(function(el:any,index:number) {
					                                                		return(
					                                                			<option key={index} value={el.uid}>{el.title}</option>
				                                                			)
					                                                	})
					                                                }
					                                            </select>
					                                            <div className="under-link">
				    												<label htmlFor="underTitle">Ajouter le sous-titre : </label>
				    												{errors.titleUnder && <p style={{"color":"red"}}>{errors.titleUnder.message}</p>}
				    												<input type="text" placeholder="Sous-titre" {...register("titleUnder", { required: "Sous-titre est obligatoire" })} id="underTitle" name="titleUnder" />
				    											</div>
				    										</div>
				    									</div>
				    								</div>
	    											<div className="wysiwyg">
			    										<SunEditor
			    											onChange={handleText}
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
	    												<Link to="/admin/list-assist" className="btn bg-white white"><FontAwesomeIcon icon={faTimes} /> Supprimer</Link>
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
