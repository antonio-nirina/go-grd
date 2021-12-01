import React,{useState,useEffect} from "react"
import {useMutation,useQuery} from "@apollo/client"
import { useForm } from "react-hook-form"
import {useHistory } from "react-router-dom"
import { faTwitch } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Loader from "react-loader-spinner"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATE_PUBLICATION} from "../gql/cmty/mutation"
import {Twitch_GAMES} from "../gql/cmty/query"
import {SigingAdminTwitch,getStreamByGame} from "./communaute"
import {getAccessToken,GetCookie} from "../common/utils"


type VideoClipStreams = {
	id:string
	videoId:string
	gameId:string
	title:string
	viewerCount:number
	createdAt:string
	thumbnailUrl:string
	gameName:string
	creatorName:string
}

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
	const [isLoader, setIsLoader] = useState<Boolean>(true)

	const [streams, setStreams] = useState<VideoClipStreams[]>([])
	const { handleSubmit } 	= useForm<Inputs>()
	const [createdPub]  			= useMutation(CREATE_PUBLICATION)
	// const userConnectedRedux 			= useSelector((state:RootState) => state.userConnected)
	const [selected, setSelected] = useState<string>("")

	const onSubmit = async function<T>(data:T){
		let array:VideoClipStreams[] = []
		streams.forEach(function(en:VideoClipStreams){
			let title:string = en.title
			if(!/[a-zA-Z]/.test(en.title)){
				title = ""
			}
			array.push({
				id:en.id,
				createdAt:en.createdAt,
				videoId:en.videoId,
				viewerCount:en.viewerCount,
				creatorName:en.creatorName,
				title:title,
				gameId:en.gameId,
				gameName:en.gameName,
				thumbnailUrl:en.thumbnailUrl
			})
		})

		const result = await createdPub({ variables: {
			streaming:array,
			uidGame:uidGame,
		} })
		if (result.data.createPublication) {
			history.push("/admin/list/communaute")
		}
	}
	const onSelected = function(el:VideoClipStreams){
		const newStreams = streams.filter((e:VideoClipStreams) => {return (e.id !== el.id)})
		setStreams(newStreams)
		setSelected(el.id)
	}

	useEffect(() => {
		const strg = GetCookie()
		if(strg) {
			setTwitchToken({
				type:strg.type,
				access_token:strg.access_token,
				refresh_token:strg.refresh_token
			})
		}
	},[])
	const {loading,error,data} 	= useQuery(Twitch_GAMES,{
		variables:{
			accessToken:getAccessToken()?.access_token,
			refreshToken:getAccessToken()?.refresh_token
		}
	})
	useEffect(() => {
		if(!loading && !error && data) {
			setIsLoader(false)
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

	const handleGame = async function(event:React.FormEvent<HTMLSelectElement>){
		setIsLoader(true)
		setUidGame(event.currentTarget.value)
		const streams = await getStreamByGame(twitchToken.access_token,event.currentTarget.value,twitchToken.refresh_token)
		if(streams) setIsLoader(false)
		setStreams(streams)
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
												<div className={isLoader ? "loader-spinner":"d-none"}>
													<Loader
														type="Oval"
														color="#dd0000"
													/>
												</div>
												<div className={streams.length > 0 ? "guide" : "d-none"}>
														<p>Liste de vidéo à afficher dans communauté  :</p>
														<p>
															<span>- Appuyer sur l'icone supprimer pour effacer la vidéo</span>
															<span>- Valider</span>
														</p>
													</div>
												<div className="list-video">
													<div className="video-check">
															{
																streams.length > 0 ?
																streams?.map(function(el:VideoClipStreams,index:number) {
																	return (
																		<div  key={index} className="list-clip-stream">
																			<input type="checkbox" className="v-check" onChange={() => onSelected(el)} checked={selected && selected === el.id ? false:true} />
																			<img style={{"width":"100%", "height":"268"}} src={el.thumbnailUrl} className={!selected ? "notSelected" :"selected"} alt={el.id} />
																		</div>
																	)
																})
																: <>Accune video disponible pour l'instant </>
															}

													</div>
												</div>
												<div className="btn-container full-w">
													<button className="btn bg-red center clear" type="submit" style={{"cursor":"pointer"}}><FontAwesomeIcon icon={faPlus} /> Valider</button>
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
							<p onClick={SigingAdminTwitch}>
								<i style={{"fontSize":"41px","textAlign":"center","cursor":"pointer"}} className="platform">
									<FontAwesomeIcon icon={faTwitch}/>
								</i>
							</p>
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
