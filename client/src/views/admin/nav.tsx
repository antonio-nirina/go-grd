import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { faPowerOff, faSortUp, faSortDown} from "@fortawesome/free-solid-svg-icons"
import {RootState} from "../../reducer"
import avatar from "../../assets/image/game-tag.png"

const Nav = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
    const [showMenu, setShowMenu] = useState<Boolean>(false)

    const onShowMenu = function(){
        setShowMenu(!showMenu)
    }

	return (
		<div id="profile-name" className="profil-name">
            <img src={userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar : avatar} alt="" />
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
	)
}

export default Nav
