import {gql} from "apollo-server"

export const typeDefs = gql`
	type Times {
		id:ID!
		time:String
	}

	type User {
	    id: String
	    email: String
	    username:String
  	}

  	input userInput {
	    avatar: String
	    email: String
	    username:String
  	}


	type Query {
  		NotifiUser(user:userInput):User
	}

	type Mutation {
	  _empty: String
	}

	type Subscription {
		subscribeCounter:Times
	}
`
