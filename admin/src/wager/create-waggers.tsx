import React,{useState,useMemo} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useMutation,useQuery} from "@apollo/client"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form"
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import moment from 'moment'
import 'moment/locale/fr'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import Select from 'react-select'

import SideBar from "../header/sidebar"
import {CREATED_WAGGER} from "../gql/wagger/mutation"
import Nav from "../header/nav"
import {GET_ALL_GAMES,GET_ALL_PLATEFORM} from "../gql/games/query"
import {PlateformSelect,Plateforms} from "../tournament/create-tournament"

type Inputs = {
	title:string,
	price:string,
	format:string,
	priceParticipate:number,
	description:string,
	isPublic:boolean,
}


const CreateWaggers: React.FC = function() {
	const history = useHistory()
	const [startDate, setStartDate] 	= useState<string>("")
	const [lastDate, setLastDate] 		= useState<string>("")
	const [gameWay,setGameWay] 			= useState<string>("")
	const [uiGame,setUiGame] 			= useState<string>("")
	const [uidPlateform,setUidPlateform] = useState<string[]>([])
	const [plateforms,setPlateforms] 	= useState<PlateformSelect[]>([])
	const [games,setGames] 				= useState<Array<any>>([])
	const [isPub,setIsPub] 				= useState<boolean>(false)
	const [rules, setRules] 	= useState<String>("")
	const { register, handleSubmit } 	= useForm<Inputs>()

	const [createWagger]  			= useMutation(CREATED_WAGGER)
	const {loading,error,data} = useQuery(GET_ALL_GAMES)
	const {loading:loadingP,error:errorP,data:dataP} = useQuery(GET_ALL_PLATEFORM)

	useMemo(() => {
		if(!loading && !error && data) setGames(data.FindAllGame)
		if(!loadingP && !errorP && dataP) {
			let arrayPl:PlateformSelect[] = []
			dataP.FindAllPlateform.forEach(function(pl:Plateforms) {
				arrayPl.push({
					label:pl.name,
					value:pl.uid
				})
			})
			setPlateforms(arrayPl)
		}
	},[loading,error,data,loadingP,errorP,dataP])

	const onSubmit = async function(data:Inputs){
		const result = await createWagger({ variables: {
			date:startDate,
			title:data.title,
			uidGame:uiGame,
			uidPalteforme:uidPlateform.join("_"),
			description:data.description ? data.description : "",
			price:data.price,
			format:data.format ? data.format : "",
			gameWay:gameWay,
			deadlineDate:lastDate,
			priceParticipate:data.priceParticipate?data.priceParticipate:"",
			isPublic:data.isPublic,
			rules:rules
		} })
		if (result.data.createWagger) history.push("/admin/wagger")
	}

	const handleGame = function(event:any) {
		setUiGame(event.target.value)
	}

	const handlePlateform = function(event:any) {
		let uids:string[] = []
		event.forEach(function(e:PlateformSelect) {
			uids.push(e.value)
		})
		setUidPlateform(uids)
	}

	const handleDate = function(date:any) {
		setStartDate(moment(date._d).toString())
	}

	const handleDateDeadline = function(date:any) {
		setLastDate(moment(date._d).toString())
	}

	const handleGameWay = function(event:any){
		setGameWay(event.target.value)
	}

	const handleTextPub = function(event:any) {
		setIsPub(event.target.checked)
	}

	const handleRulesText = function(content: string) {
		setRules(content)
	}

	return(
	    <div className="admin create-tournament">
			<div className="layout-container">
				<SideBar />
				<div className="content-wrapper">
					<nav className="navbar">
	          			<div></div>
	      				<Nav />
	        		</nav>
	        		<div className="main-content">
	        			<div className="body-content">
	        				<div className="column-tournament">
	        					<div className="title">
	                                <h1>Cr??e wagger</h1>
	                            </div>

	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form onSubmit={handleSubmit(onSubmit)}>
	                                        	<div className="premium">
		                                        	<label className="switch">
		                                        		<input type="checkbox" {...register("isPublic")} name="isPublic" onChange={handleTextPub} />
		                                        		<span className="slider">{isPub ? "Public" : "Priv??"}</span>
		                                        	</label>
	                                        	</div>
	                                        	<input type="text" placeholder="Titre wagger" {...register("title")} name="title" />
	                                        	<select id="select-mode" onChange={handleGameWay}>
	                                                <option value="">Selectionnez le mode de jeux...</option>
	                                                <option value="1v1">1v1</option>
	                                                <option value="2v2">2v2</option>
													<option value="3v3">3v3</option>
	                                                <option value="4v4">4v4</option>
	                                            </select>
	                                            <select id="jeux" onChange={handleGame}>
	                                                <option value="">Selectionnez le jeux...</option>
	                                                {
	                                                	games?.map(function(el:any,index:number) {
	                                                		return(
	                                                			<option key={index} value={el.uid}>{el.name}</option>
                                                			)
	                                                	})
	                                                }
	                                            </select>
												<Select isMulti id="platform" onChange={handlePlateform} options={plateforms} />
	                                            <input type="text" placeholder="Format game" {...register("format")} name="format" />

	                                            <Datetime
												 	locale="fr"
													onChange={handleDate}
													inputProps={{placeholder:"Date"}}
												/>
												<Datetime
												 	locale="fr"
													onChange={handleDateDeadline}
													inputProps={{placeholder:"Deadline"}}
												/>
												<div className="wysiwyg">
		                                            <SunEditor
														placeholder="R??gle du jeux"
														onChange={handleRulesText}
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
	                                            <textarea placeholder="Description..." {...register("description")}></textarea>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Prix ?? gagner" {...register("price")} name="price" />
	                                                <input type="number" placeholder="Frais d'inscription" {...register("priceParticipate")} name="priceParticipate" className="no-margin"/>
	                                            </div>
	                                            <div className="create-tournament-game">
						    						<Link to="/admin/wagger"><button className="btn bg-white"> Annuler</button></Link>
						                            <button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
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
	  	</div>
  )
}

export default CreateWaggers
