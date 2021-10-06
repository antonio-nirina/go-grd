import React,{useState,useEffect} from "react"
import {useMutation,useQuery} from "@apollo/client"
import { useForm } from "react-hook-form"
import {useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { faTwitch } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import thumbnail from "../assets/image/thumbnail.png"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import SideBar from "../header/sidebar"
import {RootState} from "../reducer"
import Nav from "../header/nav"
import {CREATE_PUBLICATION} from "../gql/cmty/mutation"
import {Twitch_GAMES} from "../gql/cmty/query"
import {SigingAdminTwitch} from "./communaute"
import {getAccessToken} from "../common/utils"

type Inputs = {
	title:string
}

type TwitchToken = {
	type:string,
	access_token:string,
	refresh_token:string
}

//const MESS_ERR:string = "Taille de l'image est trop petite, vueillez chosir image approprié"

const SetRules: React.FC = function() {
	const history = useHistory()
	const [uidGame, setUidGame] 		= useState<string>("")
	const [twitchToken,setTwitchToken] = useState<TwitchToken>({type:"",access_token:"",refresh_token:""})
	const [games, setGames] = useState<any>([])
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdTournament]  			= useMutation(CREATE_PUBLICATION)
	const userConnectedRedux 			= useSelector((state:RootState) => state.userConnected)
	const [Selected, setSelected] = useState<Boolean>(false)

	const onSubmit = async function(data:Inputs){
		const result = await createdTournament({ variables: {
			uidUser:userConnectedRedux.user.uid,
			uidGame:uidGame
		} })
		if (result.data.createPublication) {
			history.push("/admin/communaute")
		}
	}
	const onSelected = function(){
		setSelected(!Selected)
	}

	useEffect(() => {
		const strg = localStorage.getItem("access_token_twitch")
		if(strg) {
			setTwitchToken({
				type:JSON.parse(strg).type,
				access_token:JSON.parse(strg).access_token,
				refresh_token:JSON.parse(strg).refresh_token
			})
		}
	},[])
	const {loading,error,data} 	= useQuery(Twitch_GAMES,{
		variables:{
			accessToken:getAccessToken()
		}
	})
	useEffect(() => {
		if(!loading && !error && data) {
			setGames(data.FindAllGAmeTwitch)
		}
	},[loading,error,data,twitchToken])
	/*
		getGameTwitch(JSON.parse(strg).access_token).then(function(res:any){
				console.log("res",res)
			})
	
	*/
	

	/*const handleFiles = function(files: Array<File>, info: object, uploadHandler: Function) {
		try {
        	resizeImage(files, uploadHandler)
	    } catch (err:any) {
	        uploadHandler(err.toString())
	    }
	}*/

	const handleGame = function(event:any){
		setUidGame(event.target.value)
	}

	/*const resizeImage = function(files:Array<File>, uploadHandler:Function) {
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
}*/

	return(
	    <div className="admin">
			<div className="layout-container">
				<SideBar />
				{twitchToken.access_token ? 
					(<div className="content-wrapper">
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
												<label htmlFor="title-rules">Contenu page communaute : </label>
												<div className="input-group">
													<select id="select-game" onChange={handleGame}>
														<option value="">Selectionner jeux ...</option>
														{games?.map(function(el:any,index:number){
															return (
																<option key={index} value={el.id}>
																	{el.name}
																</option>
															)
														})}
													</select>
												</div>
												<div className="guide">
													<p>Les streaming à afficher :</p>
													<p>
														<span>- Selectionner la ou les vidéos que vous voulez afficher</span>
														<span>- Ajouter</span>
													</p>
												</div>
												<div className="list-video">
													<div className="video-check">
														<input type="checkbox" className="v-check" onClick={onSelected}/>
														<video controls poster={thumbnail} width="477" height="268" className={!Selected ? "notSelected" :"selected"}>
															<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
														</video>
													</div>																						
												</div>
												<div className="btn-container full-w">
													<button className="btn bg-red center clear" style={{"cursor":"pointer"}}><FontAwesomeIcon icon={faPlus} /> Ajouter</button>                                        
												</div>
												<div className="video-checked">
													<div className="guide">
														<p>Liste de vidéo à afficher dans communauté  :</p>
														<p>
															<span>- Appuyer sur l'icone supprimer pour effacer la vidéo</span>
															<span>- Valider</span>
														</p>
													</div>
													<div className="list-video">
														<div className="video-check">
															<i><FontAwesomeIcon icon={faTrash} /></i>
															<video controls poster={thumbnail} width="477" height="268">
																<source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>												
															</video>
														</div>
													</div>
													<div className="btn-container full-w">
														<button className="btn bg-red center clear" style={{"cursor":"pointer"}}><FontAwesomeIcon icon={faPlus} /> Valider</button>                                        
													</div>
												</div>	    									
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>)
					:
					(<div className="content-wrapper ctn-middle">
						<div className="center middle">
							<p>Connnectez-vous sur Twitch</p>
							<p onClick={SigingAdminTwitch}><i style={{"fontSize":"41px","textAlign":"center","cursor":"pointer"}} className="platform"><FontAwesomeIcon icon={faTwitch}/></i></p>
						</div>
					</div>)
				}
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
