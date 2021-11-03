import React,{useState} from "react"

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { useForm } from "react-hook-form"
// import {useMutation} from "@apollo/client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
//import {useHistory } from "react-router-dom"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
// import {CREATE_HOME_PAGE_CONTENT} from "../gql/home/mutation"

const style = {
	"cursor":"pointer"
}

type Inputs = {
	title:string,
	titleSous:string
}

const SetHome: React.FC = function() {
	//const history = useHistory()
	const { handleSubmit } 	= useForm<Inputs>()
	const [title, setTitle] 			= useState<Array<string>>([])
	const [titleUnder, setTitleUnder] 	= useState<Array<string>>([])
	const [number, setNumber] 		= useState<number>(1)
	const [arrayForm, setArrayForm] 		= useState<Array<number>>([])
	// const [createdHomePage]  			= useMutation(CREATE_HOME_PAGE_CONTENT)
	const [image, setImage] = useState<string>("")
	const [imageGame, setImageGame] 	= useState<string>("")
	const [imageType, setImageType] = useState<string>("")
	const [imageGameType, setImageGameType] 	= useState<string>("")
	const [arrayContent, setArrayContent] 		= useState<Array<string>>([])

	const onSubmit1 = async function(){
		// let array:Array<any> = []
		let nIncontent:Array<any> = []

		for(let i=0;i<titleUnder.length;i++) {
			nIncontent.push({
				title:title[i],
				titleUnder:titleUnder[i],
				incontent:arrayContent[i]
			})
		}
		console.log(nIncontent)
		console.log(image)
		console.log(imageGame)
		console.log(imageType)
		console.log(imageGameType)
		/*const result = await createdHomePage({ variables: {
			name:"",
			title:title,
			underTitle:titleUnder,
			content:array,
			image:image,
			imageGame:imageGame,
			imageType:imageType,
			imageGameType:imageGameType
		} })
		if (result.data.createHomeContent) {
			setContent("")
			history.push("/admin/list-home")
		}*/
	}

	const handleText1 = function(content: string) {
		setArrayContent(arrayContent => [...arrayContent, content])
	}

	const handleTitle = function(event:any) {
		setTitle([...title,event.target.value])
	}

	const handleUnderTitle = function(event:any) {
		setTitleUnder(titleUnder => [...titleUnder, event.target.value])
	}

	const addForm = function() {
		setNumber(number+1)
		setArrayForm([...arrayForm,number+1])
	}

	const removeLine = function(index:number) {
		const arr = arrayForm.splice(0,index)
		setArrayForm(arr)
	}

	const handleUpload = function(e:any,type=false) {
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
        reader.onload = function(params) {
        	let file = typeof reader.result === "string" ? reader.result?.replace(/^data:(.*?);base64,/, "") : ""
			file = file.replace(/ /g, '+')
			if(type) {
				setImageGame(file)
				setImageType((e.target.files[0].type).split("/")[1])
			} else {
				setImage(file)
				setImageGameType((e.target.files[0].type).split("/")[1])
			}
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
	        			<div className="column-home assistance">
        					<div className="field">
        						<div className="title">
        							<h1>Dynamisation de la page d'accueil</h1>
        							<div className="create-game">
        								<button onClick={addForm} className="btn bg-red">
											<i><FontAwesomeIcon icon={faPlus} size="lg"/></i>
											Ajouter Nouveau bloc
										</button>
        							</div>
        						</div>
	        					<div className="group-input">
                                    <div className="input-group">
                                    	<label htmlFor="sliderImg" className="entete">Importer une image header</label>
                                    	<label htmlFor="bg-game" className="entete">Importer une image de fond du jeux</label>
                                    </div>
                                    <div className="input-group">
                                        <input type="file" id="sliderImg" onChange={(e)=>{handleUpload(e,true)}} />
                                        <input type="file" id="bg-game" onChange={(e)=>{handleUpload(e)}} className="no-margin" />
                                    </div>
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
		    									</div>
		    								</div>
		    							</div>
		    							{
		    								number > 1
		    								?
		    								arrayForm.map(function(el:number,index:number) {
		    									return (
		    										<div className="line" key={index}>
					                                    <div className="both">
					                                    	<div className="bloc">
					                                    		<div className="field">
					                                    			<div className="group-input">
					                                    				<div className="add-bloc">
						                                        			<div className="link-master">
							    												<label htmlFor="title-assist">Ajouter le titre : </label>
							    												<input onChange={handleTitle} type="text" placeholder="titre" id={`title-assist-${el}`}/>
							    											</div>
							    											<div className="under-link">
							    												<label htmlFor="underTitle">Ajouter le sous-titre : </label>
							    												<input type="text" onChange={handleUnderTitle} placeholder="Sous-titre" id={`underTitle-${el}`} />
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
				    												<div className="btn bg-white" onClick={() => removeLine(index)}><FontAwesomeIcon icon={faTimes} /> Supprimer</div>
					    										</div>
					    									</div>
					    								</div>
				    								</div>
	    										)
		    								})
		    								:
		    								null
		    							}
		    							<div className="btn-container clear">
											<button className="btn bg-white"><FontAwesomeIcon icon={faTimes} /> Supprimer</button>
											<button className="btn bg-red"><FontAwesomeIcon icon={faPen} style={style} /> Ajouter</button>
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
