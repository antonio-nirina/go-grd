import React, { useState, useCallback } from 'react'
import { useSelector,useDispatch } from "react-redux"
import ReactDOM from 'react-dom'

import Popup from "reactjs-popup"
import {useMutation} from "@apollo/client"
import {RootState} from "../../reducer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import gamer from "../../assets/image/game-tag.png"
import Cropper from "react-easy-crop"
import Slider from "@material-ui/core/Slider"

import AvatarDefault from "../../assets/image/game-tag.png"
import {UPDATE_AVATAR} from "../../gql/user/mutation"
import {changeProfilUserConnected} from "../auth/action/userAction"

interface Input {
	email:string
	type: string
	data: string|ArrayBuffer|null
}

const Avatar : React.FC = function() {
	const [crop, setCrop] = useState({ x: 0, y: 0 })
  	const [zoom, setZoom] = useState()
  	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    	console.log(croppedArea, croppedAreaPixels)
  	}, [])
	const dispatch 				= useDispatch()
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
					dispatch(changeProfilUserConnected(response.data.updatedAvatar))
				})
			}).catch((error) => {
				console.error('error: ' + error);
			})
        }
	}
	return (
		<div className="avatar">
			<p className="setavatar">
				
			<Popup
				trigger={<button className="btn bg-yellow">Valider</button>}
				modal
				nested
  			>
				<Cropper
			      image={gamer}
			      crop={crop}
			      zoom={zoom}
			      aspect={4 / 3}
			      onCropChange={setCrop}
			      onCropComplete={onCropComplete}
			      // onZoomChange={setZoom}
	    		/>
	    		<div className="controls">
			        <Slider
			          value={zoom}
			          min={1}
			          max={3}
			          step={0.1}
			          aria-labelledby="Zoom"
			          // onChange={(e, zoom) => setZoom(zoom)}
      				 classes={{ root: 'slider' }}
			        />
     			</div>
	    	</Popup>
    		<button className="bg-white">Annuler</button>
    		<button className="bg-yellow">Appliquer</button>
			<input type="file" id="setavatar" onChange={handleUpload} className="uploadFile" name="file"/>
			</p>
			<p className="pseudo"><strong>{userConnectedRedux.user.username}</strong></p>
		</div>
	)
}

export default Avatar
