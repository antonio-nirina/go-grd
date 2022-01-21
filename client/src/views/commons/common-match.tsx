import React,{useEffect,useState} from "react"
import { useSelector } from "react-redux"
import {useSubscription} from "@apollo/client"

import {RootState} from "../../reducer"
import {LongMonthDate} from "../tools/dateConvert"
import {HeaderTournamentType} from "../tournament/common/headerTournament"
import { COUNTER_SUBSCRIBER } from "../../gql/tournament/subscription"
import { CheckPartTournament } from "../tournament/common/check-part"

interface TimmerInput {
	timer:string
}

const Timmer = function({timer}:TimmerInput) {
	return (
		<div className="timmer">
			`Temps restant ${timer}`
		</div>
	)
}




const CommonMatch = function({data:tournament,isTournament,isWagger}:HeaderTournamentType) {
	const [isParts, setIsParts] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [timer, setTimmer] = useState<string>("12:09")
	const {loading,error,data}  = useSubscription(COUNTER_SUBSCRIBER)

	useEffect(() => {
		async function checkPart() {
			const check = await CheckPartTournament(tournament.uid,userConnectedRedux.user.uid)
			if(check){
				setIsParts(check)
				if(!loading && !error && data && check) {
					let currentTimes:string = data.subscribeCounter.time
					setTimmer(currentTimes)
				}
			}
		}
		checkPart()

	},[loading,error,data,timer])
	return (
		<div className="next-btn white">
			{isParts
				?
					timer ? <Timmer timer={timer} /> : <div className="btn bg-red">Votre adversaire sera devoilé</div>
				:
					<div className="btn bg-red">
						{isTournament ? `Début du tournois ${LongMonthDate(tournament.dateStart)}` : `Wager commence ${LongMonthDate(data.date)}`}
					</div>
			}
		</div>
	)
}

export default CommonMatch
