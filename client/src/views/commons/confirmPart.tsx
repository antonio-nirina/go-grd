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
		<div className={!showClose ? "d-none" :"next-btn"}>
			<button onClick={handlePartTournament} className="btn bg-white">Confirme la page pour participer au tournois</button>
			<button onClick={onShowClose} className="btn bg-red">Annuler</button>
		</div>
	)
}

export default ConfirmPart
