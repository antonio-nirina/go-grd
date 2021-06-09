import React,{useMemo, useEffect} from "react"
import { Widget, addResponseMessage } from 'react-chat-widget'
import {useSubscription} from "@apollo/client"
import {RootState} from "../../reducer"

import 'react-chat-widget/lib/styles.css'
import AvatarDefault from "../../assets/image/game-tag.png"
import "./tchat.css"
import {COUNT_SUBSCRIBE} from "../../gql/user/subscription"

const Tchat: React.FC = function() {
	useEffect(() => {
    addResponseMessage('Salut');
  	}, []);

   const handleNewUserMessage = () => {
    
  	};
	// const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	const {loading,error,data}  = useSubscription(COUNT_SUBSCRIBE)
	useMemo(() => {
		if(!loading && !error && data) console.log("data", data)
	},[loading,error,data])
  return(
	<div className="tchat">
	   <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={AvatarDefault}
          title="Microtten"
          subtitle=""
        />
	</div>
  )
}

export default Tchat
