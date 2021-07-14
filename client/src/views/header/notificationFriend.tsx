import React from "react"
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useMutation} from "@apollo/client"
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"
import AvatarDefault from "../../assets/image/game-tag.png"
import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import {ACCETEPED_FRIENDS} from "../../gql/user/mutation"
import {UPDATED_NOTIFICATION} from "../../gql/notifications/mutation"

const Notifications = function(data:any) {
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [acceptedFriend] = useMutation(ACCETEPED_FRIENDS)
	const [updatedNotification] = useMutation(UPDATED_NOTIFICATION)


	const handleAccepted = async function(uid:string,uidNotif:string) {
		try {
			await updatedNotification({ variables: { uid: uidNotif }})
		} catch(e) {
			console.log("error",e)
		}
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
					        <img src={img} className="avatar-found" alt=""/>
					        <span className="profil-name">
					        {el.user.username}
					        {/*
								Object.keys(userConnectedRedux.user).length > 0 ?
								Translation(userConnectedRedux.user.language).header.text
								:
								Translation("fr").header.text
							*/}
					        </span>
					        <button className="btn bg-red" onClick={()=>handleAccepted(el.user.uid,el.uid)}>
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
