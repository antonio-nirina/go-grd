import React,{useState} from "react"
// import {useQuery} from "@apollo/client"
import thumbnail from "../../assets/image/video.png"
import { faSortDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const Support: React.FC = function() {	
	const [showDrop, setShowDrop] = useState<Boolean>(false)
	const onShowDrop = function(){
	    setShowDrop(!showDrop)
	}	
  return(
  	<div onClick={onShowDrop} className= {!showDrop ? "sup-content" :"support-content reduce"}>
		<div className= "sup">
			<p className="title">Go Grind Support</p>
			<p>Trouver les réponses à vos problèmes et vos questions</p>
			<i><FontAwesomeIcon icon={faSortDown} /></i>
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
	</div>			
  );
}

export default Support;

