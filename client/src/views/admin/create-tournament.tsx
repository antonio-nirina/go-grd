import React from "react"
import {useState} from "react"
import { Link } from "react-router-dom"


import { faUsers, faPowerOff, faTools, faSortUp, faSortDown, faPlus, faDesktop, faTrophy, faStar} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import avatar from "../../assets/image/game-tag.png"

import "../admin/admin.css"
import logo from "../../assets/image/gogrind-joystick.png"
const CreateTournament: React.FC = function() {	
    const [showMenu, setShowMenu] = useState<Boolean>(false)	
    const onShowMenu = function(){
        setShowMenu(!showMenu)
    }
	return(
    <div className="admin create-tournament">    	
		<div className="layout-container">
			<aside className="main-sidebar ps">
				<Link to ="/" className="logo">
					<img src={logo} alt="logo" />
				</Link>
				<ul>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faDesktop} size="lg"/></i>
							<span>Tableau de bord</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faTrophy} size="lg"/></i>
							<span>Tournois</span>
						</Link>
					</li>
                    <li>
                        <Link to="#">
                            <i><FontAwesomeIcon icon={faTools} size="lg"/></i>
                            <span>Modifier règles</span>
                        </Link>
                    </li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faUsers} size="lg"/></i>
							<span>Ligues</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<i><FontAwesomeIcon icon={faStar} size="lg"/></i>
							<span>Waggers</span>
						</Link>
					</li>					
				</ul>
			</aside>
			<div className="content-wrapper">
				<nav className="navbar">
          			<div></div>
      				<div id="profile-name" className="profil-name">
      					
                        <img src={avatar} alt="" /> 
                		<div className="d-md-inline-block" onClick={onShowMenu}>
                			Administrateur
                            <div className= {!showMenu ? "hide-drpdwn-menu" :"show-drpdwn-menu"}>
                                <ul>
                                    <li><Link to ="/">Retour vers le site</Link></li>
                                    <li><Link to ="#">Profil</Link></li>                                    
                                    <li><Link to ="#"><i className="power"><FontAwesomeIcon icon={faPowerOff} size="lg"/></i> Se déconnecter</Link></li>
                                </ul>
                            </div>
                		</div>                            
						<i className="poweroff" onClick={onShowMenu}><FontAwesomeIcon icon={!showMenu ? faSortUp : faSortDown} size="lg"/></i>
      				
      				</div>
        		</nav>
        		<div className="main-content">
        			<div className="body-content">
        				<div className="column-tournament">
        					<div className="title">
                                <h1>Création d'un tournois</h1>
                            </div>
        					<div className="create-tournament-game">
        						<Link to="/admin"><button className="btn bg-white"> Annuler</button></Link>
                                <button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
        					</div>
                            <div className="setting-tournament">
                                <div className="field">
                                    <div className="group-input">
                                        <form>
                                            <select id="jeux">
                                                <option value="">Selectionnez le jeux...</option>
                                                <option value="0">Apex Legends</option>
                                                <option value="1">League of Legends</option>
                                                <option value="2">Rocket League</option>
                                            </select>
                                            <input type ="text" placeholder="Date" />                                       
                                            <select id="platform">
                                                <option value="">Selectionnez les plateformes...</option>
                                                <option value="0">Playstation</option>
                                                <option value="1">Xbox</option>                                            
                                            </select>
                                            <textarea placeholder="Description..."></textarea>
                                            <div className="input-group">
                                                <input type="number" placeholder="Nombre de participant"/>
                                                <input type="number" placeholder="Nombre d'equipes" className="no-margin"/>
                                            </div>
                                            <div className="input-group">
                                                <input type="number" placeholder="Prix"/>
                                                <input type="number" placeholder="Frais de participation" className="no-margin"/>
                                            </div>                                            
                                            <input type="text" placeholder="Deadline"/>
                                            <button className="btn bg-red">Modifier les règles</button>
                                        </form>
                                    </div>                                    
                                </div>
                            </div>
        				</div>                        
        			</div>
        		</div>
			</div>
		</div>
  	</div>    
  )
}

export default CreateTournament
