import React from 'react'
// import React,{useState, useCallback}  from 'react'
// import Cropper from 'react-easy-crop'
import { useSelector,useDispatch } from "react-redux"

import {useMutation} from "@apollo/client"
import {RootState} from "../../reducer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

import fr from "../../assets/image/fr.png"
import AvatarDefault from "../../assets/image/game-tag.png"
import {UPDATE_AVATAR} from "../../gql/user/mutation"
import {changeProfilUserConnected} from "../auth/action/userAction"

interface Input {
	email:string
	type: string
	data: string|ArrayBuffer|null
}

const Avatar : React.FC = function() {
	// const [crop, setCrop] = useState({ x: 0, y: 0 })
  	// const [zoom, setZoom] = useState()
  	/*const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    	console.log(croppedArea, croppedAreaPixels)
  	}, [])*/
	const dispatch 				= useDispatch()
	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	const [updatedAvatar]  		= useMutation(UPDATE_AVATAR)
	const handleUpload = function(e:any) {
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
        reader.onload = function(file) {
        	const promise = new Promise(function executor(resolve, reject){
        		let file = typeof reader.result === "string" ? reader.result?.replace(/^data:(.*?);base64,/, "") : ""
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
	//const [crop, setCrop] = useState({ x: 0, y: 0 })
  	//const [zoom, setZoom] = useState(1)
  	//const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //	console.log(croppedArea, croppedAreaPixels)
  	//}, [])
  	/*const area = {
		width: 276, // width of the cropped area
		height: 276 // height of the cropped area
	}*/
	// const [closeModal, setCloseModal] = useState(false)
    /*const onClose = function(){
        setCloseModal(!closeModal)
    }*/

	return (
		<div className="gamer-profil">
			<div className="avatar">
				<p className="setavatar">
				<img src = {userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar : AvatarDefault} alt="" />
				<label htmlFor="setavatar"><FontAwesomeIcon icon={faPen} /></label>
				<input type="file" id="setavatar" onChange={handleUpload} className="uploadFile" name="file"/>
				</p>

			</div>
			<div className="gamer-tag">
				<div className="grid">
					<h2>
						{userConnectedRedux.user.username}					
					</h2>
					<span>Membre depuis 11 2021</span>
					<div className="img-container-profil">
						<span className="invisible"></span>				
						<p></p>
						<span className="visible"></span>						
					</div>
				</div>
				<div className="grid">
					<div className="full-w">
						<div className="flag-container">				
							<img src={fr} alt="" width="27" height="auto"/>
						</div>
						<div className="external">
							<i><FontAwesomeIcon icon={faExternalLinkAlt} /></i>
						</div>
					</div>
					<div className="option-friend">
						<select className="d-none"/*className="ami"*/>
							<option>Ami(e)</option>
						</select>
						<select /*className="d-none"*/ className="dmd">
							<option>Demande d'ami</option>
						</select>
					</div>
				</div>					
			</div>
			{/*<div className={!closeModal ? "crop-container" :"crop-container close"}>
				<div className="is-cropped">
					<h2>Changer de photo de profil</h2>
					<Cropper
						image={userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar : AvatarDefault}
						crop={crop}
						zoom={zoom}
						aspect={1 / 1}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}						
    				/>					
					<div className="btn-container">
						<button className="btn bg-white" onClick={onClose}>Annuler</button>
						<button className="btn bg-red">Valider</button>
					</div>
				</div>
			</div>*/}
		</div>
	)
}

export default Avatar
