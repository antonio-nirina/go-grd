import React,{useEffect,useState} from "react"
import {useHistory } from "react-router-dom"
import {useQuery,useSubscription} from "@apollo/client"

import HeaderTournament,{HeaderTournamentType} from "../tournament/common/headerTournament"
import Header from "../header/header"
import Footer from "../footer/footer"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {Tournament} from "../models/tournament"
import {Wagger} from "../models/wagger"
import {GET_ONE_WAGGER} from "../../gql/wagger/query"
import CommonMatch from "../commons/common-match"
import "../tournament/info.css"
import "../../assets/css/style.css"
import "./css/match.css"
import { COUNTER_SUBSCRIBER } from "../../gql/tournament/subscription"
import { SET_TIME_START } from "../../gql/tournament/query"

interface CounterTypeInput {
	sec:number|string,
	min:number|string,
	hours:number|string,
	day:number|string,
	month:number|string,
}


const MatchTournament = function() {
	const [tournament, setTournament] = useState<Tournament>()
	const params = useHistory<any>()
	const [isTournament,setIsTournament] = useState(false)
	const [isWagger,setIsWagger] = useState(false)
	const [wagger, setWagger] = useState<Wagger>()
	const [start,setStart] = useState<CounterTypeInput>()

	const {loading,error,data} 	= useQuery(GET_ONE_TOURNAMENT, {
		variables: {
			uid:(params.location.search.split("=")[1]).split("&")[0],
		},
	})
	const {loading:ldgWg,error:ldgErr,data:ldgData} 	= useQuery(GET_ONE_WAGGER, {
		variables: {
			uid:(params.location.search.split("=")[1]).split("&")[0],
		},
	})

	const {loading:ldcount,error:errCount,data:dataCount} 	= useQuery(SET_TIME_START, {
		variables:{
			uid:(params.location.search.split("=")[1]).split("&")[0],
		},
	})

	const {loading:ldSub,error:erSub,data:dataSub}  = useSubscription(COUNTER_SUBSCRIBER)

	useEffect(() => {
		const isTrnamnt = (params.location.search.split("&")[1]).replace("tournament=","")
		const isWagr = (params.location.search.split("&")[2]).replace("wagger=","")

		if(!loading && !error && data) {
			setTournament(data.FindOneTournament)
			const date = new Date(data.FindOneTournament.deadlineDate)
		}

		if(!ldgWg && !ldgErr && ldgData) {
			setWagger(ldgData.FindOneWagger)
		}

		if(isTrnamnt === "true" && isWagr === "false"){
			setIsTournament(true)
		} else if(isTrnamnt === "false" && isWagr === "true") {
			setIsWagger(true)
		}
		console.log("dataSub", dataSub)
		if(!ldSub && !erSub && dataSub) {
			console.log("dataSub", dataSub)
		}
	},[loading,error,data,ldgWg,ldgErr,ldgData,params,ldSub,erSub,dataSub])

	useEffect(() => {
		console.log(dataCount)
	},[ldcount,errCount,dataCount,start])


	const HeaderProps:HeaderTournamentType = {
		data:isTournament ? tournament :wagger,
		isTournament:isTournament,
		isWagger:isWagger,
		isPart:false
	}

	return (
		<div className="container">
			<Header />
			<div className="participate league joingame match">
				<div className="obj cnt-blank"></div>
				<div className="marg">
				<HeaderTournament {...HeaderProps} />
			<div className="information-game info-match">
				<div className="rules-container">
					<div className="info_sup">
						{tournament || wagger ? <CommonMatch {...HeaderProps} /> : <></>}
					</div>
				</div>
			</div>
			<div className="clear"></div>
			<Footer/>
			</div>
			</div>
		</div>
	)
}

export default MatchTournament
