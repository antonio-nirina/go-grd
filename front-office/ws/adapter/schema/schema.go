package schema

func Schema() string {
	sch := `
		schema {
			subscription: Subscription
			mutation: Mutation
			subscription: Subscription
		}

		type Query {
			hello: String!
		}

		type Subscription {
			helloSaid(): HelloSaidEvent!
		}

		type Mutation {
			sayHello(msg: String!): HelloSaidEvent!
		}

		type HelloSaidEvent {
			id: String!
			msg: String!
		}

	`

	return sch
}