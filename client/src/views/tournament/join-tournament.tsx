import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"

//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"

import { faChevronCircleUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {GET_ONE_TOURNAMENT} from "../../gql/tournament/query"
import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../waggers/waggers.css"
import "../participate/participate.css"

import Game from "../../assets/image/game.png"
import Apex from "../../assets/image/apex-legends.png"
import Fifa21 from "../../assets/image/fifa21.png"
import Fortnite from "../../assets/image/fortnite.png"
import CodL from "../../assets/image/cod-coldwar.png"
import CodVanguard from "../../assets/image/cod-vanguard.png"
import Warzone from "../../assets/image/warzone.png"
import Rocketleague from "../../assets/image/rocketleague.png"
import Rainbowsix from "../../assets/image/rainbowsix.png"
import {dateStringToJoinT,dateStringToDHString} from "../tools/dateConvert"
import {Tournament,Platform} from "../models/tournament"

const Joingame: React.FC = function(props:any) {
  	const [showClose, setShowClose] = useState(false)
  	const [tournament, setTournament] = useState<Tournament>()
	const [plateform, setPlateform] = useState<string>()
	const [sumPrice, setSumPrice] = useState<number>(0)
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")

	const {loading,error,data} 	= useQuery(GET_ONE_TOURNAMENT, {
		variables: {
			uid:uid,
		},
	})

	useEffect(() => {
		console.log(data)
		if(!loading && !error && data) {
			let arrayPl:string[] = []
			let sum = 0
			setTournament(data.FindOneTournament)
			data.FindOneTournament?.plateform.forEach(function(platef:Platform){
				arrayPl.push(platef.name)
			})
			data.FindOneTournament.price.forEach(function(price:string){
				sum = sum + parseInt(price)
			})

			setSumPrice(sum)
			setPlateform(arrayPl.length > 0 ? arrayPl.join("/") : arrayPl[0])

		}

	},[loading,error,data])

  	const onShowClose = function(){
    	setShowClose(!showClose)
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
                <h2>{tournament?.title} - {tournament?.isTeam ? `${tournament.numberTeam}v${tournament.numberTeam}`:"1v1" } - {tournament?.game.name}</h2>
                <p>
                  <span>{dateStringToJoinT(tournament?.dateStart)}</span>
                  <span>{tournament?.isTeam ? `${tournament.numberTeam}v${tournament.numberTeam}`:"1v1" }</span>
                  <span>{tournament?.game.name}</span>
                  <span>{tournament?.plateform && tournament?.plateform.length > 0 ? "Cross-Play" : ""} </span>
                </p>
              </div>
            </div>
        </div>
        <div className="bar-menu-top">
        <li><Link to="/join-tournament" className="active">Général</Link></li>
          <li><Link to="/tableau">Tableau</Link></li>
          <li><Link to="/waggers-rules">Règles</Link></li>
        </div>
        <div className="information-game">
          <div className="item-info-left">
            <div className="item-img-info">
              <img src={tournament?.game.slug === "vanguard" ? CodVanguard : (tournament?.game.slug === "fortnite" ? Fortnite : (tournament?.game.slug ==="fifa21" ? Fifa21 : (tournament?.game.slug ==="ops" ? CodL : (tournament?.game.slug ==="warzone" ? Warzone : (tournament?.game.slug ==="rainbows" ? Rainbowsix : (tournament?.game.slug ==="apexlegends"?Apex:Rocketleague))))) )} alt=""/>
            </div>
            <div className="item-all-content">
              <div className="item-all-info">
                <p><span>Format</span></p>
                <p className="item-text-left">Tableau unique</p>
                <p><span>Début des inscriptions</span></p>
                <p>{dateStringToDHString(tournament?.dateStart).replace(","," -")}</p>
              </div>
              <div className="item-all-info">
                <p><span>Spectateurs</span></p>
                <p className="item-text-left">Admins War Legends</p>
                <p><span>Fin des inscriptions</span></p>
                <p>{dateStringToDHString(tournament?.deadlineDate).replace(","," -")}</p>
              </div>
              <div className="item-all-info">
                <p><span>Map(s)</span></p>
                <p className="item-text-left">Map(s)</p>
				{tournament?.laps.map(function(lap:string,index:number){
					return (
						<div key={index}>
							<p><span>Tour {index+1}</span></p>
                			<p>{dateStringToDHString(lap).replace(","," -")}</p>
						</div>
					)
				})}

              </div>
              <div className="item-all-info">
                <p><span>Serveur</span></p>
                <p className="item-text-left">{tournament?.server}</p>
              </div>
              <div className="item-all-info">
                <p><span>Console(s)</span></p>
				{plateform}
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
          <div className="item-info-left apart">
            <div className="item-img-info">
            </div>
            <div className="item-all-content">
              <div className="item-all-info">
                <p><span>Frais d'entrée</span></p>
                <p className="item-text-left">Invitation</p>
                <p><span>Cash prize</span></p>
                <p>{sumPrice}</p>
              </div>
              <div className="item-all-info">
                <p><span>Région</span></p>
                <p className="item-text-left">{tournament?.region}</p>
				{tournament?.price.map(function(price:string,index:number) {
					return (
						<div key={index}>
							<p><span>Position {index}+1</span></p>
							<p>{price} €</p>
						</div>
					)
				})}

              </div>
              <div className="item-all-info">
                <p><span>Tchat Vocal</span></p>
                <p className="item-text-left">Discord</p>
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

export default Joingame
