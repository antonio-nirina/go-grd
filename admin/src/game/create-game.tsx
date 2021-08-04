import React,{useState} from "react"
import { Link } from "react-router-dom"
import {useMutation} from "@apollo/client"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form"
import {useHistory } from "react-router-dom"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATE_GAME} from "../gql/games/mutation"


type Inputs = {
	name:string,
}

/*const MAX_WIDTH = 1600
const MAX_HEIGHT = 900
const MIN_WIDTH = 790
const MIN_HEIGHT = 445
*/

const CreateGame: React.FC = function() {
	const history = useHistory()
	const [image, setImage] = useState<string>("")
	const [logo, setLogo] 	= useState<string>("")

	//const [logoWidth, setLogoWidth] 	= useState<number>(0)
	//const [logoHeight, setLogoHeight] 	= useState<number>(0)
	//const [imgWidth, setImgWidth] 	= useState<number>(0)
	//const [imgHeigth, setHeigth] 	= useState<number>(0)

	const [imageType, setImageType] = useState<string>("")
	const [logoType, setLogoType] 	= useState<string>("")
	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdGame] = useMutation(CREATE_GAME)

	const onSubmit = async function(data:Inputs){
		const result = await createdGame({ variables: {
			name:data.name,
			image:image,
			logo:logo,
			notes:5,
			slug:((data.name).toLowerCase()).replace(" ",""),
			typeLogo:logoType,
			typeImage:imageType
		} })
		if (result.data.createdGame) {
			history.push("/admin/list-game")
		}
	}

	const handleUpload = function(e:any,type=false) {
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
        reader.onload = function(params) {
        	let file = typeof reader.result === "string" ? reader.result?.replace(/^data:(.*?);base64,/, "") : ""
			file = file.replace(/ /g, '+')
			if(type) {
				// setLogoWidth(0)
				// setLogoHeight(0)
				setLogo(file)
				setLogoType((e.target.files[0].type).split("/")[1])
			} else {
				//setImgWidth(0)
				//setHeigth(0)
				setImage(file)
				setImageType((e.target.files[0].type).split("/")[1])
			}
        }
	}	 

	return(
	    <div className="admin create-tournament">	    	
			<div className="layout-container">
				<SideBar />
				<div className="content-wrapper">
					<nav className="navbar">
	          			<div></div>
	      				<Nav />
	        		</nav>
	        		<div className="main-content">
	        			<div className="body-content">
	        				<div className="column-tournament">
	        					<div className="title">
	                                <h1>Crée jeux</h1>
	                            </div>
	                            <form onSubmit={handleSubmit(onSubmit)}>
		        					<div className="create-tournament-game">
		        						<Link to="/admin/list-game"><button className="btn bg-white"> Annuler</button></Link>
		                                <button type="submit" className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Enregistrer</button>
		        					</div>
		                            <div className="setting-tournament">
		                                <div className="field">
		                                    <div className="group-input">
		                                            <input type="text" {...register("name", { required: true })} placeholder="Nom du jeux" name="name" />
		                                            <div className="input-group">
		                                            	<label htmlFor="logo-game">Importer une image du logo</label>
		                                            	<label htmlFor="img-game">Importer une image du jeux</label>		                                            	
		                                            </div>
		                                            <div className="input-group">
		                                                <input type="file" onChange={(e)=>{handleUpload(e,true)}} id="logo-game" />
		                                                <input type="file" onChange={(e)=>{handleUpload(e)}} id="img-game" className="no-margin" />
		                                            </div>
		                                    </div>
		                                </div>
		                            </div>
		                        </form>
	        				</div>
	        			</div>
	        		</div>
				</div>
			</div>
	  	</div>
  )
}

export default CreateGame
