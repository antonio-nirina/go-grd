import React from "react"
import ReactDOM from 'react-dom'
import logo from "../../assets/image/logo.png"
import "../../assets/css/style.css"
import "../footer/footer.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import {fab, faTwitterSquare, faFacebook, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import {  faFacebookF , } from '@fortawesome/free-brands-svg-icons';
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
    	 					<a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
	 					</li>
    	 				<li>
    	 					<a href="#"></a>
	 					</li>
    	 				<li>
    	 					<a href="#"></a>
	 					</li>
    	 				<li>
    	 					<a href="#"></a>
	 					</li>
    	 			</ul>
    	 		</div>
    	 	</div>
    	</footer>    	 		
    </div>
  );
}

export default Footer;
