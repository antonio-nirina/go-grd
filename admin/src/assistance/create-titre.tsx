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
import {CREATE_ASSIST} from "../gql/assist/mutation"
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

interface SubjectTitle {
	title:string
	content:string
	tag:string
}


const CreateTitle = function() {
	const history = useHistory()
	const [arrayForm, setArrayForm] 	= useState<number[]>([1])
	const [underTilte,setUnderTilte] 	= useState<ContentUnderTitle[]>([])
	const [content,setContent] 	= useState<ContentUnderTitle[]>([])
	const [number, setNumber] 			= useState<number>(1)
	const [isErrorMax, setIsErrorMax] 			= useState<boolean>(false)
	const [isErrorCnt, setIsErrorCnt] 			= useState<boolean>(false)
	const [lapsDate, setLapsDate] 		= useState<string[]>([])
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdTitle]   				= useMutation(CREATE_ASSIST)

	const onSubmit = async function(data:Inputs){
		let newArr:any = []
		let lastArr:ContentUnderTitle[] = []
		if(underTilte){
			newArr.push({
				key:underTilte[0]?.key,
				title:underTilte[0]?.title,
				content:underTilte[0]?.content
			})
		}

		underTilte?.forEach(function(e:ContentUnderTitle,i:number){
			if(i > 0){
				newArr.forEach(function(el:ContentUnderTitle){
					if(el.key === e.key) {
						el.title = e.title
					}
				})
				newArr.push(e)
			}
		})
		newArr.forEach(function(e:any){
			let check = lastArr.find((el) =>  {return e.key === el.key})
			if(!check)lastArr.push(e)
		})

		let array:SubjectTitle[] = []
		lastArr.forEach(function(e:ContentUnderTitle){
			let cnt = content.find((cnt:ContentUnderTitle) => {return cnt.key === e.key})
			array.push({
				title:e.title,
				content:cnt?.content ? cnt.content : "",
				tag:e.title.split(" ").join("_")
			})
		})

		const result = await createdTitle({ variables: {
			assistInput:array,
			title:data.title,
		} })
		if (result.data.createAssistContent) {
			history.push("/admin/list-assist")
		}
	}

	const addForm = function() {
		let val = number+1
		console.log(val)
		console.log("content", content.length)
		if(val > 4)setIsErrorMax(true)
		if(val - content.length > 1) setIsErrorCnt(true)
		if(val <= 4 && val - content.length === 1) {
			setIsErrorCnt(false)
			setIsErrorMax(false)
			setNumber(val)
			setArrayForm([...arrayForm,number+1])
		}

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
		let content:ContentUnderTitle = {
			key:index,
			title:cash.currentTarget.value,
			content:""
		}
		let newTitle = [...underTilte,content]
		setUnderTilte(newTitle)
	}

	const handleContentText = function(index:number,contentData: string) {
		let contentText:ContentUnderTitle = {
			key:index,
			title:"",
			content:contentData
		}

		let newContent = [...content,contentText]
		setContent(newContent)
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
											{isErrorMax ? <h2 style={{color:"#dd0000"}}>Vous pouvez pas depassé 4 contenu:</h2> : <></>}
											{isErrorCnt ? <h2 style={{color:"#dd0000"}}>Il faut d'abord remplissez la première colonne:</h2> : <></>}
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
																onChange={(event) => handleContentText(index,event)}
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
