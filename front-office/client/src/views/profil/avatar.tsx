import React from "react"
import { useSelector } from "react-redux"
import {RootState} from "../../reducer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import AvatarDefault from "../../assets/image/game-tag.png"

const Avatar : React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const handleUpload = function(e:any) {
		console.log(e)
	}
	return (
		<div className="avatar">
			<p className="setavatar">
				<img src = {AvatarDefault} />
			<label htmlFor="setavatar"><FontAwesomeIcon icon={faPen} /></label>
			<input type="file" id="setavatar" onChange={handleUpload} className="uploadFile" name="file"/>
			</p>
			<p className="pseudo"><strong>{userConnectedRedux.user.username}</strong></p>
		</div>
	)
}

export default Avatar
