import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useQuery} from "@apollo/client"
import { faPlus, faSort,faEdit,faTrash } from "@fortawesome/free-solid-svg-icons"

import {GET_ALL_CMTY} from "../gql/cmty/query"
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
    const [cmty, setCmty] = useState<any[]>([])
    const [isLoader, setIsLoader] = useState<Boolean>(true)
    // const [item, setItem] = useState<Item>({item:1})
    const {loading,error,data} 	= useQuery(GET_ALL_CMTY,{
        variables:{
            limit:NUMBER_PER_PAGE,
			pageNumber:1, //(item.item)*NUMBER_PER_PAGE - NUMBER_PER_PAGE
        }
    })

    useEffect(() => {
		if(!loading && !error && data) {
            let array:any[] = []
			setIsLoader(false)
            data.FindAllCmty.forEach(function(e:Stremings){
                e.streaming.forEach(element => {
                    array.push({
                        uid:e.uid,
                        nameGame:e.game.name,
                        imageGame:e.game.box_art_url,
                        id:element.id,
                        videoId:element.videoId,
                        gameId:element.gameId,
                        title:element.title,
                        viewerCount:element.viewerCount,
                        createdAt:element.createdAt,
                        creatorName:element.creatorName,
                        thumbnailUrl:element.thumbnailUrl,

                    })
                });
            })
			console.log("data", data)
			console.log("array", array)
			setCmty(array)
		}
	},[loading,error,data,isLoader])

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
						<div className="auto-scroll">
							<div className="sm-width">
								<div className="body-card align-center">
									<div className="card-title">
										<p>Titre<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>Date création<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>Nombre de vues<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
                                    <div className="card-title">
										<p>Créateur<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
                                    <div className="card-title">
										<p>Nom du jeu<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
                                    <div className="card-title">
										<p>Video<i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
									</div>
									<div className="card-title">
										<p>
											Statut
											<i>
												<FontAwesomeIcon icon={faSort} size="lg"/>
											</i>
										</p>
									</div>
									<div className="card-title">
									</div>
								</div>
                                <div className={isLoader ? "loader-spinner":"d-none"}>
									<Loader
								        type="Oval"
								        color="#dd0000"
								    />
								</div>
								{
									cmty?.map(function(el:any,index:number){
										return (
											<div className="body-card" key={index} style={{"cursor":"pointer"}}>
												<div className="card-result align-center">
													<p>{el.title}</p>
												</div>
												<div className="card-result align-center">
													<p>{el.createdAt}</p>
												</div>
												<div className="card-result align-center">
													<p>{el.viewerCount}</p>
												</div>
                                                <div className="card-result align-center">
													<p>{el.creatorName}</p>
												</div>
                                                <div className="card-result align-center">
													<p>{el.nameGame}</p>
												</div>
                                                <div className="card-result align-center">
													<p>
														<img src={el.thumbnailUrl} alt="" />
													</p>
												</div>
												<div className="card-result align-center">
													<p>{el.statut?"Active":"Inactif"}</p>
												</div>
												<div className="card-result align-right">
													<>
														<Link to={`/admin/detail/${el.uid}`}><i><FontAwesomeIcon icon={faEdit} /></i></Link>
														<i><FontAwesomeIcon icon={faTrash} /></i>
													</>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

export default ListCommunaute