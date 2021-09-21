import React,{ useRef,useState,useCallback,useEffect} from "react"
import { faImage,faLaugh,faPaperclip,faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux"
import {useMutation,useQuery} from "@apollo/client"
import {useDropzone} from "react-dropzone"
import parse from 'html-react-parser'
// import 'emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'

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

	useEffect(() => {
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
			for (var i = 0; i < contentPost.current.children.length; i++) {
				contnt += "<p>"+contentPost.current.children[i].innerHTML+"</p>"
			}
		}
		if(files.length > 0) {
			const reader = new FileReader()
			reader.readAsDataURL(files[0])
			reader.onload = async function(file) {
				try {
					const result = await sendPost({ variables: {
						uidUser: userConnectedRedux.user.uid,
						title: "",
						date:dateDefault(),
						content:contnt,
						imageType: files && files.length > 0 ? files[0].type : "",
						files: files && files.length > 0 ?reader.result : ""
					}})
					if (result.data.createPost && contentPost.current) {
						URL.revokeObjectURL(files[0].preview)
						setFiles([])
						setIsUpload(false)
						contentPost.current.textContent = ""
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
						<div className={isEmoij ? "emoij" : "d-non"}></div>
						{/*<Picker set='facebook' />*/}
					</div>
					<div className="post-icon">
						<div className="icon-lists">
							<div className="f-icons" onClick={handleUpload}>
								<i><FontAwesomeIcon icon={faImage} color={isUpload?"#000":""} /></i>
							</div>
							<div className="f-icons">
								<i><FontAwesomeIcon icon={faPaperclip} rotation={90} /></i>
								</div>
							<div className="f-icons">
								<i><FontAwesomeIcon icon={faLaugh} /></i>
							</div>
							</div>
						<button className="btn bg-red poster" onClick={handleContent}>Poster</button>
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
