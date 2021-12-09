import React,{useEffect,useState} from "react"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"

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

const MatchTournament = function() {
	const [tournament, setTournament] = useState<Tournament>()
	const params = useHistory<any>()
	const [isTournament,setIsTournament] = useState(false)
	const [isWagger,setIsWagger] = useState(false)
	const [wagger, setWagger] = useState<Wagger>()

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

	useEffect(() => {
		const isTrnamnt = (params.location.search.split("&")[1]).replace("tournament=","")
		const isWagr = (params.location.search.split("&")[2]).replace("wagger=","")

		if(!loading && !error && data) {
			setTournament(data.FindOneTournament)
		}

		if(!ldgWg && !ldgErr && ldgData) {
			setWagger(ldgData.FindOneWagger)
		}

		if(isTrnamnt === "true" && isWagr === "false"){
			setIsTournament(true)
		} else if(isTrnamnt === "false" && isWagr === "true") {
			setIsWagger(true)
		}
	},[loading,error,data,ldgWg,ldgErr,ldgData,params])


	const HeaderProps:HeaderTournamentType = {
		data:isTournament ? tournament :wagger,
		isTournament:isTournament,
		isWagger:isWagger,
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
