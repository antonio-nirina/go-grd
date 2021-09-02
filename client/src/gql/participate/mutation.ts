import gql from "graphql-tag"

export const SAVED_PART = gql`
mutation createPartMatch($uidUser:String,$date:String,$tournamentUid:String,$teamsUid:uidTeamsInput){
		createPartMatch(uidUser:$uidUser,date:$date,tournamentUid:$tournamentUid,teamsUid:$teamsUid)
	}
`

export const LEAVE_PART_TOURNAMENT = gql`
mutation removePartTournament($uid:String){
		removePartTournament(uid:$uid)
	}
`
