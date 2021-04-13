import React from "react"
import ReactDOM from 'react-dom'
import logo from "../../assets/image/logo.png"
import "../../assets/css/style.css"
import "../footer/footer.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import {fab, faFacebookF, faInstagram, faTwitter, faFacebook, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Footer: React.FC = function() {
  return(
    <div>
      <footer className="footer">
    	 	<div className="wrap">
    	 		<div className="logo">	    	 		
    	 			<a href="/" title="Grid" className="v-a lign">
    	 				<img src={logo} alt="Grid" className="imglogo"/>
    	 			</a>	    	 		
	    	 	</div>    	 		
	    	 	<div className="rss">
    	 			<ul>
    	 				<li>
    	 					<a href="#" className="size"><FontAwesomeIcon icon={faFacebook} /></a>
	 					</li>
    	 				<li>
    	 					<a href="#" className="size"><FontAwesomeIcon icon={faInstagram} /></a>
	 					</li>
    	 				<li>
    	 					<a href="#" className="size"><FontAwesomeIcon icon={faTwitter} /></a>
	 					</li>
    	 				<li>
    	 					<a href="#" className="size"><FontAwesomeIcon icon={faYoutube} /></a>
	 					</li>
    	 			</ul>
    	 		</div>
                <div className="mention">
                    <span>Mentions Légales</span>
                </div>
    	 	</div>
    	</footer>    	 		
    </div>
  );
}

export default Footer;
