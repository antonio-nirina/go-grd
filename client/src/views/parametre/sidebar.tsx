import React from "react"
import { Link } from 'react-router-dom'

const Sidebar = function() {
    return (
        <div className="menu-left">
            <ul>
                <li id="infos">
                    <Link to="/parametre">Mes infos</Link>
                </li>
                <li id="cagnotte">
                    <Link to="/jackpot">Ma cagnotte</Link>
                </li>
                <li id="jeux">
                    <Link to="/mygames">Mes jeux</Link>
                </li>
                <li id="team">
                    <Link to="/team">Mes équipes</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar