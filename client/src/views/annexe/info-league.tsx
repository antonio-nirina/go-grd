import React ,{useEffect,useState} from "react"
import {useQuery,useMutation} from "@apollo/client"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux"

import Header from "../header/header"
import Footer from "../footer/footer"

import {GET_ONE_LEAGUE} from "../../gql/league/query"
import {SAVED_PART} from "../../gql/participate/mutation"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../tournament/info.css"
import "../../assets/css/style.css"
import {League} from "../models/league"
import {dateStringToDY} from "../tools/dateConvert"
import AvatarDefault from "../../assets/image/game-tag.png"
import {RegisterLeagueAction,Input} from "../league/action/leagueAction"
// import {checkInTeam} from "../league/utils"

const InfoLeague: React.FC = function(props:any) {
	const dispatch = useDispatch()
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")
	const [league, setLeague] = useState<League>()
	const [isOpen, setIsOpen] = useState<boolean>(true)
	const [group, setGroup] = useState<Array<number>>([])
	const [showMore, setShowMore] = useState<boolean>(false)
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	// const userSingupLeague = useSelector((state:RootState) => state.leagueSingin)
	const {loading,error,data} 	= useQuery(GET_ONE_LEAGUE, {
		variables: {
			uid:uid,
		},
	})
	const [savedPartLeague]  = useMutation(SAVED_PART)

	const onShowMore = function(){
		setShowMore(!showMore)
	}
	useEffect(() => {
		let array:Array<number> = []

		if(!loading && !error && data) {
			setLeague(data.FindOneLeague)
			for(let i = 0 ; i < data.FindOneLeague.numberParticipate/4; i++){
				array.push(i)
			}

			setGroup(array)
		}

		const date1 = new Date()
		const date2 = new Date(data?.FindOneLeague.deadlineDate)
		const diff = (date2.getTime() - date1.getTime())/1000/60

		if (diff < 10 || diff <= 0) setIsOpen(false)
	},[loading,error,data])
	let message:string = Translation(userConnectedRedux.user.language).tournament.notify ?? ""

	const notify = async function(){
		let isError:boolean = false
		const param:Input = {
			uidLeague:uid,
			userUid:userConnectedRedux.user.uid,
			part:true
		}

		if(league?.isTeam) {
			const check = false // await checkInTeam(userConnectedRedux.user.uid)
			if(!check) message = Translation(userConnectedRedux.user.language).tournament.notifyError
		}

		if(!isError) {
			await savedPartLeague({ variables: { uidUser: userConnectedRedux.user.uid,date:(new Date().toLocaleString()),tournamentUid:"",leagueUid:uid,teamsUid:{uid:[]} } })
			dispatch(RegisterLeagueAction(param))
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
					<p className="name-target">League : <span>{league?.game.name}</span></p>
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
						<span> {userConnectedRedux.user.language === "fr" ? dateStringToDY(league?.date) : dateStringToDY(league?.date)}</span></p>
					<p className="status">Status : <span>
						{isOpen ? Translation(userConnectedRedux.user.language).tournament.open : Translation(userConnectedRedux.user.language).tournament.close }
					</span>
					</p>
				</div>
				<div className="tabs">
					<ul>
						<li><Link to={`/info-league?uid=${params.get('uid')}`} className="active">Info</Link></li>
						<li><Link to={`/matches-league?uid=${params.get('uid')}`}>Match</Link></li>
						<li><Link to={`/rules-league?uid=${params.get('uid')}`}>
						{
							Translation(userConnectedRedux.user.language).tournament.rules
						}
						</Link></li>
					</ul>
				</div>
				<div className="container-rules">
					<div className="txt txt-infos">
						<div className="container-infos">
							<div className="calendar">
							<h2>{league?.title}</h2>
							<div className="flex-group">
								<div className="team-group flex">
									{
										group.map(function(el:number,index:number){
											return (<div key={index}>
												<div className="groups">
													<p>Group {el+1}</p>
												</div>
												<p className="group-name">
													<img src={AvatarDefault} className="avatar" alt="" />
													<span>Teamname 1</span>
												</p>
												<p className="group-name">
													<img src={AvatarDefault} className="avatar" alt="" />
													<span>Teamname 2</span>
												</p>
												<p className="group-name">
													<img src={AvatarDefault} className="avatar" alt="" />
													<span>Teamname 3</span>
												</p>
											</div>)
										})
									}
								</div>
							</div>
							<div className="btn-container">
								<button className="btn bg-red" onClick={onShowMore}>{!showMore ? "Voir plus" :"Reduire"}</button>
							</div>
							</div>
						</div>
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
								<span>{dateStringToDY(league?.date)}</span>
							</div>
							<div className="line">
								<p>
									{
										Translation(userConnectedRedux.user.language).tournament.end
									}
								</p>
								<span>{dateStringToDY(league?.deadlineDate)}</span>
							</div>
							<div className="line">
								<p>Participants</p>
								<span>{league?.numberParticipate}</span>
							</div>
							<div className="line">
								<p>Mode</p>
								<span>{league && league.numberTeam > 0 ? `${league?.numberTeam} ON ${league?.numberTeam}` : "1 ON 1" }</span>
							</div>
						</div>
						<div className="btn-container">
							{/*userSingupLeague.league.part ?
								<button className="btn light-blue">
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
							*/}
							<button className="btn bg-red" onClick={notify}>
								{
									Translation(userConnectedRedux.user.language).tournament.participate
								}
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
    </div>
  )
}

export default InfoLeague
