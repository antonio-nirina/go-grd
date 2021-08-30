import gql from "graphql-tag"

export const SAVED_PART = gql`
mutation createPartMatch($uidUser:String,$date:String,$tournamentUid:String,$leagueUid:String,$teamsUid:uidTeamsInput){
		createPartMatch(uidUser:$uidUser,date:$date,tournamentUid:$tournamentUid,leagueUid:$leagueUid,teamsUid:$teamsUid)
	}
`
