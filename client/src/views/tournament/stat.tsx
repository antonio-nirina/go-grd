import React,{useMemo,useState,useEffect} from "react"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {Input} from "../tournament/action/tournamentAction"

const Stat = function({tournament}:any) {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const userSingupTournament = useSelector((state:RootState) => state.tournamentSingin)
	const [partTournament,setPartTournament] = useState<number>(0)
	const [confirmed,setConfirmed] = useState<number>(0)
console.log(tournament)
	useMemo(()=> {
		if(userSingupTournament.tournament.length > 0) {
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
			<p>{tournament?.numberParticipate}
				<span>slots</span>
			</p>
			<p>
				{partTournament}
				<span>
					{
						Translation(userConnectedRedux.user.language).tournament.pending
					}
				</span>
			</p>
			<p>
				{confirmed}
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
