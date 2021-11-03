import React,{useState,useMemo} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useMutation,useQuery} from "@apollo/client"
import { useForm } from "react-hook-form"
import { faPlus,faTimes} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import moment from 'moment'
import 'moment/locale/fr'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import Select from 'react-select'

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATED_TOURNAMENT} from "../gql/tournament/mutation"
import {GET_ALL_GAMES,GET_ALL_PLATEFORM} from "../gql/games/query"
import "./tournament.css"
import { type } from "os"

type Inputs = {
	participant: number,
	title:string,
	price:number,
	numberTeam:number,
	priceParticipate:number,
	spectateur:string,
	format:string,
	region:string,
	server:string
}
type PlateformSelect = {
	label:string,
	value:string
}
type Plateforms = {
	uid:string,
	name:string,
	logo:string,
	description:string
}

const CreateTournament: React.FC = function() {
	const history = useHistory()
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [games,setGames] 				= useState<Array<any>>([])
	const [plateforms,setPlateforms] 	= useState<PlateformSelect[]>([])
	const [isValid,setIsValid] 			= useState<boolean>(false)
	const [uiGame,setUiGame] 			= useState<string>("")
	const [uidPlateform,setUidPlateform] = useState<string>("")
	const [startDate, setStartDate] 	= useState<string>("")
	const [lastDate, setLastDate] 		= useState<string>("")
	const [lapsDate, setLapsDate] 		= useState<string[]>([])
	const [rules, setRules] 	= useState<String>("")
	// const [info, setInfo] 		= useState<String>("")
	const [arrayForm, setArrayForm] 		= useState<number[]>([1])
	const [number, setNumber] 		= useState<number>(1)
	const [createdTournament]  			= useMutation(CREATED_TOURNAMENT)

	const {loading,error,data} = useQuery(GET_ALL_GAMES)
	const {loading:loadingP,error:errorP,data:dataP} = useQuery(GET_ALL_PLATEFORM)

	useMemo(() => {
		console.log(dataP)
		if(!loading && !error && data) setGames(data.FindAllGame)
		if(!loadingP && !errorP && dataP) {
			let arrayPl:PlateformSelect[] = []
			dataP.FindAllPlateform.forEach(function(pl:Plateforms) {
				arrayPl.push({
					label:pl.uid,
					value:pl.name
				})
			})
			setPlateforms(arrayPl)
		}
	},[loading,error,data,loadingP,errorP,dataP])

	const onSubmit = async function(data:Inputs){
		if(!uiGame && !uiGame && !data.title) {
			setIsValid(true)
		}

		/*try {
			const result = await createdTournament({ variables: {
				date:startDate,
				title:data.title,
				uidGame:uiGame,
				uidPalteforme:uidPlateform,
				description:"",//info
				numberParticipate:Math.pow(2,(Math.ceil(Math.log2(Number(data.participant))))),
				numberTeam:data.numberTeam,
				price:data.price,
				deadlineDate:lastDate,
				priceParticipate:data.priceParticipate,
				rules:rules,
				laps:lapsDate.join("_")
			} })
			if (result.data.saveTournament) history.push("/admin/tournament")
		} catch(e:unknown) {
			console.log("error", e)
		}*/

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

	const handleDateLaps = function(date:any) {
		setLapsDate([...lapsDate,moment(date._d).toString()])
	}

	const handleRulesText = function(content: string) {
		setRules(content)
	}

	/*
		const handleInfoText = function(content: string) {
			setInfo(content)
		}
	*/

	const addForm = function() {
		setNumber(number+1)
		setArrayForm([...arrayForm,number+1])
	}

	const removeLine = function(index:number) {
		if(number > 1) {
			const arr = arrayForm.splice(1,index)
			setArrayForm(arr)
			setNumber(number-1)
		}
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
												<Select id="platform" onChange={handlePlateform} options={plateforms} />										                                            
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
	                                                <input type="text" placeholder="Frais de participation" {...register("priceParticipate")} name="priceParticipate" className="no-margin"/>
	                                            </div>
	                                            <Datetime locale="fr" onChange={handleDateLast} inputProps={{placeholder:"Fin d'inscription"}} />
												<input type="text" placeholder="Format" {...register("format")} name="format" className="no-margin"/>
												<input type="text" placeholder="Serveur" {...register("server")} name="format" className="no-margin"/>
												<input type="text" placeholder="Spectateur" {...register("spectateur")} name="format" className="no-margin"/>
												<input type="text" placeholder="Region" {...register("region")} name="format" className="no-margin"/>
												{
													arrayForm.map(function(el:number,index:number) {
														return (
															<div className="tour" key={index}>
																<Datetime locale="fr" onChange={handleDateLaps} inputProps={{placeholder:`Date du tour ${index+1}`}} />
																<div onClick={addForm} id="add-tour" className="btn bg-red"><i><FontAwesomeIcon icon={faPlus} size="lg"/></i>Ajouter Nouveau tour</div>
																<div onClick={() => removeLine(index)} className= {index === 0 || arrayForm.length === 1 ? "d-none":"btn bg-white"}><i><FontAwesomeIcon icon={faTimes} size="lg"/></i>Supprimer</div>
															</div>
														)
													})
												}
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
