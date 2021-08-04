import React,{useState} from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import Aside from "../assistance/aside"

import { faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "../../assets/css/style.css"
import "../assistance/assistance.css"


const Social: React.FC = function() {
	const [showDrop, setShowDrop] = useState<Boolean>(false)
	const [showContent, setShowContent] = useState<Boolean>(false)
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
		  			<div className="aside-menu social">
		  				<Aside />
		  			</div>
		  			<div className="support">
		  				<div className="sup">
		  					<p className="title">Go Grind Support</p>
		  					<p>Trouver les réponses à vos problèmes et vos questions</p>
		  				</div>
		  				<div className="max-height">
			  				<div onClick={onShowDrop} className= {!showDrop ? "support-container" :"support-container reduce"} id="apex-legends">
			  					<div className="under-title">
			  						<p className="medium">Comment ajouter des <span className="game-name">amis </span> ?</p>
			  						<p className="light">Suivez le didacticiel</p>
			  						<i><FontAwesomeIcon icon={faSortDown} /></i>
			  					</div>
			  					<div className="didacticiel">
			  						<p className="medium">What is Lorem Ipsum?</p>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
			  					</div>
			  					<div className="tuto-video img-cadre">
			  						
			  					</div>	  					
			  				</div>	  				
			  				<div onClick={onShowContent} className= {!showContent ? "support-container" :"support-container reduce"} id="call-of-duty">
			  					<div className="under-title">
			  						<p className="medium">Comment utiliser le <span className="game-name">Tchat </span> ?</p>
			  						<p className="light">Suivez le didacticiel</p>
			  						<i><FontAwesomeIcon icon={faSortDown} /></i>
			  					</div>
			  					<div className="didacticiel">
			  						<p className="medium">What is Lorem Ipsum?</p>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
			  					</div>
			  					<div className="tuto-video">
			  						 
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

export default Social;

