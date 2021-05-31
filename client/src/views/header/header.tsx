import React,{useState} from "react"
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux"
import {useHistory } from "react-router-dom"

import "../header/header.css"
import logo from "../../assets/image/logo.png"
import avatar from "../../assets/image/game-tag.png"
import fr from "../../assets/image/fr.png"
import gb from "../../assets/image/gb.png"
import ps from "../../assets/image/playstation.png"
import { faBars, faPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {removeDataUser} from "../auth/action/userAction"


const Header: React.FC = function() {
	const history = useHistory()
	const dispatch = useDispatch()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
    const [showList, setShowList] = useState<Boolean>(false)
	const [isDeconnect, setIsDeconnect] = useState<Boolean>(false)
    const onShow = function(){
        setShowList(!showList)
    }

	const onDeconnect = function() {
		dispatch(removeDataUser())
		setIsDeconnect(true)
		history.push("/")
	}

  return(
        <header className={isDeconnect || Object.keys(userConnectedRedux.user).length === 0 ? "header" : "header connected"}>
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
    	 					<Link to="/ligue">
								{
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).header.leagues
									:
									Translation("fr").header.leagues
								}
							</Link>
	 					</li>
    	 				<li>
    	 					<Link to="/tournament">
								{
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).header.tournaments
									:
									Translation("fr").header.tournaments
								}
							</Link>
	 					</li>
    	 				<li>
    	 					<Link to="/wager">
								{
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).header.wagers
									:
									Translation("fr").header.wagers
								}
							</Link>
	 					</li>
    	 				<li>
    	 					<Link to="/communaute">
							 	{
									Object.keys(userConnectedRedux.user).length > 0 ?
									Translation(userConnectedRedux.user.language).header.community
									:
									Translation("fr").header.community
								}
							</Link>
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
                                <>
                                    <img src={fr} alt="" className={userConnectedRedux.user.language && userConnectedRedux.user.language === "fr" ? "lang show" : "hide" }  width="28" height="29"/>
                                    <img src={gb} alt="" className={userConnectedRedux.user.language && userConnectedRedux.user.language === "fr" ? "hide" : "lang gb" } width="28" height="29"/>
                                </>
                            </span>
                        </div>
                        <div className="connex" >
                            <>
                                <i className="square">
                                    <FontAwesomeIcon icon={faPlus} size="xs"/>
                                </i>
                            </>
                            <><i className="relative">
								<FontAwesomeIcon icon={faUsers} size="lg"/>
								<span className="counter">2</span></i>
							</>
                        </div>
                    </div>
                    <div className="gametag">
                        <div className="itemsTag">
                            <div className="bg-gametag">
                                <p><img src={avatar} className="avatar"/></p>
                                <p className="user">{userConnectedRedux.user.username}</p>
                                <p className="user-setting">
									<><img src={ps} className="itemTag" alt="" width="18" height="14"/></>
									<><img src={userConnectedRedux.user.language && userConnectedRedux.user.language === "fr" ? fr : gb} className="itemTag" alt="" width="15" height="14"/></>
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
								<li style={{"cursor":"pointer"}} onClick={onDeconnect}>Deconnexion</li>
                            </ul>
                        </div>
                    </div>
    	 		</div>
            </div>
		</header>
  )

}
export default Header
