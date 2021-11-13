import React,{useState,useEffect} from "react"
import {useMutation,useQuery} from "@apollo/client"
import {useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {RootState} from "../../reducer"
import {checkInTeam} from "../league/utils"
import {Translation} from "../../lang/translation"
import {Tournament} from "../models/tournament"
import {Team} from "../models/team"

import Apex from "../../assets/image/apex-legends.png"
import Fifa21 from "../../assets/image/fifa21.png"
import Fortnite from "../../assets/image/fortnite.png"
import CodL from "../../assets/image/cod-coldwar.png"
import CodVanguard from "../../assets/image/cod-vanguard.png"
import Warzone from "../../assets/image/warzone.png"
import Rocketleague from "../../assets/image/rocketleague.png"
import Rainbowsix from "../../assets/image/rainbowsix.png"
import {dateStringToDHString} from "../tools/dateConvert"

type TypeConfirmed = {
	tournament: Tournament|undefined
	handleClosePayement:Function
}


const ConfirmPart = function() {
	const [showClose, setShowClose] = useState(true)
	const [teamPart,setTeamPart] = useState<string>("")
	const [message,setMessage] = useState<string>("")
	const [tournament, setTournament] = useState<Tournament>()
	const [teamUserPart,setTeamUserPart] = useState<string[]>([])
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
		setShowClose(false)
		setShowPaiement(!showPaiement)
		let isError:boolean = false
		let arrayUidTeam:string[] = []
		if(tournament?.isTeam) {
			const check = await checkInTeam(userConnectedRedux.user.uid)
			if(!check) {
				isError = true
				setMessage(Translation(userConnectedRedux.user.language).tournament.notifyError)
			}

			check.forEach(function(team:Team) {
				arrayUidTeam.push(team.uid)
			})
		}
		if(!isError) {
			// const saved = await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:tournament?.uid,teamsUid:{uid:arrayUidTeam.length > 0 ? arrayUidTeam[0] : ""} } })
			// console.log("saved", saved)
		}
	}
	const onShowClose = function(){
    	setShowClose(false)
  	}

	// handleClosePayement(showClose)

	return (
		<div>
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
			<button onClick={handlePartTournament} className="btn bg-white">Confirme la page pour participer au tournois</button>
			<button onClick={onShowClose} className="btn bg-red">Annuler</button>
		</div>
	)
}

export default ConfirmPart
