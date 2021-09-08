import React from "react"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"

const Stat = function({tournament}:any) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	// const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
	return (
		<div className="state">
			<p>{tournament?.numberParticipate}
				<span>slots</span>
			</p>
			<p>
				0
				<span>
					{
						Translation(userConnectedRedux.user.language).tournament.pending
					}
				</span>
			</p>
			<p>
				0
				<span className="confirm">
					{
						Translation(userConnectedRedux.user.language).tournament.confirmed
					}
				</span>
			</p>
		</div>
	)
}

export default Stat
// {userSingupTournament.tournament.numberPart}
// {userSingupTournament.tournament.confirmed}