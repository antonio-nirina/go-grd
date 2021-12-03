import React,{useState,useMemo} from "react"
import { Link } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import {useHistory } from "react-router-dom"
import {useQuery,useSubscription,useMutation} from "@apollo/client"
import Loader from "react-loader-spinner"

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
import Invitation from "./invitation"
import {NOTIFICATIONS_SUBSCRIBE} from "../../gql/user/subscription"

import {CREATE_GROUP} from "../../gql/group/mutation"
import { NameRoutes } from "../commons/route-list"
import {Deconnect} from "../../gql/user/auth"
import Chat from "../tchat/chat"
import { Friends } from "../../gql/types/friend"


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

type Show = {
	isShow:boolean
}

type numberConnected = {
	total:number
}

type FriendsGroup = {
	friendGroup:Array<Friends>
}


const Header: React.FC = function() {
	const history = useHistory()
	const dispatch = useDispatch()
	const [showChat, setShowChat] = useState<Show>({
		isShow:false
	})

	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [showList, setShowList] = useState<Boolean>(false)
	const [notification, setNotification] = useState<Number>(0)
	const [showNotif, setShowNotif] = useState<Boolean>(false)
	const [showInvitation, setShowInvitation] = useState<Boolean>(false)
	const [isDeconnect, setIsDeconnect] = useState<Boolean>(false)
	// const [isShowChat, setIsShowChat] = useState<Boolean>(false)
	const [friendsConnect, setFriendsConnect] = useState<numberConnected>({total:0})
	const [dataNotifications, setDataNotifications] = useState<Array<any>>([])
	const [groupFriends,setGroupFriends] = useState<FriendsGroup>({friendGroup:[]})
	const [isLoader, setIsLoader] = useState<boolean>(false)

	const {loading:subLoading,error:errSub,data:subData}  = useSubscription(NOTIFICATIONS_SUBSCRIBE)
	const {loading,error,data} = useQuery(GET_ALL_NOTIFICATIONS, {
		variables: {
			idUser: userConnectedRedux.user.uid
		},
	})

	const [deconnect] = useMutation(Deconnect)
	const [grp] = useMutation(CREATE_GROUP)

	const onShow = function(){
		setShowList(!showList)
	}
	const onShowInvitation = function(){
		setShowInvitation(!showInvitation)
	}
	const onShowNotif = async function(){
		if(dataNotifications.length > 0) {
			setShowNotif(!showNotif)
			setNotification(0) // update notification statut true
		}
	}

	const onDeconnect = async function() {
		setIsLoader(true)
		history.push("/")
		try {
			const deco = await deconnect({ variables: { id: userConnectedRedux.user.uid }})
			setIsLoader(false)
			if(deco) {
				dispatch(removeDataUser())
				setIsDeconnect(true)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const backAdmin = function() {
		if(process.env.REACT_APP_URL_ADMIN) window.location.href = process.env.REACT_APP_URL_ADMIN
	}

	useMemo(() => {
		let array:Array<Notif> = []
		let notif:Notif
		let isSubscribed:boolean = true

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
		console.log(isSubscribed)
		return () => {isSubscribed = false}
	},[loading,error,data,subLoading,errSub,subData,userConnectedRedux])

	const openTchat = function(e:boolean) {
		setShowChat({isShow:e})
	}

	const onDmTchat = function(statTchat:boolean) {
		setShowChat({isShow:statTchat})
	}

	const handleConnected = function(numberConnected:number) {
		setFriendsConnect({total:numberConnected})
	}

	const handleGroupFriend = async function(friend:Friends) {
		const checkFriend = groupFriends.friendGroup.find(e => e.id === friend.id)
		if(!checkFriend) {
			let array:Array<string> = []
			setGroupFriends({friendGroup:[...groupFriends.friendGroup,friend]})
			array.push(friend.id)
			try {
				await grp({ variables: { idUsers: array,lead:userConnectedRedux.user.uid,subject:"" }})
			} catch (e) {
				console.log("error", e)
			}
			setShowInvitation(false)
		}
	}

  	return(
		<header className={isDeconnect || Object.keys(userConnectedRedux.user).length === 0 ? "header" : "header connected"}>
			<div className="wrap">
				<div className="logo">
					<h1>
						<Link to="/" className="v-align">
							<img src={logo} alt="grind" className="imglogo"/>
						</Link>
					</h1>
				</div>
				<nav className="navmenu">
					<ul>
						<li>
							<Link to={NameRoutes.tournament}>
								{
									Translation(userConnectedRedux.user.language).header.tournaments
								}
							</Link>
						</li>
						<li>
							<Link to={NameRoutes.wager}>
								{
									Translation(userConnectedRedux.user.language).header.wagers
								}
							</Link>
						</li>
						<li>
							<Link to={NameRoutes.communaute}>
								{
									Translation(userConnectedRedux.user.language).header.community
								}
							</Link>
						</li>
						<li>
							<Link to={NameRoutes.assistance}>
								{
									Translation(userConnectedRedux.user.language).header.assistance
								}
							</Link>
						</li>
					</ul>
				</nav>
				<div className="bt-container right">
					<Link to="/login" className="btn bg-red">Connecte-toi</Link>
				</div>
				<div className="tag">
					<div className="box">
						<div className="connex" style={{"cursor":"pointer"}}>
							<i className="square" onClick={onShowInvitation} >
								<FontAwesomeIcon icon={faPlus} />
								<span className= {friendsConnect.total > 0 ? "count" : ""}>{friendsConnect.total === 0 ? "" : friendsConnect.total}</span>
								<span className="tooltip">Inviter des amis</span>
							</i>
							{groupFriends.friendGroup.map(function(el:Friends,index:number) {
								return (
									<span className="add-team" key={index}>
										<img src={el.avatar ? el.avatar : avatar} style={{"width":"31px", "height":"32px"}} alt={el.id} />
									</span>
								)
							})}
							<div className={!showInvitation ? "invitation" :"invitation show"}>
								<Invitation
									handleDm={onDmTchat}
									handleTotalConnected={handleConnected}
									SetGroupFriends={handleGroupFriend}
								/>
							</div>
							<div className={!showChat.isShow ? "hide-chat" :"show-chat"}>
								<Chat
									handleTchat={openTchat}
								/>
							</div>

							<div className={!showNotif ? "notification" :"notification show"}>
								{dataNotifications.length > 0 && dataNotifications[0].type === 0
									?
									(<Notifications data={dataNotifications} />)
									: <></>
								}
							</div>
							<>
								<i className="relative bell" onClick={onShowNotif}>
									<FontAwesomeIcon icon={faBell} size="lg" />
									<span className={notification > 0 ? "number" : ""}>{notification > 0 ? notification : ""}</span>
									<span className="tooltip">Notification</span>
								</i>
								<i className="relative member">
									<FontAwesomeIcon icon={faUsers} size="lg" />
									<span className="tooltip">Groupe</span>
								</i>
							</>
						</div>
					</div>
					<div className="gametag">
						<div className="itemsTag">
							<div className="bg-gametag">
								<p style={{"cursor":"pointer"}} onClick={() => history.push(NameRoutes.profil)}>
									<img src={userConnectedRedux.user && userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar : avatar} className="avatar" alt=""/>
								</p>
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
								<li><Link to={NameRoutes.profil}>Profil</Link></li>
								<li className="mobile-menu">
									<ul>
										<li><Link to={NameRoutes.tournament}>Tournois</Link></li>
										<li><Link to={NameRoutes.wager}>wagers</Link></li>
										<li><Link to={NameRoutes.communaute}>communauté</Link></li>
										<li><Link to={NameRoutes.assistance}>assistance</Link></li>
									</ul>
								</li>
								<li className="border">
									<Link to={NameRoutes.jackpot}>Cagnote (0 GC)</Link>
								</li>
								<li className="border"><Link to={NameRoutes.account}>Compte</Link></li>
								{userConnectedRedux.user && userConnectedRedux.user.roles && userConnectedRedux.user.roles.includes("role_admin") ? <li>
									<span onClick={backAdmin} style={{"cursor":"pointer"}}>
										{
											Translation(userConnectedRedux.user.language).header.switch
										}
									</span>
									</li> : <></>
								}
								<li style={{"cursor":"pointer"}} onClick={onDeconnect} className="loader">
									<div className={isLoader ? "loader-spinner":"d-none"}>
										<Loader
											type="Oval"
											color="#dd0000"
										/>
									</div>
									<span>
									{
										Translation(userConnectedRedux.user.language).header.logout
									}
									</span>
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
