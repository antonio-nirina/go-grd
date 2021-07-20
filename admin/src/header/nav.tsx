import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector,useDispatch } from "react-redux"

import { faPowerOff, faSortUp, faSortDown} from "@fortawesome/free-solid-svg-icons"
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
                        <li><span onClick={backFront} style={{"cursor":"pointer"}}>Retour vers le site</span></li>
                        <li onClick={onDeconnect} style={{"cursor":"pointer"}}>
	                    	<i className="power">
	                    		<FontAwesomeIcon icon={faPowerOff} size="lg"/>
	                    	</i>
	                    	Se déconnecter
                    	</li>
                    </ul>
                </div>
            </div>
            <i className="poweroff" onClick={onShowMenu}><FontAwesomeIcon icon={!showMenu ? faSortUp : faSortDown} size="lg"/></i>
        </div>
	)
}

export default Nav
