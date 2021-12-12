import React,{useState,useEffect} from "react"
import {useMutation,useQuery} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"

import Header from "../header/header"
import Footer from "../footer/footer"

import {SAVED_PART} from "../../gql/participate/mutation"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {RootState} from "../../reducer"
import {GetTeamUtils} from "../league/utils"
import {Translation} from "../../lang/translation"
import {Tournament} from "../models/tournament"
import {User} from "../models/tournament"

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
import PopupTeam from "../commons/check-team"


const ConfirmPart = function() {
	const disptach = useDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [message,setMessage] = useState<string>("")
	const [tournament, setTournament] = useState<Tournament>()
	const [showPaiement, setShowPaiement] = useState<boolean>(false)
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

	const [savedPartTournament]  = useMutation(SAVED_PART)

	const handlePartTournament = async function(){
		setShowPaiement(!showPaiement)
		let isError:boolean = false
		let arrayUidTeam:string[] = []
		if(tournament?.isTeam) {
			const check = await GetTeamUtils(userConnectedRedux.user.uid)
			if(!check) {
				isError = true
				setMessage(Translation(userConnectedRedux.user.language).tournament.notifyError)
			} else if(check && check.length === 0) {
				isError = true
			}
		}
		if(!isError) {
			const saved = await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:tournament?.uid,teamsUid:{uid:arrayUidTeam.length > 0 ? arrayUidTeam[0] : ""} } })
			if(saved) {
				const dataTournament:Part_TOURNAMENT = {
					uidTournament:tournament?.uid,
					userUid:userConnectedRedux.user.uid,
					confirmed:saved.data.createPartMatch
				}
				params.push(NameRoutes.tournament)
				disptach(SaveParticipateTournamentAction(dataTournament))
			}
		}
	}
	const onShowClose = function(){
    	params.push(NameRoutes.joinTournament+"?uid="+params.location.search.split("=")[1])
  	}

	const handlePopup = function(isclose:boolean) {
		setIsOpen(false)
	}

	// handleClosePayement(showClose)

	return (
		<div>
			<div className="container">
				<Header />
				<div className="main">
					<div className="participate league joingame confirm">
						<h2>{tournament?.game.name}</h2>
						<div className="item-info-left">
		              	<div className="item-img-info">
		                	<img src={tournament?.game.slug === "vanguard" ? CodVanguard : (tournament?.game.slug === "fortnite" ? Fortnite : (tournament?.game.slug ==="fifa21" ? Fifa21 : (tournament?.game.slug ==="ops" ? CodL : (tournament?.game.slug ==="warzone" ? Warzone : (tournament?.game.slug ==="rainbows" ? Rainbowsix : (tournament?.game.slug ==="apexlegends"?Apex:Rocketleague))))) )} alt=""/>
		              	</div>
		            	<div className="item-all-content">
							{message ? <div style={{color:"#dd0000;"}} >{message}</div>: <></>}
							<div className="item-all-info">
								<p><span>Format</span></p>
								<p><span>Début des inscriptions</span></p>
								<p>{dateStringToDHString(tournament?.dateStart).replace(","," -")}</p>
							</div>
							<PopupTeam handleOpen={handlePopup} isShow={isOpen} content="" />
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

export default ConfirmPart
