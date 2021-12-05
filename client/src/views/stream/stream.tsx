import React,{useState}  from "react"
import { useParams } from "react-router-dom"


import Header from "../header/header"
import Footer from "../footer/footer"
import "./stream.css"
import Viewer from "../../assets/image/icons/viewer.png"
import { faCog, faLaugh, faShare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import thumbnail from "../../assets/image/video.png"


const Stream: React.FC = function() {
	const [isFocus,setIsFocus] = useState<boolean>(false)
	const { username } = useParams<any>()
	const { game } = useParams<any>()
  return(
	<div className="streams">
	    <div className="container">
	  		<Header/>
	  		<div className="main">
	  			<h2>{`${game} / ${username}`}</h2>
	  			<div className="streams-container">
	  				<div className="stream-video">
					  {/*<iframe
						src={`https://player.twitch.tv/?channel=${username}&parent=${process.env.REACT_APP_URL_PARENT}`}
						height="100%"
						width="100%"
						>
					  </iframe>*/}
						<video controls poster={thumbnail}>
							<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"  />
						</video>
	  				</div>
	  				<div className="live-tchat">
		  				<div className="header-live">
		  					<p>Chat du stream</p>
		  					<i></i>
		  				</div>
		  				<div className="live-stream">
		  					<div className="live-content">
		  						<p>Jhon1 : <span> Salut !</span></p>
								<p>Jhon1 : <span> Salut !</span></p>
								<p>Jhon1 : <span> Salut !</span></p>
								<p>Jhon1 : <span> Salut !</span></p>
								<p>Jhon1 : <span> Salut !</span></p>
								<p>Jhon1 : <span> Salut !</span></p>
								<p>Jhon1 : <span> Salut !</span></p>
		  					</div>
		  					<div className="edit-msg">
		  						<input type="text" className={isFocus ? "enter-message" : "none-message"} onBlur={()=>{setIsFocus(false)}}  onFocus={()=>{setIsFocus(true)}} placeholder="Envoyer un message" />
		  						<i><FontAwesomeIcon icon={faLaugh} /></i>
		  					</div>
		  					<div className="footer-live">
		  						<p>
		  							<img src={Viewer} alt=""/>
		  							<span>0</span></p>
		  						<p>
		  							<i><FontAwesomeIcon style={{cursor:"pointer"}} icon={faCog} /></i>
		  							<button style={{cursor:"pointer"}}>Chat</button>
		  						</p>
		  					</div>
		  				</div>
	  				</div>
	  			</div>
	  		</div>
			<Footer/>
	  	</div>
	</div>
  )
}

export default Stream
