import React from "react"
import {useState} from "react"
import { Link } from "react-router-dom"


import { faUsers, faPowerOff, faTools, faSortUp, faSortDown, faPlus, faSort, faChevronUp, faChevronDown, faChevronRight, faChevronLeft, faSearch, faDesktop, faTrophy, faStar} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import avatar from "../../assets/image/game-tag.png"

import "../admin/admin.css"
import logo from "../../assets/image/gogrind-joystick.png"
const Admin: React.FC = function() {
	const [showList, setShowList] = useState<Boolean>(false)
    const [showMenu, setShowMenu] = useState<Boolean>(false)
	const onShow = function(){
		setShowList(!showList)
	}
    const onShowMenu = function(){
        setShowMenu(!showMenu)
    }
	return(
    <div className="admin">    	
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
        				<div className="column">
        					<div className="response-filter">
        						<div className="response-filter-search">
        							<span className="ant-input-affix-wrapper">
        								<span className="ant-input-prefix">
        									<i><FontAwesomeIcon icon={faSearch} size="lg"/></i>
        								</span>
        								<input placeholder="Rechercher ..." type="text" className="ant-input" />
        							</span>
        						</div>
        						<div className="response-filter-flag">
        							<div className="response-status">
        								<span>
        									<label htmlFor="status">Statut :</label>
        									<input placeholder="" type="text" className="ant-input" onClick={onShow} id="status"/>
        									<i onClick={onShow}><FontAwesomeIcon icon={!showList ? faChevronUp : faChevronDown} size="lg"/></i>
        								</span>
        								
        								<div className={!showList ? "hide-status" :"show-status"}>
        									<p>Tous les status</p>
        									<p>Actif</p>
        									<p>Inactif</p>
        								</div>
        							</div>
        						</div>
        						<div className="response-filter-avis">
        							<p><span>13</span> tournois dont <span>7 </span>actifs</p>
        						</div>        						
        					</div>
        					<div className="create-game">
        						<Link to="/create-tournament"><button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Créer tournois</button></Link>
        					</div>                            
        				</div>                        
        				<div className="body-card">
        					<div className="card-title">
        						<p>Tournois <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>                           
        					<div className="card-title">
        						<div className="card-title">
        						<p>Prix <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        					<div className="card-title">
        						<div className="card-title">
        						<p>Rank <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        					<div className="card-title">
        						<div className="card-title">
        						<p>Statut <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        					<div className="card-title">
        						<div className="card-title">
        						<p>Date de création <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
        					</div>
        					</div>
        				</div>
        				<div className="body-card">
        					<div className="card-result">
        						<p>Apex Legends</p>
        					</div>
        					<div className="card-result">
        						<p>200</p>
        					</div>
        					<div className="card-result">
        						<p>Platinium</p>
        					</div>
        					<div className="card-result">
        						<p>Actif</p>
        					</div>
        					<div className="card-result">
        						<p>2020-11-22 10:42:12</p>
        					</div>
        				</div>
        				<div className="filter-game-result">
        					<div className="result-game-page">
        						<i><FontAwesomeIcon icon={faChevronLeft} size="lg"/></i>
        						<span>1</span>
        						<i><FontAwesomeIcon icon={faChevronRight} size="lg"/></i>
        					</div>        					
        				</div>
        			</div>
        		</div>
			</div>
		</div>
  	</div>
  )
}

export default Admin
