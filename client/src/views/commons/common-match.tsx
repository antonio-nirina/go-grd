import React,{useEffect,useState} from "react"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"
import {useSubscription} from "@apollo/client"

import {RootState} from "../../reducer"
import {GET_PART_TOURNAMENT} from "../../gql/participate/query"
import {ParticipateTournament} from "../models/participate"
import {LongMonthDate} from "../tools/dateConvert"
import {HeaderTournamentType} from "../tournament/common/headerTournament"
import { COUNTER_SUBSCRIBER } from "../../gql/tournament/subscription"

const CommonMatch = function({data,isTournament,isWagger}:HeaderTournamentType) {
	const [parts, setParts] = useState<ParticipateTournament[]>()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [timer, setTimmer] = useState<string>("")
	const {loading,error,data:dataPart} = useQuery(GET_PART_TOURNAMENT, {
		variables: {
			uid:data.uid,
			uidUser:userConnectedRedux.user.uid
		},
	})
	const {loading:ldSub,error:erSub,data:dataSub}  = useSubscription(COUNTER_SUBSCRIBER)
	useEffect(() => {
		if(!loading && !error && dataPart) {
			setParts(dataPart.FindPartByUserTournament)
		}
		console.log("dataSub", dataSub)
		if(!ldSub && !erSub && dataSub) {
			let currentTimes:string = dataSub.data.subscribeRedirectTournament.time
			setTimmer(currentTimes)
		}

	},[loading,error,dataPart,ldSub,erSub,dataSub])
	return (
		<div className="next-btn white">
			{parts
				?
					timer ? timer : <div className="btn bg-red">Votre adversaire sera devoilé</div>
				:
					<div className="btn bg-red">
						{isTournament ? `Début du tournois ${LongMonthDate(data.dateStart)}` : `Wager commence ${LongMonthDate(data.date)}`}
					</div>
			}
		</div>
	)
}

export default CommonMatch
