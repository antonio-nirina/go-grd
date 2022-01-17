import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import {GetCookie} from "../auth/utils"
import {useSubscription} from "@apollo/client"
import {SUBSCRIBER_REDIRECT} from "../../gql/tournament/subscription"

interface IProtectedRoute{
  authenticationPath?: string
}
const ProtectedRoute = (
  props: IProtectedRoute & RouteProps
) => {
  		let redirectPath: string = ''
	  	const {loading:ldSub,error:erSub,data:dataSub}  = useSubscription(SUBSCRIBER_REDIRECT)
  		const { authenticationPath, path } = props
  	//  when user is not logged redirect

		if (!GetCookie()) {
			redirectPath = authenticationPath || '/login'
		}

		if(ldSub && erSub && dataSub) {
			console.log("dataSub",dataSub)
		}

		if (redirectPath !== '') {
			const renderComponent = () => <Redirect to={{ pathname: redirectPath, state: { from: path } }}  />
			return <Route {...props} component={renderComponent} render={undefined} />
		} else {
			return <Route {...props} />
		}
}

export default ProtectedRoute
