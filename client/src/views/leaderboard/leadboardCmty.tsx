import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"

import { GET_ALL_BOARD } from "../../gql/leadboard/query"
import { LeadBoard } from "../models/leadboard"

const LeaderboardCmty: React.FC = function() {
	const [leadBoard, setLeadBoard] = useState<LeadBoard[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_BOARD)
	useEffect(() => {
		if(!loading && !error && data) {
			setLeadBoard(data.FindAllRate)
		}

	},[loading,error,data])
	return (
		<>
			{leadBoard ? leadBoard.map(function(lead:LeadBoard,index:number){
					return (
					<div className="ld-container" key={index}>
						<p className="lead">{index + 1}</p>
						<p className="bold">{lead.user.username}</p>
						<p className="aright">{lead.score} pts</p>
					</div>
					)
				})
			:
			<></>
			}
		</>
	)
}

export default LeaderboardCmty
