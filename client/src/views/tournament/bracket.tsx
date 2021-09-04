import React ,{useEffect,useState} from "react"
import {useQuery,useMutation} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"
import { ToastContainer, toast } from 'react-toastify'

import parse from 'html-react-parser'
import { Link } from "react-router-dom"
import Tree from "./tree"
import Header from "../header/header"
import Footer from "../footer/footer"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {SAVED_PART} from "../../gql/participate/mutation"
import {GET_PART_TOURNAMENT} from "../../gql/participate/query"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../tournament/bracket.css"
import "../../assets/css/style.css"
import {Tournament} from "../models/tournament"
import {dateStringToDY} from "../tools/dateConvert"
import {checkInTeam} from "../league/utils"
import {RegisterTournamentAction,Input} from "../tournament/action/tournamentAction"


const Bracket: React.FC = function(props:any) {
	const dispatch = useDispatch()
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [tournament, setTournament] = useState<Tournament>()
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [showMore, setShowMore] = useState<boolean>(false)
	const [isPart, setPart] = useState<boolean>(true)
	const [isUserSingup,setIsUserSingup] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
	const {loading,error,data} 	= useQuery(GET_ONE_TOURNAMENT, {
			variables: {
				uid:uid,
			},
	})
	const onShowMore = function(){
		setShowMore(!showMore)
	}

	const {loading:loadTrnmt,error:errTrnmt,data:dataTrnmt} = useQuery(GET_PART_TOURNAMENT, {
			variables: {
				uidUser:userConnectedRedux.user.uid,
				uidTournament:"6129d5349e638a5176f6d383"
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
		console.log(dataTrnmt)
		if(!loadTrnmt && !errTrnmt && dataTrnmt) {
			if(dataTrnmt.FindPartByUserTournament.length > 0 && tournament?.isTeam) {
				// dataTrnmt.FindPartByUserTournament.team
			}
		}

	},[loading,error,data,loadTrnmt,errTrnmt,dataTrnmt])

	const [savedPartTournament]  = useMutation(SAVED_PART)
	let message:string = Translation(userConnectedRedux.user.language).tournament.notify ?? ""

	const notify = async function(){
		let isError:boolean = false
		const param:Input = {
			uidTournament:uid,
			userUid:userConnectedRedux.user.uid,
			part:true
		}

		if(tournament?.isTeam) {
			const check = await checkInTeam(userConnectedRedux.user.uid)
			if(!check) message = Translation(userConnectedRedux.user.language).tournament.notifyError
		}

		if(!isError) {
			await savedPartTournament({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:uid,leagueUid:"",teamsUid:{uid:[]} } })
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
			<div className="full-container bracket">
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
						<li><Link to={`/info?uid=${params.get('uid')}`}>Info</Link></li>
						<li><Link to={`/matches?uid=${params.get('uid')}`}>Match</Link></li>
						<li><Link to={`/Bracket?uid=${params.get('uid')}`} className="active">Bracket</Link></li>
						<li><Link to={`/rules?uid=${params.get('uid')}`}>
						{
							Translation(userConnectedRedux.user.language).tournament.rules
						}
						</Link></li>						
					</ul>
				</div>
				<div className="container-rules">
					<div className={!showMore ? "tree-container" :"tree-container show"}>
						<Tree />
					</div>
				</div>
			</div>			
			<Footer/>
		</div>
    </div>
  )
}

export default Bracket
