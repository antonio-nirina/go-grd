import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import Loader from "react-loader-spinner"
import {useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery,useMutation} from "@apollo/client"
import { faPlus,faTrash,faCheck } from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_CMTY} from "../gql/cmty/query"
import {EDIT_STATUT_PUBLICATION,REMOVE_PUBLICATION} from "../gql/cmty/mutation"
import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import {NUMBER_PER_PAGE} from "../common/constante"

/*interface Item {
	item:number
}*/
type Stremings = {
    uid:string
    statut:string
    streaming:[{
        id:string
        videoId:string
        gameId:string
        title:string
        viewerCount:number
        createdAt:string
        creatorName:string
        thumbnailUrl:string
    }]
    game:{
        uid:string
        name:string
        box_art_url:string
    }
}

const ListCommunaute = function() {
	const history = useHistory()
    const [cmty, setCmty] = useState<Stremings[]>([])
    const [isLoader, setIsLoader] = useState<boolean>(true)
    // const [item, setItem] = useState<Item>({item:1})
    const {loading,error,data} 	= useQuery(GET_ALL_CMTY,{
        variables:{
            limit:NUMBER_PER_PAGE,
			pageNumber:1, //(item.item)*NUMBER_PER_PAGE - NUMBER_PER_PAGE
        }
    })

	const [updatedPub] = useMutation(EDIT_STATUT_PUBLICATION)
	const [removedPub]  = useMutation(REMOVE_PUBLICATION)

    useEffect(() => {
		if(!loading && !error && data) {
			setIsLoader(false)
			setCmty(data.FindAllCmty)
		}
	},[loading,error,data,isLoader])

	const handleStatut = async function(element:Stremings) {
		setIsLoader(true)
		const result = await updatedPub({ variables: {
			statut:!element.statut,
			uid:element.uid,
		} })
		if (result.data.EditStatutPublication) {
			setIsLoader(false)
			history.push("/admin/list/communaute")
		}
	}

	const handleRemoved = async function(element:Stremings) {
		setIsLoader(true)
		const result = await removedPub({ variables: {
			uid:element.uid,
		} })
		if (result.data.RemovePublication) {
			setIsLoader(false)
			history.push("/admin/list/communaute")
		}
	}

    return(
        <div className="layout-container">
			<SideBar />
			<div className="content-wrapper">
				<nav className="navbar">
          			<div></div>
                    <Nav />
        		</nav>
				<div className="main-content">
					<div className="body-content">
						<div className="column">
							<div className="create-game">
								<Link to="/admin/communaute">
									<button className="btn bg-red" style={{"cursor":"pointer"}}>
										<FontAwesomeIcon icon={faPlus} />
											Créer contenu
									</button>
								</Link>
							</div>
						</div>
						<div className={isLoader ? "loader-spinner":"d-none"}>
							<Loader
								type="Oval"
								color="#dd0000"
							/>
						</div>
						{
							cmty?.map(function(el:Stremings,index:number){
								return (
									<div key={index}>
										<div style={{"float":"right"}}>
										<button className="btn bg-green" style={{"cursor":"pointer"}} onClick={() => handleStatut(el)}>
												<FontAwesomeIcon icon={faCheck} />
												{el.statut? "Désactiver":"Activer"}
											</button>
											<span style={{"cursor":"pointer","marginLeft":"12px"}} onClick={() => handleRemoved(el)} ><i><FontAwesomeIcon icon={faTrash} /></i></span>
										</div>
										<div  style={{"border": "1px solid #d00","marginTop":"12px","clear":"both"}}>
											{el.streaming.map(function(ev:any) {
												return (<span className="grid league-board">
													<p>Title: {ev.title}</p>
													<p>Date: {ev.createdAt}</p>
													<p>Createur: {ev.creatorName}</p>
													<p>View: {ev.viewerCount}</p>
													<p>Game: {el.game.name}</p>
													<p>
														<img src={ev.thumbnailUrl} style={{"width":"100%"}} alt={ev.nameGame} />
													</p>
												</span>)
											})}
										</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		</div>
    )
}

export default ListCommunaute
