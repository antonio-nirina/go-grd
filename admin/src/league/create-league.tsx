import React,{useState,useMemo} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useMutation,useQuery} from "@apollo/client"
import { useForm } from "react-hook-form"
import Datetime from "react-datetime"
import moment from 'moment'
import 'moment/locale/fr'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATED_LEAGUE} from "../gql/league/mutation"
import {GET_ALL_GAMES,GET_ALL_PLATEFORM} from "../gql/games/query"

type Inputs = {
	participant: number,
	title:string,
	price:number,
	numberTeam:number,
	priceParticipate:number,
	organizer:string
}


const CreateLeague: React.FC = function() {
	const history = useHistory()
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [games,setGames] 				= useState<Array<any>>([])
	const [plateforms,setPlateforms] 	= useState<Array<any>>([])
	const [isValid,setIsValid] 			= useState<Boolean>(false)
	const [uiGame,setUiGame] 			= useState<Boolean>(false)
	const [uidPlateform,setUidPlateform] = useState<string>("")
	const [startDate, setStartDate] 	= useState<string>("")
	const [lastDate, setLastDate] 		= useState<string>("")
	const [rules, setRules] 	= useState<string>("")
	const [info, setInfo] 		= useState<string>("")
	const [slot, setSlot] 		= useState<number>(0)
	const [createdLeague]  			= useMutation(CREATED_LEAGUE)

	const {loading,error,data} = useQuery(GET_ALL_GAMES)
	const {loading:loadingP,error:errorP,data:dataP} = useQuery(GET_ALL_PLATEFORM)

	useMemo(() => {
		if(!loading && !error && data) setGames(data.FindAllGame)
		if(!loadingP && !errorP && dataP) setPlateforms(dataP.FindAllPlateform)
	},[loading,error,data,loadingP,errorP,dataP])

	const onSubmit = async function(data:Inputs){
		if(uiGame && uiGame  && data.title && data.organizer && slot && startDate && lastDate) {
			const result = await createdLeague({ variables: {
				date:startDate,
				title:data.title,
				uidGame:uiGame,
				uidPalteforme:uidPlateform,
				description:info,
				numberParticipate:slot,
				numberTeam:data.numberTeam,
				price:data.price,
				deadlineDate:lastDate,
				priceParticipate:data.priceParticipate,
				rules:rules,
				organizer:data.organizer,
			} })
			if (result.data.saveLeague) history.push("/admin/league")
		} else {
			setIsValid(true)
		}
	}

	const handleGame = function(event:any) {
		setUiGame(event.target.value)
	}

	const handlePlateform = function(event:any) {
		setUidPlateform(event.target.value)
	}

	const handleDate = function(date:any) {
		setStartDate(moment(date._d).toString())
	}

	const handleDateLast = function(date:any) {
		setLastDate(moment(date._d).toString())
	}

	const handleRulesText = function(content: string) {
		setRules(content)
	}

	const handleInfoText = function(content: string) {
		setInfo(content)
	}

	const handleSlot = function(event:any) {
		setSlot(parseInt(event.target.value))
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
	                                <h1>Création d'une ligue</h1>
	                            </div>
	                            <div style={{color:"red"}}>{isValid ? "Error champ est invalid" : ""}</div>

	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form onSubmit={handleSubmit(onSubmit)}>
	                                        	<input type="text" placeholder="Titre league" {...register("title")} name="title"/>
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
	                                            <select id="platform" onChange={handlePlateform}>
	                                                <option value="">Selectionnez les plateformes...</option>
	                                                {
	                                                	plateforms?.map(function(el:any,index:number) {
	                                                		return(
	                                                			<option key={index} value={el.uid}>{el.name}</option>
                                                			)
	                                                	})
	                                                }
	                                            </select>
	                                            <select id="slot" onChange={handleSlot}>
	                                                <option value="">Slot...</option>
	                                                <option value="16">16</option>
	                                                <option value="32">32</option>
	                                                <option value="64">64</option>
	                                                <option value="128">128</option>
	                                            </select>
	                                            <input type="text" placeholder="Nom de l'organisateur" {...register("organizer")} name="organizer"/>
	                                            <Datetime
												 	locale="fr"
													onChange={handleDate}
													inputProps={{placeholder:"Date debut league"}}
												/>
	                                            <div className="wysiwyg">
		                                            <SunEditor
														placeholder="Règle du jeux"
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
	                                            <div className="input-group">
	                                                 <input type="number"
														placeholder="Nombre d'equipes"
														{...register("numberTeam")} name="numberTeam"
														className="no-margin"/>
	                                            </div>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Prix à gagner" {...register("price")} name="price" />
	                                                <input type="number" placeholder="Frais de participation" {...register("priceParticipate")} name="priceParticipate" className="no-margin"/>
	                                            </div>
	                                            <Datetime locale="fr" onChange={handleDateLast} inputProps={{placeholder:"Deadline date tournois"}} />
	                                            <div className="wysiwyg">
		                                            <SunEditor
														placeholder="Info sur le jeux"
														onChange={handleInfoText}
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
												<div className="create-tournament-game">
	        										<Link to="/admin"><button className="btn bg-white"> Annuler</button></Link>
                                					<button type="submit" className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
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

export default CreateLeague
