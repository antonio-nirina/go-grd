import React  from "react"
import { useSelector } from "react-redux"

import {RootState} from "../../reducer"
// import {Translation} from "../../lang/translation"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../tournament/info.css"
import "../../assets/css/style.css"
// import {dateStringToDY} from "../tools/dateConvert"
import HeaderTournament,{HeaderTournamentType} from "../tournament/common/headerTournament"

const WaggersRules: React.FC = function(props:any) {
  	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  	// const userSingupLeague = useSelector((state:RootState) => state.leagueSingin)
	const HeaderProps:HeaderTournamentType = {
		data:null,
		isTournament:false,
		isWagger:false
	}
    return(
		<div className="container">
			<Header />
			<div className="participate league joingame rule">
				<div className="obj"></div>
				<div className="marg">
				<HeaderTournament {...HeaderProps} />
			<div className="information-game">
				<div className="rules-container">
					<div className="info_sup">
						<h3>Information supplémentaire</h3>
						<p>Au début du tournoi, n'oubliez pas de rafraîchir votre page pour faire apparaître le 'bouton prêt' vous permettant d'entrer dans le tournoi</p>
					</div>
					<div className="info_sup">
						<h3>Aucune règle</h3>
					</div>
				</div>
			</div>
			<div className="clear"></div>
			<Footer/>
			</div>
			</div>
		</div>
  	)
}

export default WaggersRules
