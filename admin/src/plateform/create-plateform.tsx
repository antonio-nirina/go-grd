import React,{useState} from "react"
import { Link } from "react-router-dom"
import {useMutation} from "@apollo/client"
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form"
import {useHistory } from "react-router-dom"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {CREATE_PLATEFORM} from "../gql/games/mutation"
import { InputFiles } from "typescript"

type Inputs = {
	name:string,
	description:string
}

const CreatePlateform: React.FC = function() {
	const history = useHistory()
	const [logoType, setLogoType] 	= useState<string>("")
	const [logo, setLogo] 	= useState<string>("")

	const { register, handleSubmit } 	= useForm<Inputs>()
	const [createdPlateform] = useMutation(CREATE_PLATEFORM)

	const onSubmit = async function(data:Inputs){
		const result = await createdPlateform({ variables: {
			name:data.name,
			description:data.description ? data.description : "",
			logo:logo,
			typeLogo:logoType,
		} })
		if (result.data.createdPlateform) {
			history.push("/admin/list-plateform")
		}
	}

	const handleUpload = function(e:any) {
		const reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
        reader.onload = function(params) {
        	let file = typeof reader.result === "string" ? reader.result?.replace(/^data:(.*?);base64,/, "") : ""
			file = file.replace(/ /g, '+')
			setLogo(file)
			setLogoType((e.target.files[0].type).split("/")[1])
        }
	}

	return (
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
	                                <h1>Crée plateforme de jeux</h1>
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
		                                            </div>
		                                            <div className="input-group">
		                                                <input type="file" onChange={(e)=>{handleUpload(e)}} id="logo-game" />
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

export default CreatePlateform
