import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { faHandsHelping, faUsers, faTools, faDesktop, faTrophy, faUser, faStar, faGamepad, faHome, faPowerOff, faSortUp, faSortDown} from "@fortawesome/free-solid-svg-icons"
import {useHistory } from "react-router-dom"
import {RootState} from "../reducer"
import avatar from "../assets/image/game-tag.png"
import {removeDataUser} from "../auth/action/userAction"

const Nav = function() {
	const history = useHistory()
	const dispatch = useDispatch()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
    const [showMenu, setShowMenu] = useState<Boolean>(false)

    const onShowMenu = function(){
        setShowMenu(!showMenu)
    }

    const onDeconnect = function() {
		dispatch(removeDataUser())
		history.push("/admin/login")
	}

	const backFront = function() {
		if(process.env.REACT_APP_FRONT_URL) window.location.href = process.env.REACT_APP_FRONT_URL
	}

	return (
		<div id="profile-name" className="profil-name">
            <img src={userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar : avatar} alt="" />
            <div className="d-md-inline-block" onClick={onShowMenu}>
                Administrateur
                <div className= {!showMenu ? "hide-drpdwn-menu" :"show-drpdwn-menu"}>
                    <ul>
                        <li><Link to="#"><span onClick={backFront} style={{"cursor":"pointer"}}>Retour vers le site</span></Link></li>
                        <div className="mobile-version">
                            <li><Link to="/"><i><FontAwesomeIcon icon={faDesktop} size="lg"/></i>Tableau de bord</Link></li>
                            <li><Link to="/admin/tournament"><i><FontAwesomeIcon icon={faTrophy} size="lg"/></i>Tournois</Link></li>
                            <li><Link to="/admin/communaute"><i><FontAwesomeIcon icon={faTools} size="lg"/></i>Communaute</Link></li>
                            <li><Link to="/admin/league"><i><FontAwesomeIcon icon={faUsers} size="lg"/></i>Ligues</Link></li>
                            <li><Link to="/admin/wagger"><i><FontAwesomeIcon icon={faStar} size="lg"/></i>Waggers</Link></li>
                            <li><Link to="/admin/list-game"><i><FontAwesomeIcon icon={faGamepad} size="lg"/></i>Jeux</Link></li>
                            <li><Link to="/admin/users"><i><FontAwesomeIcon icon={faUser} size="lg"/></i>User</Link></li>
                            <li><Link to="/admin/set-assist"><i><FontAwesomeIcon icon={faHandsHelping} size="lg"/></i>Assistance</Link></li>
                            <li><Link to="/admin/set-home"><i><FontAwesomeIcon icon={faHome} size="lg"/></i>Accueil</Link></li>
                        </div>
                        <li onClick={onDeconnect} style={{"cursor":"pointer"}}>
                            <Link to="#">
	                    	<i className="power">
	                    		<FontAwesomeIcon icon={faPowerOff} size="lg"/>
	                    	</i>
	                    	Se déconnecter
                            </Link>
                    	</li>
                    </ul>
                </div>
            </div>
            <i className="poweroff" onClick={onShowMenu}><FontAwesomeIcon icon={!showMenu ? faSortUp : faSortDown} size="lg"/></i>
        </div>
	)
}

export default Nav
