import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
// import Aside from "../assistance/aside"
import Support from "../assistance/support"

import "../../assets/css/style.css"
import "../assistance/assistance.css"
import { faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {GET_ALL_ASSIST} from "../../gql/assist/query"
import {Assist} from "../models/assist"

const Assistance: React.FC = function() {
	const [showDrop, setShowDrop] = useState<boolean>(false)
	// const [showContent, setShowContent] = useState<Boolean>(false)
	const [assists, setAssists] = useState<Assist[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_ASSIST)

	useEffect(() => {
		console.log(data)
		if(!loading && !error && data) {
			setAssists(data.FindAssistBySubject)
		}

	},[loading,error,data])

	const onShowDrop = function(){
	    setShowDrop(!showDrop)
	}

  return(
  	<div className="assistance">
	    <div className="container">
	  		<Header/>
	  		<div className="main">
	  			<div className="block-center">
			  		<div className="search-container">
			  			<h2>Assistance</h2>
			  			<div className="search-box">
			  				<input type = "text" placeholder ="Rechercher un sujet"/>
			  			</div>
			  		</div>
		  			<div className="aside-menu accueil"></div>
		  			<div className="support">
		  				<Support/>
		  				<div className="max-height" id="apex-legends">
			  				<div onClick={onShowDrop} className= {!showDrop ? "support-container" :"support-container reduce"}>
			  					<div className="under-title">
			  						<p className="medium">Titre</p>
			  						<p><span className="game-name">Sous titre</span></p>
			  						<i><FontAwesomeIcon icon={faSortDown} /></i>
			  					</div>
			  					<div className="didacticiel">
			  						content
			  					</div>
			  				</div>
			  			</div>
		  			</div>
	  			</div>
	  		</div>
			<Footer/>
	  	</div>
	</div>
  );
}

export default Assistance;

