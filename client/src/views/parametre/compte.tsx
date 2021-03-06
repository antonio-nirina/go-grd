import React, {useState,useEffect,useRef} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useMutation} from "@apollo/client"
import { useSelector,useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { faTimes, faCamera, faPen, faSync } from "@fortawesome/free-solid-svg-icons"
import {UPDATED_USER} from "../../gql/user/mutation"
import {OldUserConnected,dateLongCreated} from "../tools/dateConvert"
import {RootState} from "../../reducer"

import Header from "../header/header"
import Footer from "../footer/footer"
import "../parametre/parametre.css"
import Sidebar from "./sidebar"
import AvatarDefault from "../../assets/image/game-tag.png"
import {UPDATE_AVATAR} from "../../gql/user/mutation"
import {changeProfilUserConnected} from "../auth/action/userAction"
// import {countries} from "../tools/country"

type Inputs = {
	email:string,
	firstname:string,
	username:string,
	country:string,
	birtDate:string,
	lastname:string,
	language:string
}

type InputFiles =  {
	email:string,
	type: string,
	data: string|ArrayBuffer|null
}


const Compte: React.FC = function() {
	const contentFile = useRef<HTMLInputElement>(null)
  	const [showPopup, setShowPopup] = useState<boolean>(false)
	const { register, handleSubmit,setValue } 	= useForm<Inputs>()
	const dispatch = useDispatch()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [updatedUser]  = useMutation(UPDATED_USER)

	const onPopup = function(){
		setShowPopup(!showPopup)
	}

	const cancelUpdated = function() {
		setValue("username",userConnectedRedux.user.username)
		setValue("country",userConnectedRedux.user.country)
		setValue("birtDate",userConnectedRedux.user.birtDate)
		setValue("lastname",userConnectedRedux.user.lastname)
		setValue("language",userConnectedRedux.user.language)
		setShowPopup(false)
	}

	const onSubmit = async function(data:Inputs){
		const username: string = data.username
		const firstname: string = data.firstname
		const lastname: string = data.lastname
		let lang:string = ""

		const userUpated = {
			username:username,
			firstname:firstname,
			lastname: lastname,
			language:lang,
			email:userConnectedRedux.user.email,
			country:data.country,
			birtDate:data.birtDate
		}
		const result = await updatedUser({ variables: { userUpated: userUpated } })
		if (result.data.updatedUser) {
			dispatch(changeProfilUserConnected(result.data.updatedUser))
		}
	}

	useEffect(() => {
		setValue("username",userConnectedRedux.user.username)
		setValue("country",userConnectedRedux.user.country)
		setValue("birtDate",userConnectedRedux.user.birtDate)
		setValue("lastname",userConnectedRedux.user.lastname)
		setValue("language",userConnectedRedux.user.language)

	},[setValue,userConnectedRedux])
	const [updatedAvatar]  		= useMutation(UPDATE_AVATAR)

	const handleUploadAvatar = function() {
		contentFile.current?.click()
	}

	const handleUpload = function(e:any) {
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
        reader.onload = async function() {
        	let file = typeof reader.result === "string" ? reader.result?.replace(/^data:(.*?);base64,/, "") : ""
			file = file.replace(/ /g, '+')
			const input:InputFiles = {
				email:userConnectedRedux.user.email,
				type:(e.target.files[0].type).split("/")[1],
				data:file
			}

			const avatartUp = await updatedAvatar({variables:{ avatarInput:input }})
			if(avatartUp) dispatch(changeProfilUserConnected(avatartUp.data.updatedAvatar))
        }
	}

  return(
	<div className="leaderboard settings">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="containt mon_compte">
					<div className="title-lead">
						<Sidebar />
						<div className="personal">
							<div className="my_account">
								<div className="img_account">
									<input type="file" name="avatar" ref={contentFile} onChange={handleUpload}  className="d-none"  />
									<img src= {userConnectedRedux.user.avatar ? userConnectedRedux.user.avatar :AvatarDefault} alt="" width="150" height="150"/>
									<i className={showPopup ? "d-none" :"set"} onClick={onPopup}>
										<FontAwesomeIcon icon={faPen} /></i>
									<p className={showPopup ? "icon-settings" :"d-none"}>
										<i>
											<FontAwesomeIcon style={{"cursor":"pointer"}} onClick={handleUploadAvatar} icon={faCamera} />
										</i>
										<i>
											<FontAwesomeIcon onClick={() => setShowPopup(false)} style={{"cursor":"pointer"}} icon={faTimes} />
										</i>
										<i><FontAwesomeIcon style={{"cursor":"pointer"}} icon={faSync} /></i>
									</p>
								</div>
								<div className={showPopup ? "d-none" :"actual_account"}>
									<p className="account_name">{userConnectedRedux.user.username}</p>
									<p className="account_name">#{userConnectedRedux.user.uid}</p>
									<p className="adhesion">Membre depuis {dateLongCreated(userConnectedRedux.user.created)}</p>
									<p className="account_info">
										{userConnectedRedux.user.birtDate ? <span>Age : {OldUserConnected(userConnectedRedux.user.birtDate)}</span> : ""}
										<span>Pays : {userConnectedRedux.user.country}</span>
										<span>Langue : {userConnectedRedux.user.language.substr(0, 1).toUpperCase() + userConnectedRedux.user.language.substr(1)}</span>
									</p>
								</div>
								<div className={!showPopup ? "d-none" :"edit_account"}>
									<form  onSubmit={handleSubmit(onSubmit)}>
										<div className="input_group">
											<label htmlFor="Pseudo">Pseudo</label>
											<input id="pseudo" type="text" {...register("username")} name="username" />
										</div>
										<div className="input_group">
											<label htmlFor="birth">Date de naissance</label>
											<input type="text" {...register("birtDate")} name="birtDate" />
										</div>
										<div className="input_group">
											<label htmlFor="country">Pays</label>
											<input id="pays" type="text" {...register("country")} name="country" />
										</div>
										<div className="input_group">
											<label htmlFor="language">Langue</label>
											<input id="pays" type="text" {...register("language")} name="language" />
										</div>
										<div className="btn-select" style={{"display":"flex"}}>
											<button type="submit" className="btn bg-red">Mettre ?? jour</button>
											<div onClick={cancelUpdated} className="btn bg-white">Annuler</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>
	)
}

export default Compte
