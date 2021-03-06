import React from "react"
import { Link } from 'react-router-dom'

import { faInstagram, faTwitter, faFacebook, faYoutube} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import logo from "../../assets/image/go-grind.png"
import Fr from "../../assets/image/flag1.png"
import Ang from "../../assets/image/flag2.png"
import "../../assets/css/style.css"
import "../footer/footer.css"


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
    	 					<Link to="/" className="size"><FontAwesomeIcon icon={faFacebook} /></Link>
	 					</li>
    	 				<li>
    	 					<Link to="/" className="size"><FontAwesomeIcon icon={faInstagram} /></Link>
	 					</li>
    	 				<li>
    	 					<Link to="/" className="size"><FontAwesomeIcon icon={faTwitter} /></Link>
	 					</li>
    	 				<li>
    	 					<Link to="/" className="size"><FontAwesomeIcon icon={faYoutube} /></Link>
	 					</li>
    	 			</ul>
    	 		</div>
                <div className="mention">
                    <img src={Fr} width="25" height="25" alt="language-fr" />
                    <img src={Ang} width="25" height="25" alt="language-en"/>
                    <span>Mentions Légales</span>
                </div>
    	 	</div>
    	</footer>
    </div>
  );
}

export default Footer;
