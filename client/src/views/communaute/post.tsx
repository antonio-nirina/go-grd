import React,{ useRef,useState} from "react"
import { faImage,faLaugh,faPaperclip,faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux"
import {useMutation} from "@apollo/client"
// import 'emoji-mart/css/emoji-mart.css'
// import { Picker } from 'emoji-mart'

import {RootState} from "../../reducer"
import {Translation} from "../../lang/translation"
import {CREATE_PUBLICATION} from  "../../gql/cmty/mutation"

const Post = function() {
    const [isTitlePost,setIsTitlePost] = useState<boolean>(true)
    const [isUpload,setIsUpload] = useState<boolean>(false)
    const [isEmoij,setIsEmoij] = useState<boolean>(false) 
    const userConnectedRedux 	= useSelector((state:RootState) => state.userConnected)
    const contentPost = useRef<HTMLInputElement>(null)
    const [sendPost] = useMutation(CREATE_PUBLICATION)

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
            try {
                const result = await sendPost({ variables: { uidUser: userConnectedRedux.user.uid,title: "",content:contnt}})
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
                    <span className="close-upload" onClick={handleClose}><i><FontAwesomeIcon icon={faTimes} /></i></span>
                </div>
                <div className={isEmoij ? "emoij" : "d-non"}>
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