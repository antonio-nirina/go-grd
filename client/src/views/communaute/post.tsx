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
		let contnt:string|null = ""
		if(contentPost.current) {
			contnt = contentPost.current.innerHTML
		}
		if(!contnt) return null
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
			try {
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
			}
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

	const handleSetEmoji = function(e:string,url:string) {
		if(contentPost.current) {
			if(/<br>/.test(contentPost.current.innerHTML)){
				contentPost.current.innerHTML = contentPost.current.innerHTML.replace("<br>",`<img src=${url} style="width:12px" alt=${e} />`)
			} else {
				if(!contentPost.current.textContent) contentPost.current.innerHTML = contentPost.current.innerHTML+`<img src=${url} style="width:12px" alt=${e} />`
			}

		}
	}

	return (
		<div className="post-cnt rel" >
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
					<div className="content-new-post" id="content-post" ref={contentPost} contentEditable></div>
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
							<div className={!isEmoij ? "f-icons" :"f-icons active"} onClick={handleEmoji}>
								<i><FontAwesomeIcon icon={faLaugh} /></i>
							</div>
							</div>
						</div>
						<div className="post-btn">
							<button className="btn bg-red poster" onClick={handleContent}>Poster</button>
						</div>
						<div className={isEmoij ? "emoij" : "d-none"}>
							<div className="fbEmoij-cnt">
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/rZzDqHj/crying-face.png" alt="crying_face" onClick={() => handleSetEmoji("crying_face","https://i.ibb.co/rZzDqHj/crying-face.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/jVhS2t8/face-with-tongue.png" alt="face_with_tongue" onClick={() => handleSetEmoji("face_with_tongue","https://i.ibb.co/jVhS2t8/face-with-tongue.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/THGpNYw/frowning-face.png" alt="frowning_face" onClick={() => handleSetEmoji("frowning_face","https://i.ibb.co/THGpNYw/frowning-face.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/wQHLZRt/grinning-face.png" alt="grinning_face" onClick={() => handleSetEmoji("grinning_face","https://i.ibb.co/wQHLZRt/grinning-face.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/ZGvdKr4/heart-eyes.png" alt="heart_eyes" onClick={() => handleSetEmoji("heart_eyes","https://i.ibb.co/ZGvdKr4/heart-eyes.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/s9Z9NxM/heart.png" alt="heart" onClick={() => handleSetEmoji("heart","https://i.ibb.co/s9Z9NxM/heart.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/GP7KVWs/ok-hand.png" alt="ok_hand" onClick={() => handleSetEmoji("ok_hand","https://i.ibb.co/GP7KVWs/ok-hand.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/TYNpKv1/angry-face.png" alt="angry_face" onClick={() => handleSetEmoji("angry_face","")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/hM4pfXW/slightly-smiling-face.png" alt="slightly_smiling_face" onClick={() => handleSetEmoji("slightly_smiling_face","https://i.ibb.co/hM4pfXW/slightly-smiling-face.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/RyjymyL/sunglasses.png" alt="sunglasses" onClick={() => handleSetEmoji("sunglasses","https://i.ibb.co/RyjymyL/sunglasses.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/HX36Ynp/tilted.png" alt="tilted" onClick={() => handleSetEmoji("tilted","https://i.ibb.co/HX36Ynp/tilted.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/DtCP1h1/thumbs-down.png" alt="thumbs_down" onClick={() => handleSetEmoji("thumbs_down","https://i.ibb.co/DtCP1h1/thumbs-down.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/k520Y9g/thumbs-up.png" alt="thumbs_up" onClick={() => handleSetEmoji("thumbs_up","https://i.ibb.co/k520Y9g/thumbs-up.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/Bgv0sx8/winking-face.png" alt="winking_face" onClick={() => handleSetEmoji("winking_face","https://i.ibb.co/Bgv0sx8/winking-face.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/GQWwGL2/pray.png" alt="pray" onClick={() => handleSetEmoji("pray","https://i.ibb.co/GQWwGL2/pray.png")} />
									</div>
								</div>
								<div className="list-emoij">
									<div className="fbEmoij">
										<img src="https://i.ibb.co/7SYMjR1/joy.png" alt="joy" onClick={() => handleSetEmoji("joy","https://i.ibb.co/7SYMjR1/joy.png")} />
									</div>
								</div>
							</div>
						</div>
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
							  {e.files ?
							  	<div className="actus-content">
								  {e.imageType !== "video/mp4" ? <img src={e.files} style={{"width":"100%"}} alt={e.uid} /> :  <video src={e.files} width="100%" height="240" controls></video>}
								</div>
							  : <></>
							  }

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
