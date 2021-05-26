import React from "react"
import { useSelector } from "react-redux"
import {useMutation} from "@apollo/client"
import {RootState} from "../../reducer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import AvatarDefault from "../../assets/image/game-tag.png"
import {UPDATE_AVATAR} from "../../gql/user/mutation"

interface Input {
	email:string
	type: string
	data: string|ArrayBuffer|null
}

const Avatar : React.FC = function() {
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	const [updatedAvatar]  		= useMutation(UPDATE_AVATAR)
	const handleUpload = function(e:any) {
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
        reader.onload = function(file) {
        	const promise = new Promise(function executor(resolve, reject){
        		let file = typeof reader.result == "string" ? reader.result?.replace(/^data:(.*?);base64,/, "") : ""
				file = file.replace(/ /g, '+')
        		const input:Input = {
					email:userConnectedRedux.user.email,
        			type: (e.target.files[0].type).split("/")[1],
        			data: file
        		}
        		resolve(input)
        	})
			promise.then(function(input) {
				updatedAvatar({ variables: { avatarInput:input } }).then(function(response) {
					console.log(response)
				})
			}).catch((error) => {
				console.error('error: ' + error);
			})
        }
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
