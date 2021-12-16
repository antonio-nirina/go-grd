import React,{useState} from "react"
import {useMutation} from "@apollo/client"
import { useForm } from "react-hook-form"
import { faPlus,faTimes} from "@fortawesome/free-solid-svg-icons"
import {useHistory } from "react-router-dom"
import 'moment/locale/fr'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATE_SUBJECT} from "../gql/assist/mutation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Inputs {
	title:string
	underTitle:string
}

interface ContentUnderTitle {
	key:number,
	title:string
	content:string
}


const CreateTitle = function() {
	const history = useHistory()
	const [arrayForm, setArrayForm] 	= useState<number[]>([1])
	const [underTilte,setUnderTilte] 	= useState<ContentUnderTitle[]>([])
	const [number, setNumber] 			= useState<number>(1)
	const [lapsDate, setLapsDate] 		= useState<string[]>([])
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdTitle]   				= useMutation(CREATE_SUBJECT)

	const onSubmit = async function(data:Inputs){
		console.log("underTilte",underTilte)
	}

	const addForm = function() {
		setNumber(number+1)
		setArrayForm([...arrayForm,number+1])
	}

	const removeLine = function(index:number) {
		if(number > 1) {
			const arr = arrayForm.splice(1,index)
			setArrayForm(arr)
			setNumber(number-1)
			setLapsDate(lapsDate.splice(1,index))
		}
	}

	const handleUnderTitle = function(index:number,cash:React.FormEvent<HTMLInputElement>) {
		let array:ContentUnderTitle[] = []
		let content:ContentUnderTitle = {
			key:index,
			title:cash.currentTarget.value,
			content:""
		}
		array.push(content)

		setUnderTilte([...underTilte,content])
	}

	const handleContentText = function(content: string) {
		let contentText:ContentUnderTitle = {
			key:0,
			title:"",
			content:content
		}
console.log("underTilte", underTilte)
console.log("content", content)
		setUnderTilte([...underTilte,contentText])
		//setContent(content) (event) => handleContentText(index,event)
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
											<div></div>
	    									<div className="input-group">
												<input
													type="text"
													id="title-rules"
													{...register("title", { required: true })}
													placeholder="Titre principal" name="title"
												/>
                                            </div>
											{
												arrayForm.map(function(el:number,index:number) {
													return (
														<div key={index}>
															<div className="input-group" style={{"marginBottom":"15px"}}>
																<input
																	type="text"
																	id="underTitle-rules"
																	onBlur={(event) => handleUnderTitle(index,event)}
																	placeholder="Sous titre" name="underTitle"
																/>
																<div className="tour">
																	<div className="flexible">
																		<div onClick={addForm} className="add-tour btn bg-red"><i>
																			<FontAwesomeIcon icon={faPlus} size="lg"/>
																		</i>Ajouter Nouveau sous titre</div>
																		<div onClick={() => removeLine(index)} className= {index === 0 || arrayForm.length === 1 ? "d-none":"d-block"}>
																			<button className="btn bg-white">
																				<i>
																					<FontAwesomeIcon icon={faTimes} size="lg"/>
																				</i>
																				Supprimer
																			</button>
																		</div>
																	</div>
																</div>
															</div>
															<SunEditor
																placeholder="Règle du jeux"
																onChange={handleContentText}
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
																			]
																		]
																	}
															} />
													</div>

													)
												})
											}
	    									<button className="btn bg-red" style={{"cursor":"pointer"}}>
												<FontAwesomeIcon icon={faPlus} /> Ajouter
											</button>
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
