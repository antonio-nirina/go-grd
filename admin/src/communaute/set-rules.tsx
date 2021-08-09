import React,{useState,useEffect} from "react"
import {useMutation,useQuery} from "@apollo/client"
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
import {GET_ALL_GAMES} from "../gql/games/query"

type Inputs = {
	title:string
}

const MESS_ERR:string = "Taille de l'image est trop petite, vueillez chosir image approprié"

const SetRules: React.FC = function() {
	const history = useHistory()
	const [content, setContent] 		= useState<string>("")
	const [games, setGames] = useState<any>([])
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdTournament]  			= useMutation(CREATE_PUBLICATION)
	const userConnectedRedux 			= useSelector((state:RootState) => state.userConnected)

	const {loading,error,data} 	= useQuery(GET_ALL_GAMES)

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

	useEffect(() => {
		if(!loading && !error && data) {
			setGames(data.FindAllGame)
		}

	},[loading,error,data])

	const handleText = function(content: string) {
		console.log("ccc", content)
		setContent(content)
	}

	const handleFiles = function(files: Array<File>, info: object, uploadHandler: Function) {
		try {
        	resizeImage(files, uploadHandler)
	    } catch (err) {
	        uploadHandler(err.toString())
	    }
	}

	const resizeImage = function(files:Array<File>, uploadHandler:Function) {
	    const uploadFile = files[0]
	    const img = document.createElement('img')
	    const canvas = document.createElement('canvas')
	    const reader = new FileReader()

	    reader.onload = function(e) {
	        // img.src= e.target?.result
	        img.onload = function () {
	            let ctx = canvas.getContext("2d");
	            ctx?.drawImage(img, 0, 0);

	            const MAX_WIDTH = 1600
	            const MAX_HEIGHT = 900
	            const MIN_WIDTH = 790
	            const MIN_HEIGHT = 445
	            let width = img.width
	            let height = img.height

	            if(width < MIN_WIDTH || height < MIN_HEIGHT) {
					uploadHandler(MESS_ERR)
	            }

	            if (width > height) {
	                if (width > MAX_WIDTH) {
	                    height *= MAX_WIDTH / width
	                    width = MAX_WIDTH;
	                }
	            } else {
	                if (height > MAX_HEIGHT) {
	                    width *= MAX_HEIGHT / height
	                    height = MAX_HEIGHT;
	                }
	            }

	            canvas.width = width
	            canvas.height = height

	            ctx = canvas.getContext("2d")
	            ctx?.drawImage(img, 0, 0, width, height)
	        }
	    }

	    reader.readAsDataURL(uploadFile)
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
	    									<div className="input-group">
                                                <input type="text" id="title-rules"{...register("title", { required: true })} placeholder="Publication communaute" name="title" />
                                                <select id="select-game">
	                                                <option value="">Selectionner jeux ...</option>
	                                                {games?.map(function(el:any,index:number){
	                                                	return (
	                                                		<option key={index} value={el.uid}>{el.name}</option>
                                                		)
	                                                })}
	                                            </select>
                                            </div>
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
https://i.ibb.co/Cmr1hmG/4-zu-3-1.jpg
Taille img max :
	largeur : 1600px
	hauteur : 900px
		---------
	Taille img min :
	largeur: 790px
	hauteur: 445px
	*/
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

            const MAX_WIDTH = 1600;
            const MAX_HEIGHT = 900;
            const MIN_WIDTH = 790;
            const MIN_HEIGHT = 445;
            let width = img.width;
            let height = img.height;

            if(width < MIN_WIDTH || height < MIN_HEIGHT) {
				uploadHandler(MESS_ERR)
            }

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
            let formData = new FormData();
			formData.append('name', 'John');
			formData.append('password', 'John123')

            canvas.toBlob(async function (blob) {
                let res = await addPhoto([new File([blob], uploadFile.name)],loggedUser.institute._id,loggedUser._id);
                let res = await fetch(
                	`${process.env.REACT_APP_BB_IMAGE_KEY}?key:${process.env.REACT_APP_BB_IMAGE_KEY}`,
					method: "POST",
				    headers: {
				        "Accept": "application/json, text/plain",
				        "Content-Type": "application/json",
				    },
            	)
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
