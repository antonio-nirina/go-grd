import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"
import { faChevronCircleUp, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {GET_PART_ONE_TOURNAMENT} from "../../gql/participate/query"
import "../../assets/css/style.css"
import "../tournament/tournament.css"
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
import {ParticipateTournament} from "../models/participate"
import PartTournament,{PartTournamentType} from "./part-tournament"

const Joingame: React.FC = function(props:any) {
  	const [showClose, setShowClose] = useState(false)
    const [next, setNext] = useState(false)
  	const [tournament, setTournament] = useState<Tournament>()
	  const [parts, setParts] = useState<ParticipateTournament[]>()
	const [plateform, setPlateform] = useState<string>()
	const [sumPrice, setSumPrice] = useState<number>(0)
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")

	const {loading,error,data} 	= useQuery(GET_PART_ONE_TOURNAMENT, {
		variables: {
			uid:uid,
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			let arrayPl:string[] = []
			let sum = 0
			setParts(data.FindTournamentParticipate)
			setTournament(data.FindTournamentParticipate[0].tournament)
			data.FindTournamentParticipate[0].tournament?.plateform.forEach(function(platef:Platform){
				arrayPl.push(platef.name)
			})
			data.FindTournamentParticipate[0].tournament.price.forEach(function(price:string){
				sum = sum + parseInt(price)
			})

			setSumPrice(sum)
			setPlateform(arrayPl.length > 0 ? arrayPl.join("/") : arrayPl[0])

		}

	},[loading,error,data])

  	const onShowClose = function(){
    	setShowClose(!showClose)
  	}
    const onNext = function(){
      setNext(!next)
    }
	const partTournament:PartTournamentType = {
		tournament:tournament,
		parts:parts,
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
              <img className="item-left" src={tournament?.game.logo} alt={tournament?.game.slug} />
              <div className="join-title">
                <h2>{tournament?.title} - {tournament?.gameWay} - {tournament?.game.name}</h2>
                <p>
                  <span>{dateStringToJoinT(tournament?.dateStart)}</span>
                  <span>{tournament?.gameWay}</span>
                  <span>{tournament?.game.name}</span>
                  <span>{tournament?.plateform && tournament?.plateform.length > 0 ? "Cross-Play" : tournament?.plateform[0]} </span>
                </p>
              </div>
            </div>
        </div>
        <div className="bar-menu-top">
        <li><Link to="/join-tournament" className="active">Général</Link></li>
          <li><Link to="/tableau">Tableau</Link></li>
          <li><Link to="/waggers-rules">Règles</Link></li>
        </div>
        <div className="in-container">
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
					<p>{plateform}</p>
                </div>
              </div>
            </div>
			<PartTournament {...partTournament} />
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
          							<p><span>Position {index+1}</span></p>
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
            <div className={!showClose ? "d-none" : "entry"}>
              <h3>Rejoindre Fortnite Daily Cup</h3>
              <div className="step-container">
                <div className="step-1">
                  <div className="entry-step">
                  <span>1</span>
                  <span className="separator"></span>
                  <span>2</span>
                  </div>
                  <div className="step-name">
                  <span>Information</span>
                  <span>Payment</span>
                  </div>
                </div>
                <div className="d-none" /*"step-2"*/>
                  <div className="entry-step">
                    <span><FontAwesomeIcon icon={faCheck}/></span>
                    <span className="separator"></span>
                    <span>2</span>
                  </div>
                  <div className="step-name">
                    <span>Information</span>
                    <span>Payment</span>
                  </div>
                </div>
              </div>
              <div className="entry-price">
                <span>Entrée</span>
                <span>€27</span>
              </div>
                <div className="payment-method d-none">
                  <p>Nous acceptons les moyens de paiement sécurisé suivants :</p>
                </div>
              <div className="next-btn">
                <button className="btn bg-white" onClick={onShowClose}>Annuler</button>
                <button className="btn bg-red" onClick={onNext}>Suivant</button>
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
