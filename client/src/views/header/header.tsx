import React from "react"
import { Link } from 'react-router-dom'
import {useState} from "react";

import "../header/header.css"
import logo from "../../assets/image/logo.png"
import fr from "../../assets/image/fr.png"
import gb from "../../assets/image/gb.png"
import ps from "../../assets/image/playstation.png"
import { faBars, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

  

const Header: React.FC = function() {
    const [showList, setShowList] = useState(false);
    const onShow = function(){
        setShowList(!showList);
    }
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
    	 					<Link to="/ligue"> Ligues</Link>
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
                        
                            <span><a href="#" title=""><img src={fr} alt="" className="lang" width="28" height="29"/></a></span>                                               
                            <span><a href="#" title=""><img src={gb} alt="" className="lang" width="28" height="29" style={{display : "none"}}/></a></span>                                                
                        
                        </div>    	 			
                        <div className="connex">
                            <a href="#"><i className="square"><FontAwesomeIcon icon={faPlus} size="xs"/></i></a>
                            <a href="#"><i className="relative"><FontAwesomeIcon icon={faUsers} size="lg"/><span className="counter">2</span></i></a>
                        </div>

                    </div>
                    <div className="gametag">
                        <div className="itemsTag">
                            <div className="bg-game">
                                <p>GameTag</p>
                                <p>
                                <a href="#"><img src={ps} className="itemTag" alt="" width="18" height="14"/></a>
                                <a href="#"><img src={fr} className="itemTag" alt="" width="18" height="14"/></a>
                                <i className="itemTag" onClick={onShow}><FontAwesomeIcon icon={faBars} /></i>
                                </p>
                            </div>
                        </div>
                        <div className={!showList ? "dropdown" :"dropdown show"}>
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
