import React ,{useEffect,useState} from "react"
import {useQuery,useMutation} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify'

import parse from 'html-react-parser'
import { Link } from "react-router-dom"
import Header from "../header/header"
import Footer from "../footer/footer"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {SAVED_PART,LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {GET_PART_TOURNAMENT} from "../../gql/participate/query"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../tournament/info.css"
import "../../assets/css/style.css"
import {Tournament} from "../models/tournament"
import {dateStringToDY} from "../tools/dateConvert"
import {checkInTeam} from "../league/utils"
import {RegisterTournamentAction,Input} from "../tournament/action/tournamentAction"


const Info: React.FC = function(props:any) {
	const dispatch = useDispatch()
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [tournament, setTournament] = useState<Tournament>()
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [part, setPart] = useState<string>("")
	const [isUserSingup,setIsUserSingup] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
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
			setPart(dataTrnmt.Uid)
		}

	},[loading,error,data,loadTrnmt,errTrnmt,dataTrnmt])

	const [savedPartTournament]  = useMutation(SAVED_PART)
	const [leavePartTournament] = useMutation(LEAVE_PART_TOURNAMENT)
	let message:string = Translation(userConnectedRedux.user.language).tournament.notify ?? ""

	const leaveTournament = async function(){
		const param:Input = {
			uidTournament:uid,
			userUid:userConnectedRedux.user.uid,
			part:false
		}
		const messageLeave:string = Translation(userConnectedRedux.user.language).tournament.leave ?? ""
		// await leavePartTournament({ variables: { uid: part} })
		dispatch(RegisterTournamentAction(param))

		toast(messageLeave,{
			className: 'light-blue',
			position: "top-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}

	const notify = async function(){
		let isError:boolean = false
		const param:Input = {
			uidTournament:uid,
			userUid:userConnectedRedux.user.uid,
			part:true
		}

		if(tournament?.isTeam) {
			const check = await checkInTeam(userConnectedRedux.user.uid)
			if(!check) {
				isError = true
				message = Translation(userConnectedRedux.user.language).tournament.notifyError
			}
		}

		if(!isError) {
			await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:uid,teamsUid:{uid:[]} } })
			dispatch(RegisterTournamentAction(param))
		}

		toast(message,{
			className: 'light-blue',
			position: "top-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}

  return(
  	<div className="Tournament info">
		<div className="container">
			<Header/>
			<div className="full-container test">
				<div className="details">
					<p className="name-target">Tournois : <span>{tournament?.game.name}</span></p>
					<ToastContainer
						position="top-left"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
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
								<span>{tournament && tournament.numberTeam > 0 ? `${tournament?.numberTeam} ON ${tournament?.numberTeam}` : "1 ON 1" }</span>
							</div>
						</div>
						<div className="btn-container">
							{!userSingupTournament.tournament.part && isUserSingup ?
								<button className="btn light-blue" onClick={leaveTournament}>
									{
										Translation(userConnectedRedux.user.language).tournament.cancelParticipate
									}
								</button>
								:
								<button className="btn bg-red" onClick={notify}>
									{
										Translation(userConnectedRedux.user.language).tournament.participate
									}
								</button>
							}
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
