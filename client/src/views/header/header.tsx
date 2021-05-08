import React from "react"
import { Link } from 'react-router-dom'
import {useState} from "react";
import { useSelector } from 'react-redux'

import "../header/header.css"
import logo from "../../assets/image/logo.png"
import fr from "../../assets/image/fr.png"
import gb from "../../assets/image/gb.png"
import ps from "../../assets/image/playstation.png"
import { faBars, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {RootState} from '../../reducer'



const Header: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
    const [showList, setShowList] = useState(false)
    const onShow = function(){
        setShowList(!showList)
    }

  return(
        <header className={Object.keys(userConnectedRedux.user).length == 0 ? "header" : "header connected"}>
    	 	<div className="wrap">
    	 		<div className="logo">
	    	 		<h1>
                    <Link to="/" className="v-align">
                        <img src={logo} alt="Grid" className="imglogo"/>
                    </Link>
	    	 		</h1>
	    	 	</div>
    	 		<nav className="navmenu">
    	 			<ul>
    	 				<li>
    	 					<Link to="/ligue">Ligues</Link>
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
                <div className="bt-container">
                    <Link to="/login" className="btn bg-yellow">Connexion</Link>
                    <Link to="/register" className="btn bg-white">Inscription</Link>
                </div>
    	 		<div className="tag">
                    <div className="box">
    	 			   <div className="lang">
                            <span>
                                <a href="#" title="">
                                    <img src={fr} alt="" className={userConnectedRedux.user.language === "fr" ? "lang show" : "hide" }  width="28" height="29"/>
                                    <img src={gb} alt="" className={userConnectedRedux.user.language === "fr" ? "hide" : "lang gb" } width="28" height="29"/>
                                </a>
                            </span>
                        </div>
                        <div className="connex" >
                            <a href="#">
                                <i className="square">
                                    <FontAwesomeIcon icon={faPlus} size="xs"/>
                                </i>
                            </a>
                            <a href="#"><i className="relative"><FontAwesomeIcon icon={faUsers} size="lg"/><span className="counter">2</span></i></a>
                        </div>
                    </div>
                    <div className="gametag">
                        <div className="itemsTag">
                            <div className="bg-gametag">
                                <p>GameTag</p>
                                <p>
                                <a href="#"><img src={ps} className="itemTag" alt="" width="18" height="14"/></a>
                                <a href="#"><img src={userConnectedRedux.user.language === "fr" ? fr : gb} className="itemTag" alt="" width="15" height="14"/></a>
                                <i className="itemTag drop" onClick={onShow}><FontAwesomeIcon icon={faBars} /></i>
                                </p>
                            </div>
                        </div>
                        <div className={!showList ? "dropdown" :"dropdown show"}>
                            <ul>
                                <li><Link to="/profil">Profil</Link></li>
                                <li><Link to="/tournament">Tournois</Link></li>
                                <li><Link to="/ligue">Ligues</Link></li>
                                <li><Link to="/wager">Wager</Link></li>
                                <li><Link to="/assistant">Assistance</Link></li>
                            </ul>
                        </div>
                    </div>
    	 		</div>
            </div>
		</header>
  )

}
export default Header
