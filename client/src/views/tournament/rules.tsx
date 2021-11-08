import React,{useEffect,useState} from "react"
import parse from 'html-react-parser'
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {GET_PART_TOURNAMENT} from "../../gql/participate/query"

import Header from "../header/header"
import Footer from "../footer/footer"
import {Tournament} from "../models/tournament"
import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
import {dateStringToDY} from "../tools/dateConvert"
import RegisterTournament,{RegisterType} from "./tournament-register"
import Stat from "./stat"

const Rules: React.FC = function(props:any) {
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [tournament, setTournament] = useState<Tournament>()
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [part, setPart] = useState<string>("")
	const [isUserSingup,setIsUserSingup] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const {loading,error,data} 	= useQuery(GET_ONE_TOURNAMENT, {
			variables: {
				uid:uid,
			},
	})

	const {loading:loadTrnmt,error:errTrnmt,data:dataTrnmt} = useQuery(GET_PART_TOURNAMENT, {
		variables: {
			uidUser:userConnectedRedux.user.uid,
			uidTournament:uid,
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			setTournament(data.FindOneTournament)
		}

		const date1 = new Date()
		const date2 = new Date(data?.FindOneTournament.deadlineDate)
		const diff = (date2.getTime() - date1.getTime())/1000/60
		if (diff < 10 || diff <= 0) setIsOpen(false)

		if(!loadTrnmt && !errTrnmt && dataTrnmt) {
			setIsUserSingup(true)
			setPart(dataTrnmt.FindPartByUserTournament.Uid)
		}

	},[loading,error,data,loadTrnmt,errTrnmt,dataTrnmt])

	const RegisterData:RegisterType = {
		uid:uid,
		tournament:tournament,
		isUserSingup:isUserSingup,
		part:part,
		isOpen:isOpen,
		numberPart:0,
		confirmed:0
	}

  return(
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container">
				<div className="details">
					<p className="name-target">Tournament : <span>{tournament?.game.name}</span></p>
					<p className="starting"><span>{userConnectedRedux.user.language === "fr" ? dateStringToDY(tournament?.dateStart) : dateStringToDY(tournament?.dateStart)}</span></p>
					<p className="status">Status : <span>
						{isOpen ? Translation(userConnectedRedux.user.language).tournament.open : Translation(userConnectedRedux.user.language).tournament.close }
					</span></p>
				</div>

				<div className="banniere"></div>
				<div className="tabs">
					<ul>
						<li><Link to={`/info?uid=${params.get('uid')}`}>Info</Link></li>
						<li><Link to={`/matches?uid=${params.get('uid')}`}>Match</Link></li>
						<li><Link to={`/bracket?uid=${params.get('uid')}`}>Bracket</Link></li>
						<li><Link to={`/rules?uid=${params.get('uid')}`} className="active">Règles</Link></li>
					</ul>
				</div>
				<div className="container-rules">
					<div className="txt">
						{tournament? parse(tournament.description) : <></>}
					</div>
					<div className="tableau">
						<Stat tournament={tournament} />
						<div className="info-target">
							<div className="line">
								<p>
									{
										Translation(userConnectedRedux.user.language).tournament.start
									}
								</p>
								<span>{dateStringToDY(tournament?.dateStart)}</span>
							</div>
							<div className="line">
								<p>
									{
										Translation(userConnectedRedux.user.language).tournament.end
									}
								</p>
								<span>{dateStringToDY(tournament?.deadlineDate)}</span>
							</div>
							<div className="line">
								<p>Participants</p>
								<span>{tournament?.numberParticipate}</span>
							</div>
							<div className="line">
								<p>Mode</p>
								<span>{tournament ? tournament.gameWay : <></> }</span>
							</div>
						</div>
						<div className="btn-container">
							<RegisterTournament {...RegisterData}  />
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
    </div>
  )
}

export default Rules
