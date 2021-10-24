import React,{useMemo,useState} from "react"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {Input} from "../tournament/action/tournamentAction"

const Stat = function({tournament}:any) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
	const [partTournament,setPartTournament] = useState<number>(0)
	const [confirmed,setConfirmed] = useState<number>(0)

	useMemo(()=> {
		if(userSingupTournament.tournament.length > 0 && tournament) {
			userSingupTournament.tournament.forEach(function(e:Input) {
				if(e.uidTournament === tournament.uid && e.userUid === userConnectedRedux.user.uid) {
					setPartTournament(e.numberPart)
					setConfirmed(e.confirmed)
				}
			})
		}
	},[userSingupTournament,userConnectedRedux,tournament,setPartTournament,setConfirmed])
	return (
		<div className="state">
			<p>
				<strong>{tournament?.numberParticipate}</strong>
				<span>slots</span>
			</p>
			<p>
				<strong>{partTournament}</strong>
				<span>
					{
						Translation(userConnectedRedux.user.language).tournament.pending
					}
				</span>
			</p>
			<p>
				<strong>{confirmed}</strong>
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
