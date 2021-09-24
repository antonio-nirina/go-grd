import React,{ useRef,useState,useCallback, useMemo} from "react"
import { faImage,faLaugh,faPaperclip,faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux"
import {useMutation,useQuery} from "@apollo/client"
import {useDropzone} from "react-dropzone"
import parse from 'html-react-parser'

import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {CREATE_PUBLICATION} from  "../../gql/cmty/mutation"
import {GET_ALL_POST} from "../../gql/cmty/query"
import imgDefault from "../../assets/image/image.png"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"
import {PostModel} from "../models/post"
import AvatarDefault from "../../assets/image/game-tag.png"

import crying_face from "../../assets/image/emoji/crying_face.png"
import face_with_tongue from "../../assets/image/emoji/face_with_tongue.png"
import frowning_face from "../../assets/image/emoji/frowning_face.png"
import grinning_face from "../../assets/image/emoji/grinning_face.png"
import heart_eyes from "../../assets/image/emoji/heart_eyes.png"
import heart from "../../assets/image/emoji/heart.png"
import ok_hand from "../../assets/image/emoji/ok_hand.png"
import angry_face from "../../assets/image/emoji/angry_face.png"
import slightly_smiling_face from "../../assets/image/emoji/slightly_smiling_face.png"
import sunglasses from "../../assets/image/emoji/sunglasses.png"
import tilted from "../../assets/image/emoji/tilted.png"
import thumbs_down from "../../assets/image/emoji/thumbs_down.png"
import thumbs_up from "../../assets/image/emoji/thumbs_up.png"
import winking_face from "../../assets/image/emoji/winking_face.png"
import pray from "../../assets/image/emoji/pray.png"
import joy from "../../assets/image/emoji/joy.png"


import {dateDefault} from "../tools/dateConvert"

const mimeTypeValid = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	// "application/pdf",
	"video/mp4"
]


const Post = function() {
	const [isTitlePost,setIsTitlePost] = useState<boolean>(true)
	const [isUpload,setIsUpload] = useState<boolean>(false)
	const [isEmoij,setIsEmoij] = useState<boolean>(false)
	const [files, setFiles] = useState<Array<any>>([])
	const [mimeType, setMimeType] = useState<string>("")
	const [errorInscr,setErreorIns] = useState<boolean>(false)
	const [errorMesg, setErreorMsg] = useState<string>("")

	const [posts, setPosts] = useState<Array<PostModel>>([])

	const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
	const contentPost = useRef<HTMLInputElement>(null)
	const [sendPost] = useMutation(CREATE_PUBLICATION)

	const {loading,error,data} 	= useQuery(GET_ALL_POST, {
		variables: {
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})

	useMemo(() => {
		if(!loading && !error && data) {
			setPosts(data.FindAllPost)
		}
	},[loading,error,data])

	const onDrop = useCallback((acceptedFiles:Array<any>) => {
		if (mimeTypeValid.indexOf(acceptedFiles[0].type) !== -1) {
			setMimeType(acceptedFiles[0].type)
			setFiles(
				acceptedFiles.map((file:any) =>
				  Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			)
		  );
		} else {
			setErreorIns(true)
			setErreorMsg(Translation(userConnectedRedux.user.language).communauty.fileNotvalid)
		}
	}, [userConnectedRedux])
	 const {getRootProps, getInputProps} = useDropzone({onDrop})

	const handlePost = function() {
		setIsTitlePost(false)
		if(contentPost.current) {
			contentPost.current.contentEditable = "true"
			contentPost.current.focus()
		}
	}

	const handleContent = async function(){
		let contnt = ""
		if(contentPost.current) {
			console.log("initial", contentPost.current.children)
			for (var i = 0; i < contentPost.current.children.length; i++) {
				contnt += "<p>"+contentPost.current.children[i].innerHTML+"</p>"
			}
		}
		if(files.length > 0) {
			const reader = new FileReader()
			reader.readAsDataURL(files[0])
			reader.onload = async function(file) {
				try {
					let newFile = typeof reader.result === "string" ? reader.result?.replace(/^data:(.*?);base64,/, "") : ""
					newFile = newFile.replace(/ /g, '+')
					const result = await sendPost({ variables: {
						uidUser: userConnectedRedux.user.uid,
						title: "",
						date:dateDefault(),
						content:contnt,
						imageType: files && files.length > 0 ? files[0].type : "",
						files: newFile
					}})
					if (result.data.createPost && contentPost.current) {
						URL.revokeObjectURL(files[0].preview)
						setFiles([])
						setIsUpload(false)
						contentPost.current.textContent = ""
						setPosts(result.data.createPost)
					}
				} catch(e) {
					console.log(e)
				}
			}
		} else {
			console.log("contnt", contnt)
			/*try {
				const result = await sendPost({ variables: {
					uidUser: userConnectedRedux.user.uid,
					title: "",
					content:contnt,
					imageType: "",
					files:  "",
					date:dateDefault(),
				}})
				if (result.data.createPost && contentPost.current) {
					contentPost.current.textContent = ""
				}
			} catch(e) {
				console.log(e)
			}*/
		}

	}

	const handleUpload = function() {
		setIsUpload(true)
	}
	const handleClose = function(event:any) {
		setIsUpload(false)
		event.stopPropagation()

		if (files.length > 0 && files[0].preview) {
			URL.revokeObjectURL(files[0].preview)
			setFiles([])
		}
	}

	const handleEmoji = function() {
		setIsEmoij(!isEmoij)
	}

	const handleSetEmoji = function(e:string) {
		if(contentPost.current) {
			/*let contnt = ""
			for (var i = 0; i < contentPost.current.children.length; i++) {
				contnt += "<p>"+contentPost.current.children[i].innerHTML+"</p>"
			}*/
			contentPost.current.innerHTML = contentPost.current.innerHTML + e
		}
		
	}

	return (
		<div className="post-cnt" >
			<div className="new-post">
				<div className="new-post-title">
					{
						Translation(userConnectedRedux.user.language).communauty.newpost
					}
				</div>
				<div className="content-profil">
					<div><img className="img-post" src={userConnectedRedux.user.avatar} alt="avatar-user-post" /></div>
					<div className={isTitlePost ? "title-expr" : "d-none"} onClick={handlePost}>
						{
							Translation(userConnectedRedux.user.language).communauty.express
						}
					</div>
				</div>
					<div className="content-new-post" id="content-post" ref={contentPost}></div>
						<div className={isUpload ? "image-videos" : "d-none"}>
							{
								Translation(userConnectedRedux.user.language).communauty.addImage
							}
							{errorInscr ? errorMesg : ""}
							<span className="close-upload" onClick={handleClose}><i><FontAwesomeIcon icon={faTimes} /></i></span>
							<div className="init" {...getRootProps()}>
								<input {...getInputProps()} />
									<div className="card-icon-file list">
										{
											files && files.length > 0 ? (mimeType === "application/pdf"
												?
											<i className="fa fa-file-pdf-o font-pdf"></i>
											:
											mimeType === "video/mp4" ? <video src={files[0].preview} width="320" height="240" controls></video> :  <img src={files[0].preview} style={{"width":"38%"}} alt="" />

											)
											:
											<img style={{"cursor":"pointer","width":"21%"}} src={imgDefault} alt="default" />
										}

									</div>
							</div>
						</div>
					<div className="post-user">
						<div className="flex-inline">
						<div className="post-icon">
						<div className="icon-lists">
							<div className="f-icons" onClick={handleUpload}>
								<i><FontAwesomeIcon icon={faImage} color={isUpload?"#000":""} /></i>
							</div>
							<div className="f-icons">
								<i><FontAwesomeIcon icon={faPaperclip} rotation={90} /></i>
								</div>
							<div className="f-icons" onClick={handleEmoji}>
								<i><FontAwesomeIcon icon={faLaugh} /></i>
							</div>
							</div>
						</div>
						<div className={isEmoij ? "emoij" : "d-none"}>
							<div className="fbEmoij-cnt">
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={crying_face} alt="crying_face" onClick={() => handleSetEmoji(":crying_face")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={face_with_tongue} alt="face_with_tongue" onClick={() => handleSetEmoji(":face_with_tongue")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={frowning_face} alt="frowning_face" onClick={() => handleSetEmoji(":frowning_face")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={grinning_face} alt="grinning_face" onClick={() => handleSetEmoji(":grinning_face")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={heart_eyes} alt="heart_eyes" onClick={() => handleSetEmoji(":heart_eyes")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={heart} alt="heart" onClick={() => handleSetEmoji(":heart")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={ok_hand} alt="ok_hand" onClick={() => handleSetEmoji(":ok_hand")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={angry_face} alt="angry_face" onClick={() => handleSetEmoji(":angry_face")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={slightly_smiling_face} alt="slightly_smiling_face" onClick={() => handleSetEmoji(":slightly_smiling_face")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={sunglasses} alt="sunglasses" onClick={() => handleSetEmoji(":sunglasses")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={tilted} alt="tilted" onClick={() => handleSetEmoji(":tilted")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={thumbs_down} alt="thumbs_down" onClick={() => handleSetEmoji(":thumbs_down")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={thumbs_up} alt="thumbs_up" onClick={() => handleSetEmoji(":thumbs_up")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={winking_face} alt="winking_face" onClick={() => handleSetEmoji(":winking_face")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={pray} alt="pray" onClick={() => handleSetEmoji(":pray")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src={joy} alt="joy" onClick={() => handleSetEmoji(":joy")} />
									</div>
								</div>
							</div>
						</div>
						</div>
						<div className="post-btn">
							<button className="btn bg-red poster" onClick={handleContent}>Poster</button>
						</div>
					</div>
			</div>
			{
				posts.length > 0 ? posts.map(function(e:PostModel,index:number) {
					return (
	  					<div className="bloc-actus" key={index}>
	  						<div className="actus-name">
	  							<img src={e.user.avatar?e.user.avatar:AvatarDefault} alt=""/>
	  							<p>{e.user.username} <span>{`@${e.user.username}`}</span></p>

	  						</div>
	  						<div className="actus-content">
	  							{parse(e.content)}
	  						</div>
	  						<div className="actus-content">
								{e.imageType !== "video/mp4" ? <img src={e.files} style={{"width":"100%"}} alt={e.uid} /> :  <video src={e.files} width="100%" height="240" controls></video>}
	  						</div>
	  					</div>
					)
				})
				:
				<></>
			}
		</div>
	)
}

export default Post
