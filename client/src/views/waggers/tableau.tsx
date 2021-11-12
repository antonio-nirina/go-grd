import React from "react"
import {GET_ONE_LEAGUE} from "../../gql/league/query"
import Tree from "./tree"
import Header from "../header/header"
import Footer from "../footer/footer"
import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
// import {RegisterLeagueAction,Input} from "../league/action/leagueAction"
// import {checkInTeam} from "../league/utils"
import HeaderTournament,{HeaderTournamentType} from "../tournament/common/headerTournament"


const Tableau: React.FC = function(props:any) {
  // const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  // const userSingupLeague = useSelector((state:RootState) => state.leagueSingin)

	const HeaderProps:HeaderTournamentType = {
		data:null,
		isTournament:false,
		isWagger:false
	}

    return(
  	<div className="container">
  		<Header />
  		<div className="participate league joingame">
			<div className="marg">
				<HeaderTournament {...HeaderProps} />
				<div className="information-game">
					<div className="tab-container">
						<Tree />
					</div>
				</div>
        		<div className="clear"></div>
				<Footer/>
			</div>
  		</div>
  	</div>
  )
}

export default Tableau
