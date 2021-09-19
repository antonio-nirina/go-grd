import React,{ useRef,useState,useCallback} from "react"
import { faImage,faLaugh,faPaperclip,faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux"
import {useMutation} from "@apollo/client"
import {useDropzone} from "react-dropzone"
// import 'emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'

import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {CREATE_PUBLICATION} from  "../../gql/cmty/mutation"



const mimeTypeValid = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"application/pdf",
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

    const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
    const contentPost = useRef<HTMLInputElement>(null)
    const [sendPost] = useMutation(CREATE_PUBLICATION)

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
    }, [])
     const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
	        reader.onload = async function(file) {
	        	try {
                	const result = await sendPost({ variables: {
                		uidUser: userConnectedRedux.user.uid,
                		title: "",
                		content:contnt,
                		imageType: files && files.length > 0 ? files[0].type : "",
                		files: files && files.length > 0 ?reader.result : ""
                	}})
                	if (result.data.createPublication) console.log(result.data.createPublication)
	            } catch(e) {
	                console.log(e)
	            }
	  		}
    }

    const handleUpload = function() {
        setIsUpload(true)
    }
    const handleClose = function() {
        setIsUpload(false)
    }

    const handleRemove = function(event:any) {
        event.stopPropagation()
    	if (files[0].preview) URL.revokeObjectURL(files[0].preview)
        setFiles([])
    }

    return (
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
					                    mimeType === "video/mp4" ? <video src={files[0].preview} width="320" height="240" controls></video> :  <img src={files[0].preview} style={{"width":"100%"}} alt="" />

					                    )
					                    :
					                    <img style={{"cursor":"pointer","width":"100%"}} src={require("../../assets/image/image.png")} />
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
    )
}

export default Post
