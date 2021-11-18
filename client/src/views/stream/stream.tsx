import React  from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import "./stream.css"

import thumbnail from "../../assets/image/video.png"

const Stream: React.FC = function() {

  return(
	<div className="streams">
	    <div className="container">
	  		<Header/>
	  		<div className="main">
	  			<h2>Call of duty</h2>
	  			<div className="streams-container">
	  				<div className="stream-video">
					<video controls poster={thumbnail}>
						<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
					</video>
	  				</div>
	  				<div className="live-tchat">
		  				<div className="header-live">
		  					<p>Chat du stream</p>
		  					<i></i>
		  				</div>
		  				<div className="live-stream">
		  					<div className="live-content">
		  						<p>Jhon1 : <span>Salut !</span></p>
		  					</div>
		  					<div className="edit-msg">
		  						<input type="text" placeholder="Envoyer un message" />
		  						<i></i>
		  					</div>
		  					<div className="footer-live">
		  						<span>0</span>
		  						<i></i>
		  						<button>Chat</button>
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
