import React from "react"
import { Link } from 'react-router-dom'


import "../header/header.css"
import logo from "../../assets/image/logo.png"
import fr from "../../assets/image/fr.png"
import gb from "../../assets/image/gb.png"
import ps from "../../assets/image/playstation.png"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Header: React.FC = function() {
  return(

        <header className="header">
    	 	<div className="wrap">
    	 		<div className="logo">
	    	 		<h1>
	    	 			<a href="/" title="Grid" className="v-align">
	    	 				<img src={logo} alt="Grid" className="imglogo"/>
	    	 			</a>
	    	 		</h1>
	    	 	</div>
    	 		<nav className="navmenu">
    	 			<ul>
    	 				<li>
    	 					<Link to="/ligue"> </Link>
	 					</li>
    	 				<li>
    	 					<Link to="/tournament">Tournois</Link>
	 					</li>
    	 				<li>
    	 					<Link to="/wager">Wagers</Link>
	 					</li>
    	 				<li>
    	 					<Link to="/communaute">Communauté</Link>
	 					</li>
    	 			</ul>
    	 		</nav>
    	 		<div className="tag">

                    <div className="box">
    	 			   <div className="lang">
                        
                            <span><img src={fr} alt="" className="lang" width="28" height="29"/></span>                                               
                            <span><img src={gb} alt="" className="lang" width="28" height="29" style={{display : "none"}}/></span>                                                
                        
                        </div>    	 			
                        <div className="connex">
                            <i className="square"><FontAwesomeIcon icon={faPlus} size="xs"/></i>
                            <i className="relative"><FontAwesomeIcon icon={faUsers} size="lg"/><span className="counter">2</span></i>
                        </div>

                    </div>
                    <div className="gametag">
                        <div className="itemsTag">
                            <div className="bg-game">
                                <p>GameTag</p>
                                <p>
                                <img src={ps} className="itemTag" alt="" width="18" height="14"/>
                                <img src={fr} className="itemTag" alt="" width="18" height="14"/>
                                <i className="itemTag"><FontAwesomeIcon icon={faBars} /></i>
                                </p>
                            </div>
                        </div>
                        <div className="dropdown">
                            <ul>
                                <li><a href="#" title="Profil">Profil</a></li>
                                <li><a href="#" title="Tournois">Tournois</a></li>
                                <li><a href="#" title="Ligues">Ligues</a></li>
                                <li><a href="#" title="Wager">Wager</a></li>
                                <li><a href="#" title="Assistance">Assistance</a></li>
                            </ul>
                        </div>
                    </div>
    	 		</div>
            </div>
		</header>
  );

}
export default Header;
