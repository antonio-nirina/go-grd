import React from "react"
import { Link } from 'react-router-dom'
import { NameRoutes } from "../commons/route-list"


const Sidebar = function() {
    return (
        <div className="menu-left">
            <ul>
                {/*<li id="infos">
                    <Link to="/parametre">Mes infos</Link>
                </li>*/}
                <li id="compte">
                    <Link to={NameRoutes.account}>Mon compte</Link>
                </li>
                <li id="cagnotte">
                    <Link to={NameRoutes.jackpot}>Ma cagnotte</Link>
                </li>
                <li id="jeux">
                    <Link to={NameRoutes.mygames}>Mes jeux</Link>
                </li>
                <li id="team">
                    <Link to={NameRoutes.team}>Mes équipes</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
