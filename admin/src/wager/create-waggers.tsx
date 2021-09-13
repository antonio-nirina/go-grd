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

import SideBar from "../header/sidebar"
import {CREATED_WAGGER} from "../gql/wagger/mutation"
import Nav from "../header/nav"
import {GET_ALL_GAMES,GET_ALL_PLATEFORM} from "../gql/games/query"

type Inputs = {
	title:string,
	price:number,
	format:string,
	priceParticipate:number,
	description:string,
	isPublic:boolean,
	participant:number
}


const CreateWaggers: React.FC = function() {
	const history = useHistory()
	const [startDate, setStartDate] 	= useState<string>("")
	const [lastDate, setLastDate] 		= useState<string>("")
	const [gameWay,setGameWay] 			= useState<string>("")
	const [uiGame,setUiGame] 			= useState<string>("")
	const [uidPlateform,setUidPlateform] = useState<string>("")
	const [games,setGames] 				= useState<Array<any>>([])
	const [plateforms,setPlateforms] 	= useState<Array<any>>([])
	const [isPub,setIsPub] 				= useState<boolean>(false)
	const { register, handleSubmit } 	= useForm<Inputs>()

	const [createWagger]  			= useMutation(CREATED_WAGGER)
	const {loading,error,data} = useQuery(GET_ALL_GAMES)
	const {loading:loadingP,error:errorP,data:dataP} = useQuery(GET_ALL_PLATEFORM)

	useMemo(() => {
		if(!loading && !error && data) setGames(data.FindAllGame)
		if(!loadingP && !errorP && dataP) setPlateforms(dataP.FindAllPlateform)
	},[loading,error,data,loadingP,errorP,dataP])

	const onSubmit = async function(data:Inputs){
		const result = await createWagger({ variables: {
			date:startDate,
			title:data.title,
			uidGame:uiGame,
			uidPalteforme:uidPlateform,
			description:data.description,
			price:data.price,
			format:data.format ? data.format : "",
			gameWay:gameWay, 
			deadlineDate:lastDate,
			priceParticipate:data.priceParticipate,
			isPublic:data.isPublic,
			participant:Math.pow(2,(Math.ceil(Math.log2(Number(data.participant))))),
		} })
		if (result.data.createWagger) history.push("/admin/wagger")
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

	const handleDateDeadline = function(date:any) {
		setLastDate(moment(date._d).toString())
	}

	const handleGameWay = function(event:any){
		setGameWay(event.target.value)
	}

	const handleTextPub = function(event:any) {
		setIsPub(event.target.checked)
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
	                                <h1>Crée wagger</h1>
	                            </div>
	        					
	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form onSubmit={handleSubmit(onSubmit)}>
	                                        	<div className="premium">
		                                        	<label className="switch">		                                        		
		                                        		<input type="checkbox" {...register("isPublic")} name="isPublic" onChange={handleTextPub} />
		                                        		<span className="slider">{isPub ? "Public" : "Privé"}</span>		                                        		
		                                        	</label>
	                                        	</div>
	                                        	<input type="text" placeholder="Titre wagger" {...register("title")} name="title" />	                                      		                                        	
	                                        	<select id="select-mode" onChange={handleGameWay}>
	                                                <option value="">Selectionnez le mode de jeux...</option>
	                                                <option value="1v1">1v1</option>
	                                                <option value="2v2">2v2</option>
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
												<input type="text" placeholder="Participant" {...register("participant")} name="participant" />                                         
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
	                                            <textarea placeholder="Description..." {...register("description")}></textarea>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Prix à gagner" {...register("price")} name="price" />
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
