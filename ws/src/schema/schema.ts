import {gql} from "apollo-server"

export const typeDefs = gql`
	type Times {
		id:ID!
		time:String
	}

	type Notifications {
		uidNotif:String
		uid:String
		uidReq:String
		email:String
		avatar:String
		username:String
		count:Int
	}

	type User {
		uidNotif:String
	    uid: String
	    uidReq:String
	    email: String
	    username:String
	    avatar: String
	    isConnected:Int
  	}

  	input userInput {
  		uidNotif:String
  		uid:String
  		uidReq:String
  		count:Int
	    avatar: String
	    email: String
	    username:String
	    isConnected:Int
  	}

	input CounterTypeInput {
		uid:String
		sec:String
		min:String
		hours:String
		day:Int
		month:Int
	}


	type Query {
  		NotifiUser(user:userInput):User
  		NotifUserConnected(user:userInput):User
  		NotifUserDisconnected(user:userInput):User
		RunTaskTournament(counter:CounterTypeInput):String
	}

	type Mutation {
	  _empty: String
	}

	type Subscription {
		subscribeCounter:Times
		subscribeNotifications:Notifications
		subscribeConnected:User
		subscribeDisConnected:User
	}
`
