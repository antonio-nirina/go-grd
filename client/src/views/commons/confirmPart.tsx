import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify'
import Popup from "reactjs-popup"
import 'react-toastify/dist/ReactToastify.css'
import "reactjs-popup/dist/index.css"

import Header from "../header/header"
import Footer from "../footer/footer"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {RootState} from "../../reducer"
import {GetTeamUtils,SavedPartTournament,PartTournament} from "../league/utils"
import {Translation} from "../../lang/translation"
import {Tournament} from "../models/tournament"
import Apex from "../../assets/image/apex-legends.png"
import Fifa21 from "../../assets/image/fifa21.png"
import Fortnite from "../../assets/image/fortnite.png"
import CodL from "../../assets/image/cod-coldwar.png"
import CodVanguard from "../../assets/image/cod-vanguard.png"
import Warzone from "../../assets/image/warzone.png"
import Rocketleague from "../../assets/image/rocketleague.png"
import Rainbowsix from "../../assets/image/rainbowsix.png"
import {dateStringToDHString} from "../tools/dateConvert"
import {NameRoutes} from "./route-list"
import {SaveParticipateTournamentAction,Part_TOURNAMENT} from "../tournament/action/tournamentAction"
import {TeamPopup} from "../commons/check-team"
import {TeamModel} from "../models/team"
import "../parametre/team/team.css"
import "./css/popup.css"


interface ElementTeam {
	uid:string,
	name:string,
	creationDate:string,
	creator:string,
	logo:string
}

interface NewTeamPopup extends TeamPopup  {
	handleTeamSelected:Function
}

const ConfirmPart = function() {
	const disptach = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [tournament, setTournament] = useState<Tournament>()
	const [team,setTeam] = useState<TeamModel[]>([])
	const [showPaiement, setShowPaiement] = useState<boolean>(false)
	const [selectedTeam,setSelectedTeam] = useState<string>("")
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const params = useHistory<any>()

	const {loading,error,data} 	= useQuery(GET_ONE_TOURNAMENT, {
		variables: {
			uid:params.location.search.split("=")[1],
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setTournament(data.FindOneTournament)
		}
	},[loading,error,data])

	let variables:PartTournament = {
		uidUser: userConnectedRedux.user.uid.toString(),
		date:(new Date().toLocaleString()),
		tournamentUid:tournament ? tournament.uid : "",
		teamsUid: "",
	}

	const handlePartTournament = async function(){
		setShowPaiement(!showPaiement)
		let isError:boolean = false
		let saved:number = 0

		if(tournament?.isTeam) {
			const teams = await GetTeamUtils(userConnectedRedux.user.uid)
			console.log(teams)
			if(!teams) {
				isError = true
				toast(Translation(userConnectedRedux.user.language).tournament.notifyError)
			} else if(teams && teams.length > 1) {
				setIsOpen(true)
				setTeam(teams)
				if(selectedTeam) {
					variables.teamsUid = selectedTeam
					saved = await SavedPartTournament(variables)
				}
			} else if(teams && teams.length === 1) {
				variables.teamsUid = teams[0].uid
				saved = await SavedPartTournament(variables)
			}
		} else if(!tournament?.isTeam && !isError) {
			saved = await SavedPartTournament(variables)
		}

		if(saved) {
			const dataTournament:Part_TOURNAMENT = {
				uidTournament:tournament?.uid,
				userUid:userConnectedRedux.user.uid,
				confirmed:saved
			}
			params.push(`${NameRoutes.matchTournament}?uid=${tournament?.uid}&tournament=true&wagger=false`)
			disptach(SaveParticipateTournamentAction(dataTournament))
		}
	}
	const onShowClose = function(){
    	params.push(NameRoutes.joinTournament+"?uid="+params.location.search.split("=")[1])
  	}

	const handlePopup = function(isclose:boolean) {
		setIsOpen(false)
	}

	const handleTeamselect = function(params:string) {
		setSelectedTeam(params)
	}

	// handleClosePayement(showClose)

	return (
		<div>
			<div className="container">
				<Header />
				<div className="main">
					<div className="participate league joingame confirm">
						<h2>{tournament?.game.name}</h2>
						<ToastContainer position="bottom-left" />
						<div className="item-info-left">
		              	<div className="item-img-info">
		                	<img src={tournament?.game.slug === "vanguard" ? CodVanguard : (tournament?.game.slug === "fortnite" ? Fortnite : (tournament?.game.slug ==="fifa21" ? Fifa21 : (tournament?.game.slug ==="ops" ? CodL : (tournament?.game.slug ==="warzone" ? Warzone : (tournament?.game.slug ==="rainbows" ? Rainbowsix : (tournament?.game.slug ==="apexlegends"?Apex:Rocketleague))))) )} alt=""/>
		              	</div>
		            	<div className="item-all-content">
							<div className="item-all-info">
								<p><span>Format</span></p>
								<p><span>Début des inscriptions</span></p>
								<p>{dateStringToDHString(tournament?.dateStart).replace(","," -")}</p>
							</div>
							{isOpen ? <PoupListTeam
											handleOpen={handlePopup}
											isShow={isOpen}
											content={team}
											checkTeam={1}
											handleTeamSelected={handleTeamselect}

										/>
									: <></>}
							<div className="item-all-info">
								<p><span>Spectateurs</span></p>
								<p className="item-text-left">{tournament?.spectateur}</p>
								<p><span>Fin des inscriptions</span></p>
								<p>{dateStringToDHString(tournament?.deadlineDate).replace(","," -")}</p>
							</div>
							<div className="item-all-info">
								{tournament?.laps.map(function(lap:string,index:number){
									return (
										<div key={index}>
											<p><span>Tour {index+1}</span></p>
											<p>{dateStringToDHString(lap).replace(","," -")}</p>
										</div>
									)
								})}
							</div>
		              	</div>
					</div>
					<div className="btn-container">
						<button style={{cursor:"pointer"}} onClick={handlePartTournament} className="btn bg-white">Confirme la page pour participer au tournois</button>
						<button style={{cursor:"pointer"}} onClick={onShowClose} className="btn bg-red">Annuler</button>
					</div>
					</div>
				</div>
				<Footer/>
			</div>

		</div>
	)
}

const PoupListTeam = function({handleOpen,isShow,content,handleTeamSelected}:NewTeamPopup) {
	const [isOpen,setIsOpen] = useState<boolean>(true)
	const [teamSelected, setTeamSelected] = useState<ElementTeam[]>([])

	useEffect(()=> {
		setIsOpen(isShow)
	},[isShow])

	const handleClose = function() {
		setIsOpen(false)
		handleOpen(false)
	}
	const handleSelected = function(team:TeamModel) {
		const checked = teamSelected.find((e:ElementTeam) => team.uid === e.uid)
		if(!checked && teamSelected.length === 0 && team.players.length > 1) {
			let selectedUser:ElementTeam[] = []
			let element:ElementTeam = {
				uid:team.uid,
				name:team.name,
				creationDate:team.creationDate,
				creator:team.creator,
				logo:team.logo
			}
			handleTeamSelected(team.uid)
			selectedUser = [...teamSelected,element]
			setTeamSelected(selectedUser)
		}
	}

	const handleRemoved = function(uid:string) {
		let newElement = teamSelected.filter((el:ElementTeam) => el.uid !== uid )
		setTeamSelected(newElement)
	}

	return (
		<Popup
			open={isOpen}
			modal
			nested
			onClose={handleClose}
			closeOnDocumentClick>
			{(close:any) => (
				<div className="modal">
					<button className="close-popup" onClick={()=> handleClose()}>
						&times;
					</button>
					<div className="bar-title">
						<h2>Choissiez votre équipe</h2>
					</div>
					<div className="actions">
						<div className="body">
						<div className="group-team">
							{teamSelected.map(function(params:ElementTeam,index:number) {
								return(
									<div className="choice-team" key={index}>
										<div className="username-choice">{params.name}</div>
										<div className="close-rem" onClick={()=>handleRemoved(params.uid)}>
											&times;
										</div>
									</div>
								)
							})}
						</div>
							<div className="content">
								{typeof content === "object"
								?
								content.map(function(el:TeamModel,index:number){
									return (
										<div className="list-team"  key={index} onClick={() => handleSelected(el)}>
											<div className="team-name-popup" style={{"textAlign":"left"}}>{el.name}</div>
										</div>
									)
								})
								: content
								}
							</div>
						</div>
					</div>
				</div>
			)}
		</Popup>
	)
}

export default ConfirmPart
