import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import Aside from "../assistance/aside"
import Support from "../assistance/support"

import thumbnail from "../../assets/image/video.png"
import "../../assets/css/style.css"
import "../assistance/assistance.css"
import { faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {GET_ASSIST_BY_SUBJECT} from "../../gql/assist/query"

const Assistance: React.FC = function() {	
	const [showDrop, setShowDrop] = useState<Boolean>(false)
	const [showContent, setShowContent] = useState<Boolean>(false)
	const [assists, setAssists] = useState<any>([])
	const {loading,error,data} 	= useQuery(GET_ASSIST_BY_SUBJECT)

	useEffect(() => {
		if(!loading && !error && data) {
			console.log(data.FindAssistBySubject)
			setAssists(data.FindAssistBySubject)
		}

	},[loading,error,data])

	const onShowDrop = function(){
	    setShowDrop(!showDrop)
	}
	const onShowContent = function(){
	    setShowContent(!showContent)
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
		  			<div className="aside-menu accueil">
		  				<Aside assists={assists} />
		  			</div>
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

