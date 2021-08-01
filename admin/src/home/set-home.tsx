import React,{useState} from "react"

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { useForm } from "react-hook-form"
import {useMutation} from "@apollo/client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from "@fortawesome/free-solid-svg-icons"
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
	const [location, setLocation] 		= useState<string>("")
	const [createdHomePage]  			= useMutation(CREATE_HOME_PAGE_CONTENT)

	const onSubmit1 = async function(data:Inputs){
		const result = await createdHomePage({ variables: {
			location:location,
			title:data.title,
			underTitle:data.titleSous,
			content:content,
		} })
		if (result.data.createHomeContent) {
			setContent("")
			history.push("/admin/list-home")
		}
	}
	const onSubmit2 = async function(){
		const result = await createdHomePage({ variables: {
			location:location,
			title:title,
			underTitle:titleUnder,
			content:content,
		} })
		if (result.data.createHomeContent) {
			setContent("")
			history.push("/admin/list-home")
		}
	}
	const onSubmit3 = async function(){
		const result = await createdHomePage({ variables: {
			location:location,
			title:title,
			underTitle:titleUnder,
			content:content,
		} })
		if (result.data.createHomeContent) {
			setContent("")
			history.push("/admin/list-home")
		}
	}
	const onSubmit4 = async function(){
		const result = await createdHomePage({ variables: {
			location:location,
			title:title,
			underTitle:titleUnder,
			content:content,
		} })
		if (result.data.createHomeContent) {
			setContent("")
			history.push("/admin/list-home")
		}
	}
	const onSubmit5 = async function(){
		const result = await createdHomePage({ variables: {
			location:location,
			title:title,
			underTitle:titleUnder,
			content:content,
		} })
		if (result.data.createHomeContent) {
			setContent("")
			history.push("/admin/set-home")
		}
	}
	const onSubmit6 = async function(){
		const result = await createdHomePage({ variables: {
			location:location,
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

	const handleText2 = function(content: string) {
		setContent(content)
	}

	const handleText3 = function(content: string) {
		setContent(content)
	}

	const handleText4 = function(content: string) {
		setContent(content)
	}

	const handleText5 = function(content: string) {
		setContent(content)
	}

	const handleText6 = function(content: string) {
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
	        			<div className="body-content">
	        				<div className="column-home">
	        					<div className="field">
	        						<div className="title">
	        							<h1>Dynamisation de la page d'accueil</h1>
	        						</div>
		        					<div className="group-input">
		                                    <div className="both">
		                                    	<div className="flex-group">
			                                    	<form className="wysiwyg-container" onSubmit={handleSubmit(onSubmit1)}>
			    										<label htmlFor="title-home">Image sur wagger : </label>
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
			    										<button type="submit" className="btn bg-red" onClick={()=>{setLocation("image-wager")}} style={style}><FontAwesomeIcon icon={faPen} /> Modifier</button>
			    									</form>
		    									</div>
		    									<div className="flex-group">
		    										<form className="wysiwyg-container" onSubmit={handleSubmit(onSubmit2)}>
			    										<label htmlFor="title-home">Contenu wagger : </label>
			    										<input type="text" id="title-wagger" onChange={handleTitle} placeholder="Waggers titre" name="title" />
			    										<input type="text" id="title-wagger2" onChange={handleUnderTitle}  placeholder="Waggers sous-titre" name="titleSous" />
			    										<div className="wysiwyg">
				    										<SunEditor
				    											onChange={handleText2}
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
			    										<button type="submit" className="btn bg-red" onClick={()=>{setLocation("content-wagger")}} style={style}>
			    											<FontAwesomeIcon icon={faPen} /> Modifier
			    										</button>
		    										</form>
		    									</div>
		    								</div>
		    								<div className="both">
		                                    	<div className="flex-group">
		                                    		<form className="wysiwyg-container" onSubmit={handleSubmit(onSubmit3)}>
			    										<label htmlFor="title-home">Contenu participe tournois/ligue: </label>
			    										<input type="text" id="title-tournament" onChange={handleTitle} placeholder="Titre tournois ligue" name="title" />
			    										<input type="text" id="title-tournament2" onChange={handleUnderTitle} placeholder="Tournament sous-titre" name="titleSous" />
			    										<div className="wysiwyg">
				    										<SunEditor
				    											onChange={handleText3}
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
			    										<button type="submit" className="btn bg-red" onClick={()=>{setLocation("content-tournamentLigue")}} style={style}>
			    											<FontAwesomeIcon icon={faPen} /> Modifier
			    										</button>
		    										</form>
		    									</div>
		    									<div className="flex-group">
		    										<form className="wysiwyg-container" onSubmit={handleSubmit(onSubmit4)}>
			    										<label htmlFor="title-home">Image sur tournois/ligue: </label>
			    										<div className="wysiwyg">
				    										<SunEditor
				    											onChange={handleText4}
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
			    										<button type="submit" className="btn bg-red" onClick={()=>{setLocation("image-tournamentLigue")}} style={style}><FontAwesomeIcon icon={faPen} /> Modifier</button>
		    										</form>
		    									</div>
		    								</div>
	    									<div className="both">
	                                    		<div className="flex-group">
	                                    			<form className="wysiwyg-container" onSubmit={handleSubmit(onSubmit5)}>
			    										<label htmlFor="title-home">Image sur communaute : </label>
			    										<div className="wysiwyg">
				    										<SunEditor
				    											onChange={handleText5}
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
	    												<button type="submit" className="btn bg-red" onClick={()=>{setLocation("image-communaute")}} style={style}><FontAwesomeIcon icon={faPen} /> Modifier</button>
    												</form>
	    											</div>
		    									<div className="flex-group">
		    										<form className="wysiwyg-container" onSubmit={handleSubmit(onSubmit6)}>
			    										<label htmlFor="title-home">Contenu communaute : </label>
			    										<input type="text" id="title-communaute" onChange={handleTitle} placeholder="Titre communaute" name="title" />
			    										<input type="text" id="title-communaute2" onChange={handleUnderTitle} placeholder="Communaute sous-titre" name="titleSous" />
			    										<div className="wysiwyg">
				    										<SunEditor
				    											onChange={handleText6}
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
			    									</form>
		    										<button type="submit" className="btn bg-red" onClick={()=>{setLocation("content-torunament")}} style={style}><FontAwesomeIcon icon={faPen} /> Modifier</button>
		    									</div>
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

export default SetHome
