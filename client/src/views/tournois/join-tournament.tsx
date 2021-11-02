import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import { useSelector } from "react-redux"
//import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"

import { faChevronCircleUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../waggers/waggers.css"
import "../participate/participate.css"

import Game from "../../assets/image/game.png"
import Apex from "../../assets/image/apex-legends.png"
import {Wagger} from "../models/wagger"
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import {GET_PART_TOURNAMENT} from "../../gql/participate/query"

import {Tournament} from "../models/tournament"
import {dateStringToDY} from "../tools/dateConvert"
import RegisterTournament,{RegisterType} from "../tournament/tournament-register"

const JoinTournament: React.FC = function(props:any) {
    const [showClose, setShowClose] = useState(false)  	
    const [wagger, setWagger] = useState<Wagger>()
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

	
	useEffect(() => {
		if(!loading && !error && data) {
			setWagger(data.FindOneWagger)
		}

	},[loading,error,data])

    const onShowClose = function(){
        setShowClose(!showClose)
    }

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
		part:part,
		isOpen:isOpen,
		numberPart:0,
		confirmed:0
	}
		
	return(
		<div className="container">
			<Header />
			<div className="participate league joingame">
			<div className="marg">
				<div className="part">
						<div className="back">
							<Link to="#"><i><FontAwesomeIcon icon={faChevronCircleUp} size="xs" /></i>Retour</Link>
						</div>
						<div className="header-part">
							<img className="item-left" src={Game} alt="" />
							<div className="join-title">
								<h2>Wager Apex Legends - 2v2 Arène - Master</h2>
								<h2>
									{tournament?.title} - {tournament?.isTeam ? `${tournament.numberTeam}v${tournament.numberTeam} - ` : "1v1"} - {tournament?.game.name}
								</h2>
								<p>
									<span>23 Juillet 2021 - 12h30</span>
									<span>{dateStringToDY(tournament?.date)}</span>
									<span>2v2 Arène</span>
									<span>{tournament?.game.name}</span>
									<span>
										{tournament?.plateform}
									</span>
								</p>
							</div>
						</div>
				</div>
				<div className="bar-menu-top">
					<li>
						<Link to="/joingame" className="active">Général</Link>
					</li>
					<li>
						<Link to="/resultat">Résultats</Link>
					</li>
					<li><Link to="/waggers-rules">Règles</Link></li>
				</div>
				<div className="information-game">
					<div className="item-info-left">
						<div className="item-img-info">
							<img src={Apex} alt=""/>
						</div>
						<div className="item-all-content">
							<div className="item-all-info">
								<p><span>Format</span></p>
								<p className="item-text-left">BO3</p>
								<p><span>Frais d'entrée</span></p>
								<p>{tournament?.priceParticipate}€/Joueur</p>
							</div>
							<div className="item-all-info">
								<p><span>Spectateurs</span></p>
								<p className="item-text-left">{tournament?.isPublic ? "Oui" : "Non"}</p>
								<p><span>Région</span></p>
								<p>EU</p>
							</div>
							<div className="item-all-info">
								<p><span>Map(s)</span></p>
								<p className="item-text-left">Map(s)</p>
								<p><span>Tchat Vocal</span></p>
								<p>Discord</p>
							</div>
							<div className="item-all-info">
								<p><span>Serveur</span></p>
								<p className="item-text-left">Paris, France</p>
								<p><span>Cash prize</span></p>
								<p>{tournament?.price}€</p>
							</div>
							<div className="item-all-info">
								<p><span>Console(s)</span></p>
								<p className="item-text-left">Xbox / PS4</p>
								<p><span>Vainqueur</span></p>
								<p>{tournament?.price}€</p>
							</div>
						</div>
					</div>
					<div className="item-info-right">
						<div className="join-all">
							<p className="team-bar-title">{!showClose! ? "Equipes 1/2" : "Equipes 2/2"}</p>              
							<button className="btn bg-red" onClick={onShowClose}>{!showClose ? "Rejoindre" : "Quitter"}</button>
							<button className={showClose ? "btn bg-green-light":"d-none"}>Lancer</button>
							<div className="profil-join">
								<p>Skouinar - <span>TonioPlancha</span></p>
								<p className="free-emplacement"><span>{!showClose ? "Emplacement Libre" : "Gotaga - CapelaJr"}</span></p>
							</div>
						</div>
						 <div className="join-all join-canal">
							<p className="team-bar-title">Rejoindre le canal discord</p>
							<button className="btn bg-red discolor">Rejoindre</button>
						</div>
					</div>
				</div>
				<div className="information-game">
					<div className="d-none /*item-info-left apart*/">
						<div className="item-img-info">
						</div>
						<div className="item-all-content">
							<div className="item-all-info">
								<p><span>Frais d'entrée</span></p>
								<p className="item-text-left">Invitation</p>
								<p><span>Cash prize</span></p>
								<p>900€</p>
							</div>
							<div className="item-all-info">
								<p><span>Région</span></p>
								<p className="item-text-left">EU</p>
								<p><span>Position 1</span></p>
								<p>600€</p>
							</div>
							<div className="item-all-info">
								<p><span>Tchat Vocal</span></p>
								<p className="item-text-left">Discord</p>
								<p><span>Position 2</span></p>
								<p>300€</p>
							</div>
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

export default JoinTournament
