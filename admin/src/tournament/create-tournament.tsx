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

type Inputs = {
	participant: number,
	title:string,
	numberTeam:number,
	priceParticipate:number,
	spectateur:string,
	format:string,
	region:string,
	server:string,
	map:string
}
export type PlateformSelect = {
	label:string,
	value:string
}
export type Plateforms = {
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
	const [uidPlateform,setUidPlateform] = useState<string[]>([])
	const [startDate, setStartDate] 	= useState<string>("")
	const [lastDate, setLastDate] 		= useState<string>("")
	const [lapsDate, setLapsDate] 		= useState<string[]>([])
	const [lapsCash, setLapsCash] 		= useState<string[]>([])
	const [rules, setRules] 			= useState<string>("")
	// const [info, setInfo] 		= useState<String>("")
	const [arrayForm, setArrayForm] 	= useState<number[]>([1])
	const [number, setNumber] 			= useState<number>(1)
	const [arrayFormCash, setArrayFormCash] = useState<number[]>([1])
	const [numberCash, setNumberCash] 	= useState<number>(1)
	const [gameWay,setGameWay] 			= useState<string>("")
	const [isPrenimum,setIsPrenimum] 	= useState<boolean>(false)

	const [createdTournament]  			= useMutation(CREATED_TOURNAMENT)
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
		if(!uiGame && !data.title) {
			setIsValid(true)
			return
		}

		if(isPrenimum && isNaN(data.priceParticipate)) {
			setIsValid(true)
			return
		}
		if(uiGame && data.title && startDate && gameWay && uidPlateform && lastDate) {
			try {
				const result = await createdTournament({ variables: {
					date: new Date(startDate).toISOString(),
					title:data.title,
					uidGame:uiGame,
					uidPalteforme:uidPlateform.join("_"),
					description:"",//info
					numberParticipate:Math.pow(2,(Math.ceil(Math.log2(Number(data.participant))))),
					price:lapsCash.filter((e) => e).join("_"),
					deadlineDate: new Date(lastDate).toISOString(),
					server:data.server,
					gameWay:gameWay,
					format:data.format,
					spectateur:data.spectateur,
					region:data.region,
					maps:data.map,
					priceParticipate:data.priceParticipate ? data.priceParticipate : "Invitation",
					rules:rules,
					laps:lapsDate.join("_"),
					isTeam:gameWay === "1v1" ? false : true,
					isPublic:isPrenimum,
				} })
				if (result.data.saveTournament) history.push("/admin/tournament")
			} catch(e:unknown) {
				console.log("error", e)
			}
		}

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

	const handleDateLast = function(date:any) {
		setLastDate(moment(date._d).toString())
	}

	const handleDateLaps = function(date:any) {
		setLapsDate([...lapsDate,moment(date._d).toString()])
	}

	const handleRulesText = function(content: string) {
		setRules(content)
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

	const addFormCash = function() {
		setNumberCash(numberCash+1)
		setArrayFormCash([...arrayFormCash,numberCash+1])
	}

	const removeLineCash = function(index:number) {
		if(numberCash > 1) {
			const arrCash = arrayFormCash.splice(1,index)
			setArrayFormCash(arrCash)
			setNumberCash(numberCash-1)
			setLapsCash(lapsCash.splice(1,index))
		}
	}

	const handleCashLaps = function(cash:React.FormEvent<HTMLInputElement>) {
		setLapsCash([...lapsCash,cash.currentTarget.value])
	}

	const handleGameWay = function(event:React.FormEvent<HTMLSelectElement>){
		setGameWay(event.currentTarget.value)
	}

	const setPremium = function(event:React.FormEvent<HTMLInputElement>) {
		setIsPrenimum(event.currentTarget.checked)
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
		                                        		<input type="checkbox" onChange={setPremium} defaultChecked={isPrenimum} />
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
												<Datetime
													locale="fr"
													onChange={handleDateLast}
													inputProps={{placeholder:"Fin d'inscription"}}
												 />
												<Select isMulti id="platform" onChange={handlePlateform} options={plateforms} />
	                                            <select id="select-mode" onChange={handleGameWay}>
	                                                <option value="">Selectionnez le mode de jeux...</option>
	                                                <option value="1v1">1v1</option>
	                                                <option value="2v2">2v2</option>
													<option value="3v3">3v3</option>
	                                                <option value="4v4">4v4</option>
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
	                                                	{...register("participant")}
														name="participant"
	                                                	placeholder="Nombre de participant"/>
	                                            </div>
												<input type="text" placeholder="Frais de participation" {...register("priceParticipate")} name="priceParticipate" className="no-margin"/>
	                                            <div className="input-group no-flex">
													{
														arrayFormCash.map(function(el:number,index:number) {
															return (
																<div className="tour" key={index}>
																	<div className="new-position">
																		<input onBlur={handleCashLaps} placeholder={`Prix à gagner position ${index+1}`} /></div>
																	<div className="flexible">
																		<div onClick={addFormCash} className="add-tour btn bg-red"><i>
																			<FontAwesomeIcon icon={faPlus} size="lg"/></i>
																			Ajouter Nouveau position
																		</div>
																		<div onClick={() => removeLineCash(index)} className= {index === 0 || arrayFormCash.length === 1 ? "d-none":"d-block"}>
																			<button className="btn bg-white"><i><FontAwesomeIcon icon={faTimes} size="lg"/></i>
																				Supprimer
																			</button>
																		</div>
																	</div>
																</div>
															)
														})
													}
	                                            </div>

												<input type="text" placeholder="Format" {...register("format")} name="format" className="no-margin"/>
												<input type="text" placeholder="Serveur" {...register("server")} name="server" className="no-margin"/>
												<input type="text" placeholder="Spectateur" {...register("spectateur")} name="spectateur" className="no-margin"/>
												<input type="text" placeholder="Region" {...register("region")} name="region" className="no-margin"/>
												<input type="text" placeholder="Map" {...register("map")} name="map" className="no-margin"/>
												{
													arrayForm.map(function(el:number,index:number) {
														return (
															<div className="tour" key={index}>
																<div className="new-position">
																	<Datetime onClose={handleDateLaps} className="date-laps" locale="fr" inputProps={{placeholder:`Date du tour ${index+1}`}} />
																</div>
																<div className="flexible">
																	<div onClick={addForm} className="add-tour btn bg-red"><i><FontAwesomeIcon icon={faPlus} size="lg"/></i>Ajouter Nouveau tour</div>
																	<div onClick={() => removeLine(index)} className= {index === 0 || arrayForm.length === 1 ? "d-none":"d-block"}><button className="btn bg-white"><i>
																		<FontAwesomeIcon icon={faTimes} size="lg"/></i>Supprimer</button></div>
																</div>
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
