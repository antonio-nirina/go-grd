import React,{useState} from "react"
import {useMutation} from "@apollo/client"
import { useForm } from "react-hook-form"
import SunEditor from 'suneditor-react'
import {useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import 'suneditor/dist/css/suneditor.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import SideBar from "../header/sidebar"
import {RootState} from "../reducer"
import Nav from "../header/nav"
import {CREATE_PUBLICATION} from "../gql/cmty/mutation"

type Inputs = {
	title:string
}

const SetRules: React.FC = function() {
	const history = useHistory()
	const [content, setContent] 		= useState<string>("")
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdTournament]  			= useMutation(CREATE_PUBLICATION)
	const userConnectedRedux 			= useSelector((state:RootState) => state.userConnected)

	const onSubmit = async function(data:Inputs){
		const result = await createdTournament({ variables: {
			uidUser:userConnectedRedux.user.uid,
			title:data.title,
			content:content,
		} })
		if (result.data.createPublication) {
			setContent("")
			history.push("/admin/communaute")
		}
	}

	const handleText = function(content: string) {
		console.log("ccc", content)
		setContent(content)
	}

	const handleFiles = function(files: Array<File>, info: object, uploadHandler: Function) {
		console.log("fil", files)
		uploadHandler = () => {return "<img src='https://i.ibb.co/Cmr1hmG/4-zu-3-1.jpg'>"}
	}

	return(
	    <div className="admin">
			<div className="layout-container">
				<SideBar />
				<div className="content-wrapper">
					<nav className="navbar">
	          			<div></div>
	                    <Nav />
	        		</nav>
	        		<div className="main-content">
	        			<div className="body-content">
	        				<div className="column-rules">
	        					<div className="field">
		        					<div className="group-input">
	                                    <form onSubmit={handleSubmit(onSubmit)}>
	    									<label htmlFor="title-rules">Publication : </label>
	    									<input type="text" id="title-rules"{...register("title", { required: true })} placeholder="Publication communaute" name="title" />
	    									<div className="wysiwyg">
	    										<SunEditor
	    											placeholder="Publication"
													onChange={handleText}
													onImageUploadBefore={handleFiles}
	    											setOptions={
													{
														buttonList:[
															['undo', 'redo',
																'font', 'fontSize', 'formatBlock',
																'bold', 'italic',
																'fontColor', 'hiliteColor', 'textStyle',
																'removeFormat',
																'outdent', 'indent',
																'align', 'horizontalRule', 'list', 'lineHeight',
																'link', 'image',
																'fullScreen']
														]
													}
												} />
	    									</div>
	    									<button className="btn bg-red" style={{"cursor":"pointer"}}><FontAwesomeIcon icon={faPlus} /> Ajouter</button>
	    								</form>
		        					</div>
	        					</div>
	        				</div>
	        			</div>
	        		</div>
				</div>
			</div>
	  	</div>
  	)
}

export default SetRules

/*

editor.onImageUploadBefore = function (files, info, core, uploadHandler) {
                        try {
                            resizeImage(files, uploadHandler)
                        } catch (err) {
                            uploadHandler(err.toString())
                        }
                    };

function resizeImage (files, uploadHandler) {
    const uploadFile = files[0];
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result
        img.onload = function () {
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const MAX_WIDTH = 1000;
            const MAX_HEIGHT = 1000;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(async function (blob) {
                let res = await addPhoto([new File([blob], uploadFile.name)],loggedUser.institute._id,loggedUser._id);
                if(res.success){
// Need to implement the image URL logic here
                    uploadHandler();
                } else{
                    uploadHandler(res.message)
                }
            }, uploadFile.type, 1);
        }
    }

    reader.readAsDataURL(uploadFile);
}


*/
