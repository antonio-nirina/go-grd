import React from "react"
import { Link } from 'react-router-dom'
import {useState} from "react"

import "../header/header.css"
import logo from "../../assets/image/go-grind.png"
import fr from "../../assets/image/fr.png"
import gb from "../../assets/image/gb.png"
import ps from "../../assets/image/playstation.png"
import { faBars, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header0: React.FC = function() {
    const [showList, setShowList] = useState(false)
    const onShow = function(){
        setShowList(!showList)
    }
  return(
        <header className="header ooo">
    	 	<div className="wrap">
    	 		<div className="logo">
	    	 		<div>
					 	<Link to="/" className="v-align">
                            <img src={logo} alt="Grid" className="imglogo"/>
                     	</Link>
	    	 		</div>
	    	 	</div>
    	 		<nav className="navmenu">
    	 			<ul>
    	 				<li>
    	 					<Link to="/league"> Ligues</Link>
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
                    <Link to="/login" className="btn bg-red">Connexion</Link>
                    <Link to="/register" className="btn bg-white">Inscription</Link>
                </div>
    	 		<div className="tag">
                    <div className="box">
    	 			   <div className="lang">
                            <span>
                                <Link to="/" title="">
                                    <img src={fr} alt="" className="lang show" width="28" height="29"/>
                                    <img src={gb} alt="" className="lang gb hide" width="28" height="29"/>
                                </Link>
                            </span>
                        </div>
                        <div className="connex">
                            <Link to="#">
                                <i className="square">
                                    <FontAwesomeIcon icon={faPlus} size="xs"/>
                                </i>
                            </Link>
                            <Link to="#"><i className="relative">
								<FontAwesomeIcon icon={faUsers} size="lg"/>
								<span className="counter">2</span></i>
							</Link>
                        </div>
                    </div>
                    <div className="gametag">
                        <div className="itemsTag">
                            <div className="bg-gametag">
                                <p>GameTag</p>
                                <p>
                                <Link to="/"><img src={ps} className="itemTag" alt="" width="18" height="14"/></Link>
                                <Link to="/"><img src={fr} className="itemTag" alt="" width="15" height="14"/></Link>
                                <i className="itemTag drop" onClick={onShow}>
									<FontAwesomeIcon icon={faBars} />
								</i>
                                </p>
                            </div>
                        </div>
                        <div className={!showList ? "dropdown" :"dropdown show"}>
                            <ul>
                                <li><Link to="/profile">Profil</Link></li>
                                <li><Link to="/tournament" title="Tournois">Tournois</Link></li>
                                <li><Link to="/ligue" title="Ligues">Ligues</Link></li>
                                <li><Link to="/waggers" title="Wager">Wager</Link></li>
                                <li><Link to ="/assistance" title="Assistance">Assistance</Link></li>
                            </ul>
                        </div>
                    </div>
    	 		</div>
            </div>
		</header>
  )

}
export default Header0
