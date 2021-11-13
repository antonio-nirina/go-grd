import React,{useState} from "react"
import { useSelector } from "react-redux"

import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import Header from "../header/header"
import Footer from "../footer/footer"
import {League} from "../models/league"
import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
import {dateStringToDY} from "../tools/dateConvert"
import Game from "../../assets/image/game.png"
import HeaderTournament,{HeaderTournamentType} from "../tournament/common/headerTournament"

const WaggersRules: React.FC = function(props:any) {
  	const [league, setLeague] = useState<League>()
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
			<div className="participate league joingame">
				<div className="obj"></div>
				<div className="marg">
				<HeaderTournament {...HeaderProps} />
			<div className="information-game">
			<div className="rules-waggers">
			<div className="txt">
				Les règles : <></>
			</div>
			<div className="tableau">
				<div className="state">
				<p>{""}<span>slots</span></p>
				<p>{""}<span>
					{
					Translation(userConnectedRedux.user.language).tournament.pending
					}
				</span></p>
				<p>{""}<span className="confirm">
					{
					Translation(userConnectedRedux.user.language).tournament.confirmed
					}
				</span></p>
				</div>
				<div className="info-target">
				<div className="line">
					<p>
					{
						Translation(userConnectedRedux.user.language).tournament.start
					}
					</p>
					<span>{dateStringToDY(league?.date)}</span>
				</div>
				<div className="line">
					<p>
					{
						Translation(userConnectedRedux.user.language).tournament.end
					}
					</p>
					<span>{dateStringToDY(league?.deadlineDate)}</span>
				</div>
				<div className="line">
					<p>Participants</p>
					<span>{league?.numberParticipate}</span>
				</div>
				<div className="line">
					<p>Mode</p>
					<span>{league && league.numberTeam > 0 ? `${league?.numberTeam} ON ${league?.numberTeam}` : "1 ON 1" }</span>
				</div>
				</div>
				<div className="btn-container">
				<button className="btn bg-red">
					{
					Translation(userConnectedRedux.user.language).tournament.participate
					}
				</button>
				</div>
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
