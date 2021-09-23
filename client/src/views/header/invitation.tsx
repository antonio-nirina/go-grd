import React,{useState,useEffect} from "react"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faCommentDots } from "@fortawesome/free-solid-svg-icons"
import {useQuery} from "@apollo/client"
import AvatarDefault from "../../assets/image/game-tag.png"
import {RootState} from "../../reducer"
import {USerModel} from "../models/user"
import {GET_ALL_FRIENDS} from "../../gql/user/query"
import {Friends} from "../../gql/types/friend"


const Invitation = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [friends, setFriends] 	= useState<Array<Friends>>([])
	const [nbFriends, setNbFriends] = useState<number>(0)
	const [showReduce, setShowReduce] = useState<Boolean>(true)
	const onShowReduce = function(){
		setShowReduce(!showReduce)
	}

	const {loading,error,data} 		= useQuery(GET_ALL_FRIENDS, {
		variables: {
			email: userConnectedRedux.user.email
		},
	})

	useEffect(()=> {
		if(!loading && !error && data) {
			let count:number = 0
			if(data.GetAllFriends[0].count > 0) {
				setFriends(data.GetAllFriends)
			}
			data.GetAllFriends.forEach(function(el:Friends) {
				if(el.isConnected) count++
			})
			setNbFriends(count)
		}
	},[loading,error,data])


	return(
		<div className="gamer-invite">
			<p>Invitez à rejoindre votre groupe</p>
			<div className="friends-online">
				<p className="bold" onClick={onShowReduce}>
					Mes amis en ligne 
					<span>
						{`(${nbFriends})`}
					</span>
					<i className="right-icon"><FontAwesomeIcon icon={!showReduce ? faPlus : faMinus} /></i></p>
				<div className={!showReduce ? "list-online" : "list-online show"}>
					{friends.length > 0 ? friends.map(function(el:Friends,index:number){
						return (
							<p key={index}>
								<strong>
									<img src={el.avatar ? el.avatar : AvatarDefault} alt="profil-avatar"/>
									<span>
										{el.username ? el.username : ((el.email).split("@")[0])}
										<i className={el.isConnected ? "u-connected" : ""}></i>
									</span>
								</strong>
								<span className="i-right">
									<i><FontAwesomeIcon className="add-icon" icon={faPlus} /></i>
									<i><FontAwesomeIcon icon={faCommentDots} /></i>
								</span>
							</p>
						)
					}):<></>}
				</div>
			</div>
			<div className="friends-online">
				<p className="bold">Skouinar & Co. <span>(15)</span><i className="right-icon"><FontAwesomeIcon icon={faPlus} /></i></p>
			</div>
		</div>	
	)
}

export default Invitation
