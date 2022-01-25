import React,{useEffect,useState} from "react"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"
import { Link } from 'react-router-dom'
import {useSubscription} from "@apollo/client"
import {useHistory } from "react-router-dom"

import fr from "../../assets/image/fr.png"
import Js from "../../assets/image/white-joystick.png"

import { faXbox, faPlaystation, faTwitch, faYoutube, faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons"
import { faChartBar, faUsers} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from "../header/header"
import Join from "../join/join"
import Footer from "../footer/footer"
import "./profil.css"
import Avatar from "./avatar"
import "../../assets/css/style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import 'reactjs-popup/dist/index.css'
import {GET_PART_USER,GET_PART_USER_WAGGER} from "../../gql/participate/query"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"
// import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {ParticipateTournament,ParticipateWagger} from "../models/participate"
import {GameUserModel} from "../models/user"
import {dateStringToDY} from "../tools/dateConvert"
import {GET_GAME_USER} from "../../gql/user/query"
import {GET_ONE_TEAM_BY_USER} from "../../gql/team/query"
import {TeamModel} from "../models/team"
import LogoTeam from "../../assets/image/team/logo-team.jpg"
import NewsInfo from "./news/news-info"
import Statistiques from "./news/statistique"
import { COUNTER_SUBSCRIBER } from "../../gql/tournament/subscription"
import {CheckPartTournament} from "../tournament/common/check-part"
import { NameRoutes } from "../commons/route-list"
import {GetAcountStorage,SetAcountStorage} from "../../storage/cookieStorage"


const Profile: React.FC = function() {
	const history = useHistory()
	const [participateTournament,setParticipateTournament] = useState<ParticipateTournament[]>([])
	const [participateWagger,setParticipateWagger] = useState<ParticipateWagger[]>([])
	const [choixGames,setChoixGames] = useState<GameUserModel[]>([])
	const [teams, setTeams] = useState<TeamModel[]>([])
	const [isPart, setIsPart] = useState<boolean>(false)

	const {loading:loadSub,error:errSub,data:dataSub}  = useSubscription(COUNTER_SUBSCRIBER)

	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const {loading,error,data} 	= useQuery(GET_PART_USER, {
		variables: {
			uidUser:userConnectedRedux.user.Uid,
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	const {loading:ldgWagger,error:errWagger,data:dataWagger} 	= useQuery(GET_PART_USER_WAGGER, {
		variables: {
			uidUser:userConnectedRedux.user.Uid,
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	const {loading:ldgGame,error:errGame,data:dataGame} 	= useQuery(GET_GAME_USER, {
		variables: {
			uid:userConnectedRedux.user.Uid,
		},
	})

	const {loading:ldteam,error:errTeam,data:dataTeam} 	= useQuery(GET_ONE_TEAM_BY_USER, {
		variables: {
			uid:userConnectedRedux.user.uid,
		},
	})

	useEffect(() => {
		async function checkPart(uid:string) {
			let check:boolean|undefined = false
			check = await CheckPartTournament(uid,userConnectedRedux.user.uid)
			if(check) setIsPart(true)
			if(isPart){
				SetAcountStorage({uidUser:userConnectedRedux.user.uid,statut:true})
				history.push(`${NameRoutes.matchTournament}?uid=${uid}&tournament=${true}&wagger=${false}`)
			}
		}

		if(!loadSub && !errSub && dataSub && !GetAcountStorage()) {
			checkPart(dataSub.subscribeCounter.uid)
		}

		const params = window.location.search
		if (window.opener) {
			window.opener.postMessage(params,"")
			window.close()
		}

		if(!loading && !error && data) {
			setParticipateTournament(data.FindPartByUser)
		}

		if(!ldgWagger && !errWagger && dataWagger) {
			setParticipateWagger(dataWagger.FindPartByUserWagger)
		}

		if(!ldgGame && !errGame && dataGame) {
			setChoixGames(dataGame.GetGameOneUserQuery)
		}

		if(!ldteam && !errTeam && dataTeam) {
			setTeams(dataTeam.FindTeamByUser)
		}

	},[
		loading,error,data,ldgWagger,errWagger,dataWagger,
		ldgGame,errGame,dataGame,ldteam,errTeam,dataTeam,
		loadSub,errSub,dataSub,userConnectedRedux,isPart,
		history
	])

  return(
	<div className="profil connected">
      <div className="container">
	      <Header/>
	      <div className="main-content">
	      	<div className="main-pro">
	      		<div className="gamer-stats">
		      		<div className="wall-bloc" id="wall">
			      		<div className="wall" id="wall">
			      			<Avatar />
			      		</div>
			      	</div>
			      	<div className="statistique">
			      		<div className="stat-content">
							  <Statistiques />
				      		<div className="with-stat">
			      				{choixGames.map(function(e:GameUserModel,index:number) {
									return (<div key={index}>
										<img src={e.Games.image} alt="" height="50"/>
										<p>{e.Games.name} <span><i><FontAwesomeIcon icon={faChartBar} /></i> statistiques</span></p>
									</div>)
								  })}
			      			</div>
				      	</div>
				      	<div className="stat-content">
				      		<div className="teamname">
								  {teams.map(function(team:TeamModel,index:number){
									  return (
										<div className="bloc-team-mate" key={index}>
											<div className="avatar-name">
												<div>
													<img src={team.banniere ? team.banniere : LogoTeam} alt="" className="avatar-lead"/>
												</div>
												<div>
													<span>{team.name}</span>
												</div>
											</div>
											<div className="setting-accounts">
												<div>
													<img src={Js} alt="" width="20" height="15"/>
												</div>
												<div>
													<img src={fr} alt="" width="20" height="20"/>
												</div>
											</div>
											<div className="team-number">
												<span>{team && team.players.length > 0 ? team.players.length : 0} <i><FontAwesomeIcon icon={faUsers} /></i></span>
											</div>
										</div>
									  )
								  })}

					      		<div className="media">
							      	<div className="social">
					      				<Link to="#"><i><FontAwesomeIcon icon={faTwitch} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faYoutube} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faFacebook} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faTwitter} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faXbox} /></i></Link>
					      				<Link to="#"><i><FontAwesomeIcon icon={faPlaystation} /></i></Link>
							      	</div>
	    						</div>
				      		</div>
				      	</div>
			      	</div>
			      	<div className="part">
						<div className="undertitle">
							<h2>Tournois</h2>
							<p>Derniers résultats en tournois de {userConnectedRedux.user.username}</p>
						</div>
						{participateTournament.length > 0 ?
							<div className="content waggers-link">
								<div className="fixed">
									<span>Nom</span>
									<span>Place</span>
									<span>Cashprize</span>
									<span>Format</span>
									<span>Nombre de Joueurs</span>
									<span>Date</span>
								</div>
								<div className="row-container">
									{
										participateTournament.map(function(el:ParticipateTournament,index:number){
											return (
												<div className="row" key={index}>
													<span>{el.tournament.title}</span>
													<span> {el.isWin ? "1rd" : "2rd"} </span>
													<span>{el.tournament.price+" €"}</span>
													<span>{el.tournament.gameWay}</span>
													<span>{el.tournament.numberParticipate}</span>
													<span>{dateStringToDY(el.tournament.dateStart)}</span>
												</div>
											)
										})
									}

								</div>

							</div>
							:
							<></>
						}
					</div>
					<div className="part">
						<div className="undertitle">
							<h2>Wagers</h2>
							<p>Derniers résultats de {userConnectedRedux.user.username}</p>
						</div>
						{participateWagger.length > 0 ?
							<div className="content waggers-link">
								<div className="fixed">
									<span>Nom</span>
									<span>Place</span>
									<span>Cashprize</span>
									<span>Format</span>
									<span>Nombre de Joueurs</span>
									<span>Date</span>
								</div>
								<div className="row-container">
									{
										participateWagger.map(function(el:ParticipateWagger,index:number){
											return (
												<div className="row" key={index}>
													<span>{el.wagger.title}</span>
													<span> {el.isWin ? "1rd" : "2rd"} </span>
													<span>{el.wagger.price+" €"}</span>
													<span>{el.wagger.format}</span>
													<span>{el.wagger.participant}</span>
													<span>{dateStringToDY(el.wagger.date)}</span>
												</div>
											)
										})
									}

								</div>

							</div>
							:
							<></>
						}
					</div>
					<NewsInfo />
			    </div>
	      	</div>
	      </div>
	      <Join/>
	      <Footer/>
	  </div>
    </div>
  )
}

export default Profile;
