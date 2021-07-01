import React,{useState} from "react"
import { Link,useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery,useMutation} from "@apollo/client"
import { faBars, faBell, faUsers, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"
import AvatarDefault from "../../assets/image/game-tag.png"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {ACCETEPED_FRIENDS} from "../../gql/user/mutation"

import {Notif} from "./header"

const Notifications = function(data:any) {
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [acceptedFriend] = useMutation(ACCETEPED_FRIENDS)
	const handleAccepted = async function(uid:string) {
		try {
			const result = await acceptedFriend({ variables: { idRequest:uid,idSender: userConnectedRedux.user.uid}})
			if(result && history.location.pathname === "communaute") history.push("/communaute")

		} catch(e) {
			console.log("error",e)
		}

	}
	return(
		<>
			{
				data.data.map(function(el:any,index:number) {
					let img:string = el.user.avatar ? el.user.avatar : AvatarDefault
					return (
						<p key={index}>
					        <img src={img} className="avatar-found"/>
					        <span className="profil-name">
					        {el.user.username}
					        {/*
								Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).header.text
								:
								Translation("fr").header.text
							*/}
					        </span>
					        <button className="btn bg-yellow" onClick={()=>handleAccepted(el.user.uid)}>
					            <i className="rect"><FontAwesomeIcon icon={faCheck} size="xs"/></i>
					            <span>
					            	{
										Object.keys(userConnectedRedux.user).length > 0 ?
										Translation(userConnectedRedux.user.language).header.accepted
										:
										Translation("fr").header.accepted
									}
				            	</span>
					        </button>
					         <button className="btn bg-white gray">
					            <i className="rect"><FontAwesomeIcon icon={faTimes} size="xs"/></i>
					            <span>
					            	{
										Object.keys(userConnectedRedux.user).length > 0 ?
										Translation(userConnectedRedux.user.language).header.refuse
										:
										Translation("fr").header.refuse
									}

					            </span>
					        </button>
					    </p>
					)
				})
			}

		    {/*<p>
		        {
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).communauty.withFriend
					:
					Translation("fr").communauty.withFriend
				}
		        <Link to="#">Nirina1718</Link>
		        <span className="date">{new Date().toLocaleDateString()}</span>
		    </p>*/}
    	</>
	)
}

export default Notifications
