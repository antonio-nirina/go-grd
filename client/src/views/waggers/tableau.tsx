import React,{useEffect,useState} from "react"
import {useQuery} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"
import {  toast } from 'react-toastify'

import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {GET_ONE_LEAGUE} from "../../gql/league/query"
import Tree from "./tree"
import Header from "../header/header"
import Footer from "../footer/footer"
import {League} from "../models/league"
import "../tournament/info.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
import {RegisterLeagueAction,Input} from "../league/action/leagueAction"
import {checkInTeam} from "../league/utils"
import fr from "../../assets/image/fr.png"
import discord from "../../assets/image/discord.png"


const Tableau: React.FC = function(props:any) {
  const dispatch = useDispatch()
  const params = new URLSearchParams(props.location.search)
  const uid:string|null = params.get("uid")
  const [league, setLeague] = useState<League>()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  // const userSingupLeague = useSelector((state:RootState) => state.leagueSingin)
  const {loading,error,data}  = useQuery(GET_ONE_LEAGUE, {
      variables: {
        uid:uid,
      },
  })

  useEffect(() => {
    if(!loading && !error && data) {
      setLeague(data.FindOneLeague)
    }

    const date1 = new Date()
    const date2 = new Date(data?.FindOneLeague.deadlineDate)
    const diff = (date2.getTime() - date1.getTime())/1000/60

    if (diff < 10 || diff <= 0) setIsOpen(false)

  },[loading,error,data])
  let message:string = Translation(userConnectedRedux.user.language).tournament.notify ?? ""

  const notify = async function(){
    const param:Input = {
      uidLeague:uid,
      userUid:userConnectedRedux.user.uid,
      part:true
    }

    if(league?.isTeam) {
      const check = await checkInTeam(userConnectedRedux.user.uid)
      if(check) {
        dispatch(RegisterLeagueAction(param))
      }
      if(!check) message = Translation(userConnectedRedux.user.language).tournament.notifyError
    }

    toast(message,{
      className: 'light-blue',
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  }
  
    return(
  	<div className="container">
  		<Header />
  		<div className="participate league joingame">
			<div className="marg">
				<div className="part">
            <div className="header-part">
              <img className="item-left" src="#" alt="" />
              <div className="join-title">
                <h2>Waggers</h2>
                <div className="img-bot-setting">
                  <p><img src={discord} alt=""/></p>
                  <p><img src={fr} alt=""/></p>
                </div>
              </div>
            </div>            
        </div>
        <div className="bar-menu-top">
          <li><Link to="/joingame">Général</Link></li>
          <li><Link to="/tableau" className="active">Tableau</Link></li>
          <li><Link to="/waggers-rules">Règles</Link></li>
        </div>
        <div className="information-game">          
          <div className="tab-container">
            <Tree />
          </div>
        </div>        
        <div className="clear"></div>        
				<Footer/>
  			</div>
  		</div>
  	</div>
  )
}

export default Tableau
