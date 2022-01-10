import React,{useEffect,useState} from "react"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"
import parse from 'html-react-parser'

import HeaderTournament,{HeaderTournamentType} from "../tournament/common/headerTournament"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../tournament/info.css"
import "../../assets/css/style.css"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {Tournament} from "../models/tournament"
import {Wagger} from "../models/wagger"
import {GET_ONE_WAGGER} from "../../gql/wagger/query"


const TournamentRules = function() {
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
		isPart:false
	}

    return(
		<div className="container">
			<Header />
			<div className="participate league joingame rule">
				<div className="obj"></div>
				<div className="marg">
				<HeaderTournament {...HeaderProps} />
			<div className="information-game">
				<div className="rules-container">
					<div className="info_sup">
						<h3>Information supplémentaire</h3>
						<p>Au début du tournoi, n'oubliez pas de rafraîchir votre page pour faire apparaître le 'bouton prêt' vous permettant d'entrer dans le tournoi</p>
					</div>
					<div className="info_sup">
						{tournament && tournament.rules ? parse(tournament.rules) : <h3>Aucune règle</h3>}
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

export default TournamentRules
