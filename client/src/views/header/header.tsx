import React from "react"
import "../header/header.css"
import logo from "../../assets/image/logo.png"
import fr from "../../assets/image/fr.png"
import gb from "../../assets/image/gb.png"
import ps from "../../assets/image/playstation.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header: React.FC = function() {    
  return(    

        <header className="header">
    	 	<div className="wrap">
    	 		<div className="logo">
	    	 		<h1>
	    	 			<a href="/" title="Grid" className="v-align">
	    	 				<img src={logo} alt="Grid" className="logo"/>
	    	 			</a>
	    	 		</h1>   
	    	 	</div>
    	 		<nav className="navmenu">
    	 			<ul>
    	 				<li><a href="#">Ligues</a></li>
    	 				<li><a href="#">Tournois</a></li>
    	 				<li><a href="#">Wagers</a></li>
    	 				<li><a href="#">Communauté</a></li>
    	 			</ul>
    	 		</nav>
    	 		<div className="tag">
    	 			<div className="lang">
                        <div className="fr">
                            <img src={fr} alt="" className="lang" width="25" height="auto"/>
                        </div>
                        <div className="fr">
                            <img src={gb} alt="" className="lang" width="25" height="auto" style={{display : "none"}}/>
                        </div>                        
                    </div>
    	 			<div className="search">
                        <i></i>
                    </div>
                    <div className="connex">
                        <i><span></span></i>
                    </div>
                    <div className="gametag">
                        <div className="itemsTag">

                            <img src={ps} className="itemTag" alt="" width="15" height="auto"/>
                            <img src={fr} className="itemTag" alt="" width="15" height="auto"/>
                            <div><FontAwesomeIcon icon="coffee" /></div>
                            <div><FontAwesomeIcon icon={['far', 'coffee']} /></div>
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
