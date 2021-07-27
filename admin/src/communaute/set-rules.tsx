import React,{useState} from "react"
import {useMutation} from "@apollo/client"
import { useForm } from "react-hook-form"
import SunEditor from 'suneditor-react'
import {useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import 'suneditor/dist/css/suneditor.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import SideBar from "../header/sidebar"
import {RootState} from "../reducer"
import Nav from "../header/nav"
import {CREATE_PUBLICATION} from "../gql/cmty/mutation"

type Inputs = {
	title:string
}


const SetRules: React.FC = function() {
	const history = useHistory()
	const [content, setContent] = useState<string>("")
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdTournament]  			= useMutation(CREATE_PUBLICATION)
	const userConnectedRedux 			= useSelector((state:RootState) => state.userConnected)

	const onSubmit = async function(data:Inputs){
		const result = await createdTournament({ variables: {
			uidUser:userConnectedRedux.user.uid,
			title:data.title,
			content:content,
		} })
		if (result.data.createPublication) {
			setContent("")
			history.push("/admin/communaute")
		}
	}

	const handleText = function handleText(content: string) {
		setContent(content)
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
	        				<div className="column-rules">
	        					<div className="field">
		        					<div className="group-input">
	                                    <form onSubmit={handleSubmit(onSubmit)}>
	    									<label htmlFor="title-rules">Publication : </label>
	    									<input type="text" id="title-rules"{...register("title", { required: true })} placeholder="Publication communaute" name="title" />
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
