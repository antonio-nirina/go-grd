import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"

//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"

import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../waggers/waggers.css"
import "../participate/participate.css"
import Game from "../../assets/image/game.png"
import Apex from "../../assets/image/apex-legends.png"
import {Wagger} from "../models/wagger"

import {GET_ONE_WAGGER} from "../../gql/wagger/query"


const Joingame: React.FC = function(props:any) {
  	const [showClose, setShowClose] = useState(false)  	
  	const [wagger, setWagger] = useState<Wagger>()
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")

	const {loading,error,data} 	= useQuery(GET_ONE_WAGGER, {
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
  	
  return(
  	<div className="container">
  		<Header />
  		<div className="participate league joingame">
			<div className="marg">
				<div className="part">
            <div className="header-part">
              <img className="item-left" src={Game} alt="" />
              <div className="join-title">
                <h2>Wager Apex Legends - 2v2 Arène - Master</h2>
                <p>
                  <span>23 Juillet 2021 - 12h30</span>
                  <span>2v2 Arène</span>
                  <span>Apex Legends</span>
                  <span>Cross-Play</span>
                </p>
              </div>
            </div>
        </div>
        <div className="bar-menu-top">
          <li><Link to="/resultat">Résultats</Link></li>
          <li><Link to="/joingame" className="active">Général</Link></li>
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
                <p>15€/Joueur</p>
              </div>
              <div className="item-all-info">
                <p><span>Spectateurs</span></p>
                <p className="item-text-left">{wagger?.isPublic ? "Oui" : "Non"}</p>
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
                <p>60€</p>
              </div>
              <div className="item-all-info">
                <p><span>Console(s)</span></p>
                <p className="item-text-left">Xbox / PS4</p>
                <p><span>Vainqueur</span></p>
                <p>60€</p>
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
              <button className="btn bg-red">Rejoindre</button>
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

export default Joingame
