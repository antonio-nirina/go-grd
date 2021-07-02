import {gql} from "apollo-server"

export const typeDefs = gql`
	type Times {
		id:ID!
		time:String
	}

	type Notifications {
		uidNotif:String
		uid:String
		email:String
		avatar:String
		username:String
		count:Int
	}

	type User {
		uidNotif:String
	    id: String
	    email: String
	    username:String
  	}

  	input userInput {
  		uidNotif:String
  		uid:String
  		count:Int
	    avatar: String
	    email: String
	    username:String
  	}


	type Query {
  		NotifiUser(user:userInput):User
  		NotifUserConnected(user:userInput):User
  		NotifUserDisconnected(user:userInput):User
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
