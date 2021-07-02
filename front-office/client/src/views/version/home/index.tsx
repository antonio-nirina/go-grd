import React,{useEffect} from "react"
import {useQuery} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"

import Header from "../header/header"
import Slider from "../slider/slider"
import Game from "../game/game"
import Service from "../service/service"
import Join from "../join/join"
import {XboxProfil} from "../../../gql/user/auth"
import Footer from "../footer/footer"
import {getAccessToken} from "../../../storage/tokenStorage"
import {UserType,sendProfilXboxOrPsn} from "../../auth/action/userAction"
import {RootState} from "../../../reducer"
import "../home/index.css"
import "../../../assets/css/style.css"

const GetProfilUser = function ({token}:any) {
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
				created:""
			}
			dispatch(sendProfilXboxOrPsn(user))
		}
	},[loading,error,data])
	return (
		<></>
	)
}

const Index: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	useEffect(() => {
		const params = window.location.search

		if (window.opener) {
			window.opener.postMessage(params,"")
		   	window.close()
		}
	},[])
  return(
    <div className="home version">
      <div className="container">
	      <Header />
	      <div className="main">
	        <div className="slider">
	        	<Slider/>
				{getAccessToken() && Object.keys(userConnectedRedux.user).length === 0 ? <GetProfilUser token={getAccessToken()} /> : <></>}
	        </div>	        
	      </div>
	      <Game/>
	      <Service/>   
	      <Join/>
	      <Footer/>
	  </div>
    </div>
  )
}

export default Index
