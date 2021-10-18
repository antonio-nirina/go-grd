import React from "react"
import { Link } from 'react-router-dom'

const Sidebar = function() {
    return (
        <div className="menu-left">
            <ul>
                <li>
                    <Link to="/parametre">Mes infos</Link>
                </li>
                <li>
                    <Link to="/jackpot">Ma cagnotte</Link>
                </li>
                <li className="active_link">
                    <Link to="/mygames">Mes jeux</Link>
                </li>
                <li>
                    <Link to="#">Assistance</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar