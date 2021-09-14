import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"
import { useSelector } from "react-redux"

import Header from "../header/header"
import Footer from "../footer/footer"
import Chat from "./chat"

import { faCommentDots } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"

import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../waggers/waggers.css"
import "../participate/participate.css"

import apexlegends from "../../assets/image/apex-legends.png"
import fr from "../../assets/image/fr.png"
import discord from "../../assets/image/discord.png"
import AvatarDefault from "../../assets/image/game-tag.png"
import {Wagger} from "../models/wagger"

import {GET_ONE_WAGGER} from "../../gql/wagger/query"


const Joingame: React.FC = function(props:any) {
  	const [showSalon, setShowSalon] = useState(false)
  	const [showTchat, setShowTchat] = useState(false)
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

  	const onShowSalon = function(){
    	setShowSalon(!showSalon)
  	}
  	const onShowTchat = function(){
    	setShowTchat(!showTchat)
  	}
  return(
  	<div className="container">
  		<Header />
  		<div className="participate league joingame">
			<div className="marg">
				<div className="part">
            <div className="header-part">
              <img className="item-left" src="https://i.ibb.co/TKD3yZT/apex-legends.webp" alt="" />
              <div className="join-title">
                <h2>Wager Apex Legends - 3v3 Arène - Platine</h2>
                <div className="img-bot-setting">
                  <p><img src={discord} alt=""/></p>
                  <p><img src={fr} alt=""/></p>
                </div>
              </div>
            </div>            
        </div>
        <div className="bar-menu-top">
          <li><Link to="#" className="active">Général</Link></li>
          <li><Link to="#">Règles</Link></li>
        </div>
        <div className="information-game">
          <div className="item-info-left">
            <div className="item-img-info">
              <img src={apexlegends} alt=""/>
            </div>
            <div className="item-all-content">
              <div className="item-all-info">
                <p><span>Format</span></p>
                <p className="item-text-left">BO3</p>
                <p><span>Frais d'entrée</span></p>
                <p>30€</p>
              </div>
              <div className="item-all-info">
                <p><span>Spectateurs</span></p>
                <p className="item-text-left">Non</p>
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
              <p className="team-bar-title">Equipes 1/2</p>
              <button className="btn bg-red">Rejoindre</button>
              <div className="profil-join">
                <p>Skouinar - <span>TonioPlancha</span> - <span>Shad_BD</span></p>
                <p className="free-emplacement"><span>Emplacement Libre</span></p>
              </div>
            </div>
            <div className="icon-tchat" onClick={onShowSalon}>
              <i><FontAwesomeIcon icon={faCommentDots} /></i>
            </div>
            <div className={!showTchat ? "salon-chat" :"salon-chat show"} >
              <Chat />
            </div>
            <div className={!showSalon ? "salon" :"salon show"}>
              <div className="salon-titre">Salon de tchat</div>
              <div className="salon-team" onClick={onShowTchat}>
                <img src={AvatarDefault} width="30" alt="joingame" />
                <p>Wager Apex Legends - <span>3v3...<i><FontAwesomeIcon icon={faCommentDots} size="xs"/></i></span></p>
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
