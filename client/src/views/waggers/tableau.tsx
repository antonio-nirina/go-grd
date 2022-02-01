import React,{useEffect,useState} from "react"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"

import Tree from "./tree"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../tournament/info.css"
import "../../assets/css/style.css"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {Tournament} from "../models/tournament"
import {Wagger} from "../models/wagger"
import {GET_ONE_WAGGER} from "../../gql/wagger/query"
// import {checkInTeam} from "../league/utils"
import HeaderTournament,{HeaderTournamentType} from "../tournament/common/headerTournament"
import {GET_PART_ONE_TOURNAMENT} from "../../gql/participate/query"
import {ParticipateTournament} from "../models/participate"
import {RootState} from "../../reducer"



const Tableau: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [tournament, setTournament] = useState<Tournament>()
	const params = useHistory<any>()
	const [isTournament,setIsTournament] = useState(false)
	const [isBracket,setIsBracket] = useState(false)
	const [isWagger,setIsWagger] = useState(false)
	const [wagger, setWagger] = useState<Wagger>()
	const [isPart,setIsPart] = useState<boolean>(false)

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

	const {loading:ldgParts,error:errPart,data:dataParts} 	= useQuery(GET_PART_ONE_TOURNAMENT, {
		variables: {
			uid:(params.location.search.split("=")[1]).split("&")[0],
		},
	})

	useEffect(() => {
		const isTrnamnt = (params.location.search.split("&")[1]).replace("tournament=","")
		const isWagr = (params.location.search.split("&")[2]).replace("wagger=","")

		if(!loading && !error && data) {
			setTournament(data.FindOneTournament)
			const dateStart = new Date(data.FindOneTournament.dateStart)
			if(new Date() > dateStart) setIsBracket(true)
		}

		if(!ldgWg && !ldgErr && ldgData) {
			setWagger(ldgData.FindOneWagger)
		}

		if(isTrnamnt === "true" && isWagr === "false"){
			setIsTournament(true)
		} else if(isTrnamnt === "false" && isWagr === "true") {
			setIsWagger(true)
		}
		if(!ldgParts && !errPart && dataParts) {
			dataParts.FindTournamentParticipate?.forEach(function(part:ParticipateTournament){
				if(part.user.uid === userConnectedRedux.user.uid) {
					setIsPart(true)
				}
			})
			// check part user_connected if in Team part this tournament
			dataParts.FindTournamentParticipate?.forEach(function(part:ParticipateTournament){
				if(tournament?.isTeam && part.user.uid === userConnectedRedux.user.uid) {
					setIsPart(true)
				}
			})
		}
	},[loading,error,data,ldgWg,ldgErr,ldgData,params,ldgParts,errPart,dataParts,userConnectedRedux,isPart,tournament])


	const HeaderProps:HeaderTournamentType = {
		data:isTournament ? tournament :wagger,
		isTournament:isTournament,
		isWagger:isWagger,
		isPart:isPart
	}

    return(
		<div className="container">
			<Header />
			<div className="participate league joingame table">
				<div style={{ backgroundImage: 'url(' + tournament?.game.image + ')', backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }} className="obj"></div>
				<div className="marg">
					<HeaderTournament {...HeaderProps} />
					<div className="information-game">
						<div className={!isBracket ? "info-match tab-container bracket-container" : "tab-container"}>
							{isBracket ? <Tree /> : <div className="btn bg-red">Bracket sera dévoilé au debut du tournois</div>}
						</div>
					</div>
					<div className="clear"></div>
					<Footer/>
				</div>
			</div>
		</div>
  	)
}

export default Tableau
