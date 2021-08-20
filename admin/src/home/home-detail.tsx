import React,{useState,useEffect} from "react"
import {useMutation,useQuery} from "@apollo/client"
import { useForm } from "react-hook-form"
import SunEditor from 'suneditor-react'
import {useHistory,useParams } from "react-router-dom"
import 'suneditor/dist/css/suneditor.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {UPDATED_HOME_PAGE_CONTENT} from "../gql/home/mutation"
import {GET_ONE_HOME} from "../gql/home/query"

type Inputs = {
	title:string,
	underTitle:string
}

const DetailHome: React.FC = function() {
	const { id } 						= useParams<any>()
	const history 						= useHistory()
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [updatedHome]  			= useMutation(UPDATED_HOME_PAGE_CONTENT)
	const [home, setListHome] 			= useState<any>()
	const {loading,error,data} 			= useQuery(GET_ONE_HOME, {
		variables: {
			uid:id,
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setListHome(data.FindOneHome)
		}

	},[loading,error,data])

	const onSubmit = async function(data:Inputs){
		const result = await updatedHome({ variables: {
			uid:id,
		} })
		if (result.data.createPublication) {
			history.push("/admin/list-home")
		}
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
	    									<label htmlFor="title-rules">{home?.location} : </label>
	    									<input type="text" id="title-rules"{...register("title")} placeholder="Titre" name="title" />
	    									<input type="text" id="title-under"{...register("title")} placeholder="Sous-titre" name="underTitle" />
	    									<div className="wysiwyg">
	    										<SunEditor
	    											defaultValue={home?.content}
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
	    									<button className="btn bg-red" style={{"cursor":"pointer"}}><FontAwesomeIcon icon={faPlus} /> Modifier</button>
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

export default DetailHome
