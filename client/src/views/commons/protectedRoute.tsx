import React,{useEffect,useState} from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useSelector } from "react-redux"
import {useSubscription} from "@apollo/client"

import {GetCookie} from "../auth/utils"
import {RootState} from "../../reducer"
import { COUNTER_SUBSCRIBER } from "../../gql/tournament/subscription"
import { NameRoutes } from "../commons/route-list"
import {CheckPartTournament} from "../tournament/common/check-part"
import {GetAcountStorage,SetAcountStorage} from "../../storage/cookieStorage"

interface IProtectedRoute{
  authenticationPath?: string
}
const ProtectedRoute = (
  props: IProtectedRoute & RouteProps
) => {
  		let redirectPath: string = ''
	  	const {loading,error,data}  = useSubscription(COUNTER_SUBSCRIBER)
  		const { authenticationPath, path } = props
		const [routingMatch,setRoutingMatch] = useState<string>("")
		const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  	//  when user is not logged redirect
		useEffect(()=>{
			async function checkPart() {
				if(!loading && !error && data && userConnectedRedux.user.uid && !GetAcountStorage()) {
					const isPart = await CheckPartTournament(data.subscribeCounter.uid,userConnectedRedux.user.uid)
					if(isPart) {
						SetAcountStorage({uidUser:userConnectedRedux.user.uid,statut:true})
						setRoutingMatch(`${NameRoutes.matchTournament}?uid=${data.uid}&tournament=${true}&wagger=${false}`)
					}
				}
			}
			checkPart()
		},[data,error,loading,userConnectedRedux])
		if (!GetCookie()) {
			redirectPath = authenticationPath || '/login'
		}

		if(routingMatch) {
			const renderComponent = () => <Redirect to={{ pathname: routingMatch, state: { from: path } }}  />
			return <Route {...props} component={renderComponent} render={undefined} />
		}

		if (redirectPath !== '') {
			const renderComponent = () => <Redirect to={{ pathname: redirectPath, state: { from: path } }}  />
			return <Route {...props} component={renderComponent} render={undefined} />
		} else {
			return <Route {...props} />
		}
}

export default ProtectedRoute
