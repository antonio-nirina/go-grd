import React,{useEffect,useState} from "react"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"

import {RootState} from "../../reducer"
import {GET_PART_TOURNAMENT} from "../../gql/participate/query"
import {ParticipateTournament} from "../models/participate"
import {LongMonthDate} from "../tools/dateConvert"
import {HeaderTournamentType} from "../tournament/common/headerTournament"



const CommonMatch = function({data,isTournament,isWagger}:HeaderTournamentType) {
	const [parts, setParts] = useState<ParticipateTournament[]>()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const {loading,error,data:dataPart} = useQuery(GET_PART_TOURNAMENT, {
		variables: {
			uid:data.uid,
			uidUser:userConnectedRedux.user.uid
		},
	})
	useEffect(() => {
		if(!loading && !error && dataPart) {
			setParts(dataPart.FindPartByUserTournament)
		}
	},[loading,error,dataPart])
	return (
		<div className="next-btn white">
			{parts
				?
					<div className="btn bg-red">Votre adversaire sera devoilé</div>
				:
					<div className="btn bg-red">
						{isTournament ? `Début du tournois ${LongMonthDate(data.dateStart)}` : `Wager commence ${LongMonthDate(data.date)}`}
					</div>
			}

		</div>
	)
}

export default CommonMatch
