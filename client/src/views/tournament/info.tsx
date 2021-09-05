import React ,{useEffect,useState} from "react"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"

import parse from 'html-react-parser'
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"

import {GET_PART_TOURNAMENT} from "../../gql/participate/query"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../tournament/info.css"
import "../../assets/css/style.css"
import {Tournament} from "../models/tournament"
import {dateStringToDY} from "../tools/dateConvert"
import RegisterTournament,{RegisterType} from "./tournament-register"



const Info: React.FC = function(props:any) {
	// const dispatch = useDispatch()
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [tournament, setTournament] = useState<Tournament>()
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [part, setPart] = useState<string>("")
	const [isUserSingup,setIsUserSingup] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	// const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
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
			setPart(dataTrnmt.FindPartByUserTournament.uid)
		}

	},[loading,error,data,loadTrnmt,errTrnmt,dataTrnmt])

	const RegisterData:RegisterType = {
		uid:uid,
		tournament:tournament,
		isUserSingup:isUserSingup,
		part:part
	}
	// const messageLeave:string = Translation(userConnectedRedux.user.language).tournament.leave ?? ""

  return(
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container test">
				<div className="details">
					<p className="name-target">Tournois : <span>{tournament?.game.name}</span></p>
					<p className="starting">
						{
							Translation(userConnectedRedux.user.language).tournament.starttimes
						}:
						<span> {userConnectedRedux.user.language === "fr" ? dateStringToDY(tournament?.date) : dateStringToDY(tournament?.date)}</span></p>
					<p className="status">Status : <span>
						{isOpen ? Translation(userConnectedRedux.user.language).tournament.open : Translation(userConnectedRedux.user.language).tournament.close }
					</span>
					</p>
				</div>
				<div className="tabs">
					<ul>
						<li><Link to={`/info?uid=${params.get('uid')}`} className="active">Info</Link></li>
						<li><Link to={`/matches?uid=${params.get('uid')}`}>Match</Link></li>
						<li><Link to={`/bracket?uid=${params.get('uid')}`}>Bracket</Link></li>
						<li><Link to={`/rules?uid=${params.get('uid')}`}>
						{
							Translation(userConnectedRedux.user.language).tournament.rules
						}
						</Link></li>						
					</ul>
				</div>
				<div className="container-rules">
					<div className="txt">
						{tournament? parse(tournament.description) : <></>}
					</div>
					<div className="tableau">
						<div className="state">
							<p>{""}<span>slots</span></p>
							<p>{""}<span>
								{
									Translation(userConnectedRedux.user.language).tournament.pending
								}
							</span></p>
							<p>{""}<span className="confirm">
								{
									Translation(userConnectedRedux.user.language).tournament.confirmed
								}
							</span></p>
						</div>
						<div className="info-target">
							<div className="line">
								<p>
									{
										Translation(userConnectedRedux.user.language).tournament.start
									}
								</p>
								<span>{dateStringToDY(tournament?.date)}</span>
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
							<div>
								<p>Mode</p>
								<span>{tournament && tournament.numberTeam > 0 ? `${tournament?.numberTeam} V ${tournament?.numberTeam}` : "1 V 1" }</span>
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

export default Info
