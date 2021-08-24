import React,{useState} from "react"
import {useMutation} from "@apollo/client"
import { useForm } from "react-hook-form"
import SunEditor from 'suneditor-react'
import {useHistory } from "react-router-dom"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATE_SUBJECT} from "../gql/assist/mutation"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"

type Inputs = {
	title:string
}


const CreateTitle = function() {
	const history = useHistory()
	const [content, setContent] 		= useState<string>("")
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdTitle]   				= useMutation(CREATE_SUBJECT)

	const onSubmit = async function(data:Inputs){
		const result = await createdTitle({ variables: {
			title:data.title,
			description:content
		} })
		if (result.data.createSubjectContent) {
			setContent("")
			history.push("/admin/list/subject")
		}
	}

	const handleText = function(content: string) {
		setContent(content)
	}
	return (
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
	                                    <form onSubmit={handleSubmit(onSubmit)}>
	    									<label htmlFor="title-rules">Titre publication : </label>
	    									<div className="input-group">
                                                <input type="text" id="title-rules" {...register("title", { required: true })} placeholder="Titre publication" name="title" />
                                            </div>
	    									<div className="wysiwyg">
	    										<SunEditor
	    											placeholder="Publication"
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
	    									<button className="btn bg-red" style={{"cursor":"pointer"}}><FontAwesomeIcon icon={faPlus} /> Ajouter</button>
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

export default CreateTitle
