import React from "react"
import { Link } from 'react-router-dom'

// import { useSelector } from "react-redux"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
// import {RootState} from "../../reducer"

const Jackpot: React.FC = function() {
	// const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
	<div className="leaderboard settings jackpot">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt">
					<h2>Paramètres</h2>
					<div className="title-lead">
						<div className="menu-left">
							<ul>
								<li>
									<Link to="/parametre">Mes infos</Link>
								</li>
								<li className="active_link">
									<Link to="/jackpot">Ma cagnotte</Link>
								</li>
								<li>
									<Link to="/mygames">Mes jeux</Link>
								</li>
								<li>
									<Link to="#">Assistance</Link>
								</li>
							</ul>
						</div>
						<div className="personal">
							<div className="historical">
								<h3>Historique de transactions</h3>
								<div className="total">
									<span>Total</span>
									<span>Date</span>
								</div>
								<p>Pas de transaction</p>
							</div>
							<div className="pay">
								<h3>Solde actuel</h3>
								<div className="credit">
									<span>0 G-coins</span>
								</div>
								<button className="btn bg-red">Acheter des G-coins</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	);
}

export default Jackpot;
