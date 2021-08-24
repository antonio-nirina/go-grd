import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import Aside from "../assistance/aside"

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
		  				<div className="sup">
		  					<p className="title">Go Grind Support</p>
		  					<p>Trouver les réponses à vos problèmes et vos questions</p>
		  				</div>
		  				<div className="under-title">
		  					<div className="advice">
		  						<div className="carre"></div>
		  						<div className="right">
		  							<p className="medium">Problèmes populaires</p>
		  							<p className="light">Retrouver les réponses aux questions les plus posées</p>
		  						</div>		  					
		  					</div>
		  					<div className="clear"></div>
		  					<div className="advice">
		  						<div className="carre"></div>
		  						<div className="right">
		  							<p className="medium">Nos techniciens à votre écoute</p>
		  							<p className="light">Rejoignez nos réseaux sociaux pour discuter avec nos techniciens en direct</p>
		  						</div>		  					
		  					</div>
		  				</div>
		  				<div className="under-title">
		  					<p className="medium">Comment déposer une requête support ?</p>
		  					<div className="tuto-video">
		  						 <video controls poster={thumbnail} width="477" height="268">
              						<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
            					</video>
		  					</div>
		  				</div>
		  				<div className="max-height" id="apex-legends">
			  				<div onClick={onShowDrop} className= {!showDrop ? "support-container" :"support-container reduce"}>
			  					<div className="under-title">
			  						<p className="medium">Des problèmes dans le jeu <span className="game-name">Apex legends</span> ?</p>
			  						<p className="light">Suivez le didacticiel</p>
			  						<i><FontAwesomeIcon icon={faSortDown} /></i>
			  					</div>
			  					<div className="didacticiel">
			  						<p className="medium">What is Lorem Ipsum?</p>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
			  					</div>
			  					<div className="tuto-video img-cadre">
			  						<img src="https://i.ibb.co/TKD3yZT/apex-legends.webp" alt="apex-legends" />
			  					</div>	  					
			  				</div>	  				
			  				<div onClick={onShowContent} className= {!showContent ? "support-container" :"support-container reduce"} id="call-of-duty">
			  					<div className="under-title">
			  						<p className="medium">Des problèmes dans le jeu <span className="game-name">Call of Duty : Warzone </span> ?</p>
			  						<p className="light">Suivez le didacticiel</p>
			  						<i><FontAwesomeIcon icon={faSortDown} /></i>
			  					</div>
			  					<div className="didacticiel">
			  						<p className="medium">What is Lorem Ipsum?</p>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
			  					</div>
			  					<div className="tuto-video">
			  						 <video controls poster={thumbnail} width="477" height="268">
	              						<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
	            					</video>
			  					</div>	  					
			  				</div>
			  			</div>		  				
		  				<div className="max-height">
			  				<div onClick={onShowDrop} className= {!showDrop ? "support-container" :"support-container reduce"} >
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
			  			<div className="max-height">
			  				<div onClick={onShowDrop} className= {!showDrop ? "support-container" :"support-container reduce"} >
			  					<div className="under-title">
			  						<p className="medium">Comment faire si vous avez oublié votre <span className="game-name">Identifiant </span> ?</p>
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
			  						<p className="medium">Comment bien utiliser la <span className="game-name">liaison console </span> ?</p>
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

export default Assistance;

