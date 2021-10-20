import React,{useEffect} from "react"
import {useQuery} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"

import Header from "../../header/header"
import Ahead from "../ahead/ahead"
import Game from "../game/game"
import Service from "../service/service"
import Join from "../../join/join"
import {XboxProfil,TwitchUserConnected} from "../../../gql/user/auth"
import Footer from "../../footer/footer"
import {getAccessToken,getAccessTokenTwitch} from "../../../storage/tokenStorage"
import {UserType,sendProfilXboxOrPsn,sendUserConnectedTwitchAction} from "../../auth/action/userAction"
import {RootState} from "../../../reducer"
import "../home/index.css"
import "../../../assets/css/style.css"
type paramToken = {
	token:string
}
const GetProfilUser = function ({token}:paramToken) {
	const dispatch = useDispatch()
	const {loading,error,data} = useQuery(XboxProfil, {
		variables: {
			accessToken:token
		},
	})
	useEffect(() => {
		if(!loading && !error && data) {
			const name:Array<string> = data.GetProfilUserXbox.DisplayName.split(" ")
			const user:UserType = {
				uid:"",
				username:name[0],
				email:data.GetProfilUserXbox.userPrincipalName,
				avatar:"",
				firstname:name[0],
				language:data.GetProfilUserXbox.PreferredLanguage? data.GetProfilUserXbox.PreferredLanguage : "fr",
				lastname:name[1],
				id:data.GetProfilUserXbox.Id,
				created:"",
				birtDate:"", 
				country:""
			}
			dispatch(sendProfilXboxOrPsn(user))
		}
	},[loading,error,data,dispatch])
	return (
		<></>
	)
}

const GetProfilTwitchuser = function({token}:paramToken) {
	const dispatch = useDispatch()
	const {loading,error,data} = useQuery(TwitchUserConnected, {
		variables: {
			accessToken:token
		},
	})
	useEffect(() => {
		if(!loading && !error && data) {
			const user:UserType = {
				uid:"",
				username:data.GetAccessUserTwitchApi.login,
				email:data.GetAccessUserTwitchApi.email,
				avatar:data.GetAccessUserTwitchApi.profile_image_url,
				firstname:"",
				language: "fr",
				lastname:"",
				id:data.GetAccessUserTwitchApi.Id,
				created:data.GetAccessUserTwitchApi.created_at,
				birtDate:"", 
				country:""
			}
			dispatch(sendUserConnectedTwitchAction(user))
		}
	},[loading,error,data,dispatch])
	return (
		<></>
	)
}

const Index: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	useEffect(() => {
		const params = window.location.search

		if (window.opener) {
			window.opener.postMessage(params,process.env.REACT_REACT_APP_URI)
			window.close()
		}
	},[])
  return(
    <div className="home version">
      <div className="container">
	      <Header />
	      <div className="main">
	        <div className="slider">
	        	<Ahead/>
				{getAccessToken() && Object.keys(userConnectedRedux.user).length === 0 ?
				 <GetProfilUser token={getAccessToken()} /> 
				 : 
				 getAccessTokenTwitch() && Object.keys(userConnectedRedux.user).length === 0 ? 
				 <GetProfilTwitchuser token={getAccessTokenTwitch()}  /> : 
				 
				 <></>
				}
	        </div>
	      </div>
	      <Service/>
	      <Game/>	      
	      {Object.keys(userConnectedRedux.user).length === 0 ? <Join/> : null}
	      <Footer/>
	  </div>
    </div>
  )
}

export default Index
