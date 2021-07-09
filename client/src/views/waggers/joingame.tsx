import React from "react"
import { Link } from "react-router-dom"

import Header from "../header/header"
import Footer from "../footer/footer"
import Join from "../join/join"

import { faCommentDots } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"

import "../../assets/css/style.css"
import "../annexe/tournois.css"
import "../participate/participate.css"

import apexlegends from "../../assets/image/apex-legends.png"
import fr from "../../assets/image/fr.png"
import discord from "../../assets/image/discord.png"

const Joingame: React.FC = function() {

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
            <div className="icon-tchat">
              <i><FontAwesomeIcon icon={faCommentDots} /></i>
            </div>
          </div>
        </div>
        <div className="clear"></div>        
				<Join/>
				<Footer/>
  			</div>
  		</div>
  	</div>
  )
}

export default Joingame
