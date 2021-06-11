import React,{useMemo, useState, useCallback, Component, useEffect} from "react"
import { Widget, addResponseMessage } from 'react-chat-widget'


import 'react-chat-widget/lib/styles.css'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import {useSubscription} from "@apollo/client"

import Header from "../header/header"
import {RootState} from "../../reducer"

import Footer from "../footer/footer"
import AvatarDefault from "../../assets/image/game-tag.png"
import Streamer1 from "../../assets/image/streamer1.jpg"
import "./communaute.css"
import {COUNT_SUBSCRIBE} from "../../gql/user/subscription"



const Tchat: React.FC = function() {
	useEffect(() => {
    addResponseMessage('Salut');
  	}, []);

   const handleNewUserMessage = () => {
    
  	};
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	const {loading,error,data}  = useSubscription(COUNT_SUBSCRIBE)
	useMemo(() => {
		if(!loading && !error && data) console.log("data", data)
	},[loading,error,data])
  return(
	<div className="tchat">
	   <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={AvatarDefault}
          title="Utilisateur"
          subtitle=""
        />
	</div>
  )
}

export default Tchat