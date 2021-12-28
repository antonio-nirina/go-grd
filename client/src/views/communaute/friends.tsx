import React,{useState,useEffect} from "react"
import { faPlus, faCommentDots, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import { Link } from 'react-router-dom'
import {useQuery,useMutation,useSubscription} from "@apollo/client"
import {GET_ALL_FRIENDS,GET_ALL_USER} from "../../gql/user/query"
import { useSelector } from "react-redux"


import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {Friends} from "../../gql/types/friend"
import AvatarDefault from "../../assets/image/game-tag.png"
import {INCOMING_FRIENDS} from "../../gql/user/mutation"
import {USER_CONNECTED} from "../../gql/user/subscription"
import LeaderboardCmty from "../leaderboard/leadboardCmty"
import FaqCmty from "../assistance/faqCmty"

interface FriendPopup {
	users:Friends[],
	isOpen:boolean,
	handleOpen:Function
}

const RenderPopup = function({users,isOpen,handleOpen}:FriendPopup) {
	const [isShow,setIsShow] = useState<boolean>(true)
	const [requestFriend] 			= useMutation(INCOMING_FRIENDS)
	const userConnectedRedux 		= useSelector((state:RootState) => state.userConnected)
	const onSendIncoming = 	async function(uid:string) {
		try {
			const result = await requestFriend({ variables: { idRequest: userConnectedRedux.user.uid,idSender: uid} })
			if (result.data.requestFriend) console.log(result.data.requestFriend)
		} catch(e) {
			console.log(e)
		}
	}

	useEffect(() => {
		setIsShow(isOpen)
	},[isOpen])

	const handleClose = function() {
		setIsShow(false)
		handleOpen(false)
	}

	return(
		<Popup
			open={isShow}
			modal
			nested
			onClose={handleClose}
			closeOnDocumentClick>
			{(close:any) => (
				<div className="modal">
					<button style={{"cursor":"pointer"}} className="clos" onClick={()=> handleClose()}>
						&times;
					</button>
					<div className="bar-title">
						{
							Object.keys(userConnectedRedux.user).length > 0 ?
							Translation(userConnectedRedux.user.language).communauty.addFriend
							:
							Translation("fr").communauty.addFriend
						}
					</div>
					<div className="actions">
						<div className="body">
							<div className="avatar-container">
								<div className="add-friends">
									<div className="found">
										{
											users.length > 0 ?
											users.map(function(el:any,index:number){
												let img:string = el.avatar ? (el.avatar) : AvatarDefault
												return (
													<div>
														<p key={index}>
															<img src={img} className="avatar-found" alt="" />
															<span className="profil-name">{el.username ? el.username : ((el.email).split("@")[0])}</span>
															<button className="btn bg-red">
																<i className="rect"><FontAwesomeIcon icon={faUserPlus} size="xs"/></i>
																<span onClick={()=>{
																	onSendIncoming(el.uid)
																	close()
																	}}>
																	{
																		Translation(userConnectedRedux.user.language).communauty.addFriend
																	}
																</span>
															</button>
														</p>
													</div>

												)
											})
											:
											<></>
										}

									</div>
									<div className="avatar-search-bar">
										<input type="text" placeholder="Rechercher une personne"/><button className="btn bg-white">Rechercher</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Popup>
	)
}

const Friend: React.FC = function() {
	const userConnectedRedux 		= useSelector((state:RootState) => state.userConnected)
	const [nbFriends, setNbFriends] = useState<number>(0)
	// const [isClose, setIsClose] = useState<boolean>(false)
	const [friends, setFriends] 	= useState<Array<Friends>>([])
	const [users, setUsers] 		= useState<Array<Friends>>([])
	const [isOpen, setIsOpen] 		= useState<boolean>(false)
	const [showChat, setShowChat] = useState<Boolean>(false)

	const {loading,error,data} 		= useQuery(GET_ALL_FRIENDS, {
		variables: {
			email: userConnectedRedux.user.email
		},
	})

	const {loading:loadingAll,error:errorAll,data:dataAll} = useQuery(GET_ALL_USER, {
		variables: {
			idUserConnected: userConnectedRedux.user.uid,
			limit:0,
			pageNumber:0
		},
	})
	const {loading:ldSub,error:erSub,data:dataSub}  = useSubscription(USER_CONNECTED)

	useEffect(()=> {
		if(!loading && !error && data) {
			if(data.GetAllFriends[0].count > 0) {
				setNbFriends(data.GetAllFriends[0].count)
				setFriends(data.GetAllFriends)
			}
		}
		if(!loadingAll && !errorAll && dataAll) setUsers(dataAll.GetUsers.filter((e:any) => e.uid !== userConnectedRedux.user.uid))

		if(!ldSub && !erSub && dataSub) {
			let array:Array<Friends> = []
			friends.forEach(function(e:Friends) {
				array.push({
					id:e.id,
					username:e.username,
					firstname:"",
					lastname:"",
					email:e.email,
					avatar:e.avatar,
					isBanned:false,
					count:0,
					isConnected:dataSub.subscribeConnected.uid === e.id ? true : e.isConnected
				})
			})

			setFriends(array)
		}
	},[loading,error,data,loadingAll,errorAll,dataAll,ldSub,erSub,dataSub,userConnectedRedux,friends])


	const openHandle = function(){
		setIsOpen(true)
	}
	const onShowChat = function(){
		setShowChat(!showChat)
	}

	const handleClose = function(isclose:boolean) {
		setIsOpen(false)
	}

	const Popup:FriendPopup = {
		users:users,
		isOpen:isOpen,
		handleOpen:handleClose
	}

	return (
		<div className="aside-right">
			<p className="bold">Mes amis</p>
			<div className="friend-list-container">
				{nbFriends
					?
					friends.map(function(el:any,index:number) {
						let img = el.avatar ? el.avatar : AvatarDefault
						return(
							<div className="friend-list"key={el.id}>
								<div key={index}>
									<img src={img} className="friend-avatar" alt=""/>
									<span>{el.username}<i className={el.isConnected ? "u-connected" : ""}></i></span>
									<i className="comments"><FontAwesomeIcon icon={faCommentDots} size="xs" onClick={onShowChat}/></i>
									<i className="square" onClick={openHandle} style={{"cursor":"pointer"}}>
										<FontAwesomeIcon icon={faPlus} size="xs" />
									</i>
									<RenderPopup {...Popup} />
								</div>
							</div>
						)
					})

				: (<div className="friend-list noborder">
						<p className="title">
							{
								Translation(userConnectedRedux.user.language).communauty.titleFriend
							}
						</p>
						<p style={{"fontWeight":"bold"}}>
							{ `${userConnectedRedux.user.username} `}
						{
							Translation(userConnectedRedux.user.language).communauty.friend
						}
						</p>
						<div className="friends">
							<p className="search-friends" onClick={openHandle} style={{"cursor":"pointer"}}>
								<FontAwesomeIcon icon={faUserPlus} size="xs"/>
								<span>
									{
										Translation(userConnectedRedux.user.language).communauty.addFriendList
									}
								</span>
							</p>
							<RenderPopup {...Popup}  />
						</div>
					</div>)
				}
			</div>
			<p className="bold mg-10">Leaderboard (Tous les jeux)</p>
			<Link to="/leaderboard" className="leader">
				<LeaderboardCmty />
			</Link>
			<p className="bold mg-10">Hubs</p>
			<FaqCmty />
		</div>
	)
}

export default Friend

