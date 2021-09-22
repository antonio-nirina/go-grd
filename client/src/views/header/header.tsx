import React,{useState,useMemo} from "react"
import { Link } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import {useHistory } from "react-router-dom"
import {useQuery,useSubscription,useMutation} from "@apollo/client"

import "../header/header.css"
import logo from "../../assets/image/go-grind.png"
import avatar from "../../assets/image/game-tag.png"
import fr from "../../assets/image/fr.png"
import gb from "../../assets/image/gb.png"
import WhiteJoystick from "../../assets/image/white-joystick.png"
import { faBars, faBell, faUsers, faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {removeDataUser} from "../auth/action/userAction"
import {GET_ALL_NOTIFICATIONS} from "../../gql/notifications/query"
import Notifications from "./notificationFriend"
import {NOTIFICATIONS_SUBSCRIBE} from "../../gql/user/subscription"

import {Deconnect} from "../../gql/user/auth"

export interface Notif  {
	type:number,
	uid:string,
	user:{
		uid:string,
		email: string,
		username: string,
		avatar: string,
	}
}


const Header: React.FC = function() {
	const history = useHistory()
	const dispatch = useDispatch()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [showList, setShowList] = useState<Boolean>(false)
	const [notification, setNotification] = useState<Number>(0)
	const [showNotif, setShowNotif] = useState<Boolean>(false)
	const [isDeconnect, setIsDeconnect] = useState<Boolean>(false)
	const [dataNotifications, setDataNotifications] = useState<Array<any>>([])
	const {loading:subLoading,error:errSub,data:subData}  = useSubscription(NOTIFICATIONS_SUBSCRIBE)
	const {loading,error,data} = useQuery(GET_ALL_NOTIFICATIONS, {
		variables: {
			idUser: userConnectedRedux.user.uid
		},
	})

	const [deconnect] = useMutation(Deconnect)

	const onShow = function(){
		setShowList(!showList)
	}
	const onShowNotif = async function(){
		if(dataNotifications.length > 0) {
			setShowNotif(!showNotif)
			setNotification(0) // update notification statut true
		}

	}

	const onDeconnect = async function() {
		try {
			await deconnect({ variables: { id: userConnectedRedux.user.uid }})
		} catch (e) {
			console.log(e)
		}

		dispatch(removeDataUser())
		setIsDeconnect(true)
		history.push("/")
	}

	const backAdmin = function() {
		if(process.env.REACT_APP_URL_ADMIN) window.location.href = process.env.REACT_APP_URL_ADMIN
	}

	useMemo(() => {
		let isSubscribed:boolean = true
		let array:Array<Notif> = []
		let notif:Notif
		if(!loading && !error && data) {
			let count:number = 0

			if(data.GetAllNotifications.length > 0) {
				setDataNotifications(data.GetAllNotifications)
				data.GetAllNotifications.forEach(function(elemnt:any) {
					if(!elemnt.statut) count++
					if(elemnt.type === 0 && !elemnt.statut) {
						notif = {
							type:0,
							uid:elemnt.uid,
							user:{
								uid:elemnt.userRequest.uid,
								email: elemnt.userRequest.email,
								username: elemnt.userRequest.username,
								avatar: elemnt.userRequest.avatar
							}
						}
						array.push(notif)
					}
				})
			}
			setNotification(count)
		}

		if(!subLoading && !errSub && subData) {
			if(subData.subscribeNotifications.uid === userConnectedRedux.user.uid) {
				notif = {
					type:0,
					uid:subData.subscribeNotifications.uidNotif,
					user:{
						uid:subData.subscribeNotifications.uidReq,
						email: subData.subscribeNotifications.email,
						username: subData.subscribeNotifications.username,
						avatar: subData.subscribeNotifications.avatar
					}
				}
				array.push(notif)
				setNotification(subData.subscribeNotifications.count)
			}
		}
		setDataNotifications(array)
		return function(){
			isSubscribed = false
			console.log(isSubscribed)
		}
	},[loading,error,data,subLoading,errSub,subData,userConnectedRedux])

	const friendOnlineHandler = function() {
		alert("okok")
	}

  return(
		<header className={isDeconnect || Object.keys(userConnectedRedux.user).length === 0 ? "header" : "header connected"}>
			<div className="wrap">
				<div className="logo">
					<h1>
						<Link to="/" className="v-align">
							<img src={logo} alt="Grid" className="imglogo"/>
						</Link>
					</h1>
				</div>
				<nav className="navmenu">
					<ul>
						<li>
							<Link to="/tournament">
								{
									Translation(userConnectedRedux.user.language).header.tournaments
								}
							</Link>
						</li>
						<li>
							<Link to="/waggers">
								{
									Translation(userConnectedRedux.user.language).header.wagers
								}
							</Link>
						</li>
						<li>
							<Link to="/communaute">
								{
									Translation(userConnectedRedux.user.language).header.community
								}
							</Link>
						</li>
						<li>
							<Link to="/assistance">
								{
									Translation(userConnectedRedux.user.language).header.assistance
								}
							</Link>
						</li>
					</ul>
				</nav>
				<div className="bt-container">
					<Link to="/login" className="btn bg-red">Connexion</Link>
					<Link to="/register" className="btn bg-white">Inscription</Link>
				</div>
				<div className="tag">
					<div className="box">
					   {/*
					   <div className="lang">
							<span>
								<>
									<img src={fr} alt="" className={userConnectedRedux.user.language && userConnectedRedux.user.language === "fr" ? "lang show" : "hide" }  width="28" height="29"/>
									<img src={gb} alt="" className={userConnectedRedux.user.language && userConnectedRedux.user.language === "fr" ? "hide" : "lang gb" } width="28" height="29"/>
								</>
							</span>
						</div>
					   */}
						<div className="connex" style={{"cursor":"pointer"}}>
							<i className="square" onClick={onShowNotif} >
								<FontAwesomeIcon icon={faPlus} onClick={friendOnlineHandler} />
								<span className="count">2</span>
								<span className={notification > 0 ? "number" : ""}>{notification > 0 ? notification : ""}</span>
							</i>
							<div className={!showNotif ? "notification" :"notification show"}>
								{dataNotifications.length > 0 && dataNotifications[0].type === 0
									?
									(<Notifications data={dataNotifications} />)
									: <></>
								}
							</div>
							<>
								<i className="relative">
									<FontAwesomeIcon icon={faBell} size="lg" />									
								</i>
								<i className="relative">
									<FontAwesomeIcon icon={faUsers} size="lg" />
								</i>
							</>
						</div>
					</div>
					<div className="gametag">
						<div className="itemsTag">
							<div className="bg-gametag">
								<p><img src={userConnectedRedux.user && userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar : avatar} className="avatar" alt=""/></p>
								<p className="user">{userConnectedRedux.user.username}</p>
								<p className="user-setting">
									<><img src={WhiteJoystick} className="itemTag joystick" alt="" width="18" height="14" /></>
									<><img src={userConnectedRedux.user.language && userConnectedRedux.user.language === "fr" ? fr : gb} className="itemTag" alt="" width="15" height="14"/></>
								<i className="itemTag drop" onClick={onShow}><FontAwesomeIcon icon={faBars} /></i>
								</p>
							</div>
						</div>
						<div className={!showList ? "dropdown" :"dropdown show"}>
							<ul>
								<li><Link to="/profil">Profil</Link></li>
								<li><Link to="/tournament">Tournois</Link></li>								
								<li><Link to="/waggers">Wager</Link></li>
								<li><Link to="/assistance">Assistance</Link></li>
								{userConnectedRedux.user && userConnectedRedux.user.roles && userConnectedRedux.user.roles.includes("role_admin") ? <li>
									<span onClick={backAdmin} style={{"cursor":"pointer"}}>
										{
											Translation(userConnectedRedux.user.language).header.switch
										}
									</span>
									</li> : <></>
								}
								<li style={{"cursor":"pointer"}} onClick={onDeconnect}>
									{
										Translation(userConnectedRedux.user.language).header.logout
									}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</header>
  )

}
export default Header
