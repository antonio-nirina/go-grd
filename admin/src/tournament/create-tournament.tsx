import React,{useState,useMemo} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useMutation,useQuery} from "@apollo/client"
import { useForm } from "react-hook-form"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import moment from 'moment'
import 'moment/locale/fr'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATED_TOURNAMENT} from "../gql/tournament/mutation"
import {GET_ALL_GAMES,GET_ALL_PLATEFORM} from "../gql/games/query"
import "./tournament.css"

type Inputs = {
	participant: number,
	title:string,
	price:number,
	numberTeam:number,
	priceParticipate:number,
}

const CreateTournament: React.FC = function() {
	const history = useHistory()
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [games,setGames] 				= useState<Array<any>>([])
	const [plateforms,setPlateforms] 	= useState<Array<any>>([])
	const [isValid,setIsValid] 			= useState<Boolean>(false)
	const [uiGame,setUiGame] 			= useState<String>("")
	const [uidPlateform,setUidPlateform] = useState<String>("")
	const [startDate, setStartDate] 	= useState<String>("")
	const [lastDate, setLastDate] 		= useState<String>("")
	const [rules, setRules] 	= useState<String>("")
	const [info, setInfo] 		= useState<String>("")
	const [createdTournament]  			= useMutation(CREATED_TOURNAMENT)

	const {loading,error,data} = useQuery(GET_ALL_GAMES)
	const {loading:loadingP,error:errorP,data:dataP} = useQuery(GET_ALL_PLATEFORM)

	useMemo(() => {
		if(!loading && !error && data) setGames(data.FindAllGame)
		if(!loadingP && !errorP && dataP) setPlateforms(dataP.FindAllPlateform)
	},[loading,error,data,loadingP,errorP,dataP])

	const onSubmit = async function(data:Inputs){
		if(!uiGame && !uiGame && !data.title) {
			setIsValid(true)
		}

		try {
			const result = await createdTournament({ variables: {
				date:startDate,
				title:data.title,
				uidGame:uiGame,
				uidPalteforme:uidPlateform,
				description:info,
				numberParticipate:Math.pow(2,(Math.ceil(Math.log2(Number(data.participant))))),
				numberTeam:data.numberTeam,
				price:data.price,
				deadlineDate:lastDate,
				priceParticipate:data.priceParticipate,
				rules:rules
			} })
			if (result.data.saveTournament) history.push("/admin/tournament")
		} catch(e:unknown) {
			console.log("error", e)
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
	                                <h1>Création d'un tournois</h1>
	                            </div>
								<div style={{color:"red"}}>{isValid ? "Error champ est invalid" : ""}</div>
	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form onSubmit={handleSubmit(onSubmit)}>
	                                        	<div className="premium">
		                                        	<label className="switch">
		                                        		<input type="checkbox" value="false" />
		                                        		<span className="slider">Premium</span>
		                                        	</label>
	                                        	</div>
	                                        	<input type="text" placeholder="Titre tournois" {...register("title")} name="title"/>
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
												<Datetime
												 	locale="fr"
													onChange={handleDate}
													inputProps={{placeholder:"Date debut tournois"}}
												/>
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
	                                                <input
	                                                	type="number"
	                                                	{...register("participant")} name="participant"
	                                                	placeholder="Nombre de participant"/>
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

export default CreateTournament
