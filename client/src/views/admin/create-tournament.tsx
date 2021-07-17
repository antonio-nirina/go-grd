import React,{useState} from "react"
import { Link } from "react-router-dom"
import {useMutation,useQuery} from "@apollo/client"
import { useForm } from "react-hook-form"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import "../admin/admin.css"
import SideBar from "./sidebar"
import Nav from "./nav"
import {CREATED_TOURNAMENT} from "../../gql/tournament/mutation"

type Inputs = {
	participant: number,
	date:string,
	title:string,
	price:number,
	priceParticipate:number,
	deadlineDate:string,
}

const CreateTournament: React.FC = function() {
	const { register, handleSubmit } = useForm<Inputs>()
	const [createdTournament]  = useMutation(CREATED_TOURNAMENT)
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
	                            <div className="setting-tournament">
	                                <div className="field">
	                                    <div className="group-input">
	                                        <form>
	                                        	<input type="text" placeholder="Titre tournois" {...register("title")} name="title"/>
	                                            <select id="jeux">
	                                                <option value="">Selectionnez le jeux...</option>
	                                                <option value="0">Apex Legends</option>
	                                                <option value="1">League of Legends</option>
	                                                <option value="2">Rocket League</option>
	                                            </select>
	                                            <input type ="text"
	                                            	placeholder="Date"
	                                            	{...register("date")} name="date"
	                                            />
	                                            <select id="platform">
	                                                <option value="">Selectionnez les plateformes...</option>
	                                                <option value="0">Playstation</option>
	                                                <option value="1">Xbox</option>
	                                            </select>
	                                            <SunEditor setOptions={
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
	                                            <div className="input-group">
	                                                <input
	                                                	type="number"
	                                                	{...register("participant")} name="participant"
	                                                	placeholder="Nombre de participant"/>
	                                                <input type="number" placeholder="Nombre d'equipes" className="no-margin"/>
	                                            </div>
	                                            <div className="input-group">
	                                                <input type="number" placeholder="Prix à gagner" {...register("price")} name="price" />
	                                                <input type="number" placeholder="Frais de participation" {...register("priceParticipate")} name="priceParticipate" className="no-margin"/>
	                                            </div>
	                                            <input type="text" placeholder="Deadline" {...register("deadlineDate")} name="deadlineDate" />
	                                            <SunEditor setOptions={
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
												<div className="create-tournament-game">
	        										<Link to="/admin"><button className="btn bg-white"> Annuler</button></Link>
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

export default CreateTournament
