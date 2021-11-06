import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"

import Header from "../../header/header"
import Footer from "../../footer/footer"

//import {Translation} from "../../lang/translation"
//import {RootState} from "../../reducer"

import "../../../assets/css/style.css"
import "../../annexe/tournois.css"
import "../stat/stat.css"
import "../../waggers/waggers.css"
import "../../participate/participate.css"

import { faXbox, faPlaystation } from "@fortawesome/free-brands-svg-icons"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import Game from "../../../assets/image/game.png"
import Apex from "../../../assets/image/apex-legends.png"
import {Wagger} from "../../models/wagger"
import Discord from "../../../assets/image/discord.png"
import Flag from "../../../assets/image/fr.png"

import {GET_ONE_WAGGER} from "../../../gql/wagger/query"


const Stat: React.FC = function(props:any) {  	
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
  	
  return(
  	<div className="container">
  		<Header />
  		<div className="participate league joingame stats">
			<div className="marg">
				<div className="part">
            <div className="header-part">
              <img className="item-left" src={Game} alt="" />
              <div className="join-title">
                <h2>Wager Apex Legends</h2>
                <p className="conf">
                  <img src={Discord} width="25"/>
                  <img src={Flag} width="25"/>
                </p>
              </div>
            </div>            
        </div>        
        <div className="clear"></div>				
			</div>
  		</div>
      <div className="game-stat-list">
        <div className="undertitle">
          <h2>Tournois</h2>
          <p>Derniers résultats en tournois</p>          
        </div>        
        <div className="content">
          <div className="apex block green">
            <div>
              <p className="legend">Apex Legends Hebdomadaire</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
            </div>
            <div className="info">
              <p className="price inblock"><i className="sprite calendar"></i><span>0</span></p>
              <p className="date inblock"><i className="sprite ticket"></i><span>02/04/2021 - 5:00 PM</span></p>
            </div>
           </div>
           <div className="apex block green">
            <div>
              <p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
            </div>
            <div className="info">
              <p className="price inblock"><i className="sprite calendar"></i><span>0</span></p>
              <p className="date inblock"><i className="sprite ticket"></i><span>02/04/2021 - 5:00 PM</span></p>
            </div>
           </div>
        </div>
      </div>
      <div className="game-stat-list">
        <div className="undertitle">
          <h2>wagers</h2>
          <p>Derniers résultats en wager</p>          
        </div>        
        <div className="content">
          <div className="apex block green">
            <div>
              <p className="legend">Apex Legends Hebdomadaire</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
            </div>
            <div className="info">
              <p className="price inblock"><i className="sprite calendar"></i><span>0</span></p>
              <p className="date inblock"><i className="sprite ticket"></i><span>02/04/2021 - 5:00 PM</span></p>
            </div>
          </div>
          <div className="apex block green">
            <div>
              <p className="legend">Apex Legends Daily Cup</p><i className="iconGame"><FontAwesomeIcon icon={faXbox}/></i>
            </div>
            <div className="info">
              <p className="price inblock"><i className="sprite calendar"></i><span>0</span></p>
              <p className="date inblock"><i className="sprite ticket"></i><span>02/04/2021 - 5:00 PM</span></p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
  	</div>
  )
}

export default Stat
