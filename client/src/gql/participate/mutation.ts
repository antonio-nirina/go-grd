import gql from "graphql-tag"

export const SAVED_PART = gql`
mutation createPartMatch($uidUser:String,$date:String,$tournamentUid:String,$teamsUid:String){
		createPartMatch(uidUser:$uidUser,date:$date,tournamentUid:$tournamentUid,teamsUid:$teamsUid)
	}
`

export const LEAVE_PART_TOURNAMENT = gql`
mutation leavePartTournament($uid:String,$userUid:String){
	leavePartTournament(uid:$uid,userUid:$userUid)
	}
`
