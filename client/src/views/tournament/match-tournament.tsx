import React,{useEffect,useState} from "react"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"


import {RootState} from "../../reducer"
import HeaderTournament,{HeaderTournamentType} from "../tournament/common/headerTournament"
import Header from "../header/header"
import Footer from "../footer/footer"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {Tournament} from "../models/tournament"
import {Wagger} from "../models/wagger"
import {GET_ONE_WAGGER} from "../../gql/wagger/query"
import CommonMatch from "./common/common-match"
import "../tournament/info.css"
import "../../assets/css/style.css"
import "./css/match.css"
import { SET_TIME_START } from "../../gql/tournament/query"
import {GetTeamUser} from "../commons/common-query"
import {TeamModel} from "../models/team"



interface CounterTypeInput {
	sec:number|string,
	min:number|string,
	hours:number|string,
	day:number|string,
	month:number|string,
}


const MatchTournament = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [tournament, setTournament] = useState<Tournament>()
	const params = useHistory<any>()
	const [isTournament,setIsTournament] = useState(false)
	const [isWagger,setIsWagger] = useState(false)
	const [wagger, setWagger] = useState<Wagger>()
	const [team, setTeam] = useState<TeamModel>()
	const [start,setStart] = useState<CounterTypeInput>()
	const [isReady,setIsReady] = useState(false)

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

	useEffect(() => {
		async function getTeamUser() {
			const uidT = (params.location.search.split("=")[1]).split("&")[0]
			const team = await GetTeamUser(userConnectedRedux.user.uid,uidT)
			setTeam(team)
		}
		const isTrnamnt = (params.location.search.split("&")[1]).replace("tournament=","")
		const isWagr = (params.location.search.split("&")[2]).replace("wagger=","")

		if(!loading && !error && data) {
			setTournament(data.FindOneTournament)
			// const date = new Date(data.FindOneTournament.deadlineDate)
		}

		if(!ldgWg && !ldgErr && ldgData) {
			setWagger(ldgData.FindOneWagger)
		}

		if(isTrnamnt === "true" && isWagr === "false"){
			setIsTournament(true)
		} else if(isTrnamnt === "false" && isWagr === "true") {
			setIsWagger(true)
		}
		getTeamUser()
	},[loading,error,data,ldgWg,ldgErr,ldgData,params,userConnectedRedux])

	useEffect(() => {
		console.log(dataCount)
	},[ldcount,errCount,dataCount,start])


	const HeaderProps:HeaderTournamentType = {
		data:isTournament ? tournament :wagger,
		isTournament:isTournament,
		isWagger:isWagger,
		isPart:true
	}

	const HandleReady = function() {
		setIsReady(true)
	}

	return (
		<div className="container">
			<Header />
			<div className="participate league joingame match">
				<div className="obj cnt-blank"></div>
				<div className="marg">
					<HeaderTournament {...HeaderProps} />
					<div className="information-game info-match">
						<div className="step">
							1/16 de finale
						</div>
						<div className="rules-container">
							<div className="info_sup">
								{tournament || wagger ? <CommonMatch {...HeaderProps} /> : <></>}
							</div>
						</div>
						<div className="adv-list">
							<div className="elemnt-players-dom element-wdth players">
								{
									tournament?.isTeam
										?
									<>
										<div className={isReady ? "ready content-players" : "content-players"}>
											<div className="name-team-user side-block">{team?.name}</div>
											<div>
												<img src={team?.logo} alt="team.logo" />
											</div>
										</div>
										{isReady ? <div  className="ready-text">READY</div> : <></>}
									</>
									:
									<>
										<div className={isReady ? "ready content-players side-block" : "content-players"}>
											<div className="name-team-user side-block">{userConnectedRedux.user.username}</div>
											<div>
												<img src={userConnectedRedux.user.avatar} alt="user.profil" />
											</div>
										</div>
										{isReady ? <div className="ready-text">READY</div> : <></>}
									</>
								}
							</div>
							<div className="in-part element-wdth">Vs</div>
							<div className="elemnt-players-ext players element-wdth">
								{
									tournament?.isTeam
										?
										<>
											<div className={isReady ? "ready content-players" : "content-players"}>
												<div className="name-team-user">{team?.name}</div>
												<img src={team?.logo} alt="team.logo" />
											</div>
											{isReady ? <div  className="ready-text">READY</div> : <></>}
										</>
									:
									<>
										<div className={isReady ? "ready content-players" : "content-players"}>
											<img src={userConnectedRedux.user.avatar} alt="user.profil" />
											<div className="name-team-user">{userConnectedRedux.user.username}</div>
										</div>
										{isReady ? <div className="ready-text">READY</div> : <></>}
									</>
								}
							</div>
						</div>
						<div className="ready-match">
							<button className="btn bg-red" onClick={HandleReady}>Go</button>
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
