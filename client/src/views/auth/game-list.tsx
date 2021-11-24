import React,{useEffect,useState,SyntheticEvent} from "react"
import { Link,useHistory } from 'react-router-dom'
import {useQuery,useMutation} from "@apollo/client"
import { useSelector } from "react-redux"
import Loader from "react-loader-spinner"

import { GET_ALL_GAMES,GET_ALL_PLATEFORM } from "../../gql/games/query"
import {UPDATED_USER_GAME} from "../../gql/user/mutation"
import {RootState} from "../../reducer"
import "../auth/inscription.css"
import "../../assets/css/style.css"
import {GameType} from "../models/game"
import { NameRoutes } from "../commons/route-list"
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SelectPlateform {
	uid:string
	description:string
	name:string
	logo:string
}

interface SelectImg {
	uid:string
}


const GameList: React.FC = function() {
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [games,setGames] = useState<GameType[]>([])
	const [plateforms,setPlateforms] = useState<SelectPlateform[]>([])
	const [selected, setSelected] = useState<string[]>([])
	const [selectedPl, setSelectedPl] = useState<string[]>([])
	const [gamesSelected,setGamesSelected] = useState<string[]>([])
	const [plateformSelected,setPlateformSelected] = useState<string[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_GAMES)
	const {loading:ldg,error:err,data:plateformsData} 	= useQuery(GET_ALL_PLATEFORM)
	const [isLoader, setIsLoader] = useState<boolean>(true)
	const [updatedUserGame] = useMutation(UPDATED_USER_GAME)

	useEffect(() => {
		if(!loading && !error && data) {
			setIsLoader(false)
			setGames(data.FindAllGame)
		}

		if(!ldg && !err && plateformsData) {
			setPlateforms(plateformsData.FindAllPlateform)
		}
	},[loading,error,data,ldg,err,plateformsData])

	const onSelected = function(event:SyntheticEvent){
		const element = event.currentTarget.getAttribute("data-uid")
		if(element) {
			if(selected.length > 0 && selected.includes(element.valueOf())) {
				let arrayUid:string[] = []
				selected.forEach(function(e:string,index:number) {
					if(e !== element.valueOf()) {
						arrayUid.push(e)
					}
				})
				setSelected(arrayUid)
				setGamesSelected(arrayUid)
			} else {
				setSelected([...selected,element.valueOf()])
				setGamesSelected([...gamesSelected,element.valueOf()])
			}
		}
	}

	const onSelectedPlateform = function(event:SyntheticEvent) {
		const elementPlat = event.currentTarget.getAttribute("data-uid")

		if(elementPlat) {
			if(selectedPl.length > 0 && selectedPl.includes(elementPlat.valueOf())) {
				let arrayUidPl:string[] = []
				selectedPl.forEach(function(e:string,index:number) {
					if(e !== elementPlat.valueOf()) {
						arrayUidPl.push(e)
					}
				})
				setSelectedPl(arrayUidPl)
				setPlateformSelected(arrayUidPl)
			} else {
				setSelectedPl([...selectedPl,elementPlat.valueOf()])
				setPlateformSelected([...plateformSelected,elementPlat.valueOf()])
			}
		}
	}

	const sendGamePlateform = async function() {
		let arrayGames:SelectImg[] = []
		let arrayPlateformes:SelectImg[] = []
		gamesSelected.forEach(function(gselected:string){
			arrayGames.push({
				uid:gselected
			})
		})
		plateformSelected.forEach(function(plselected:string){
			arrayPlateformes.push({
				uid:plselected
			})
		})
		const result = await updatedUserGame({ variables: {
			games:arrayGames,
			plateforms:arrayPlateformes,
			uidUser:userConnectedRedux.user.uid,
		} })
		if (result.data.updatedGameUser && history.location.pathname === NameRoutes.game) {
			history.push(NameRoutes.accountRegister)
		} else {
			history.push(NameRoutes.mygames)
		}
	}
  	return(
		<div>
			<div className="favorite">
				<div className="game-list-container">
				{history.location.pathname === "/game" ? <p>1. Choisis tes jeux favoris</p> : ""}

					<div className="favorite-game" >
					<div className={isLoader ? "loader-spinner":"d-none"}>
						<Loader
							type="Oval"
							color="#dd0000"
						/>
					</div>
						{games.map(function(e:GameType,index:number){
							return(
								<Link to ="#" key={index} data-uid={e.uid} onClick={onSelected} className={selected.includes(e.uid) ? "selected" : ""}>
									<img src={e.image} alt={e.slug} width="200"/>
									<i className={selected.includes(e.uid) ? "checked" : "notVisible"}><FontAwesomeIcon icon={faCheckCircle} /></i>
								</Link>
							)
						})}
					</div>
				</div>
				<div className="platform">
				{history.location.pathname === "/game" ? <p>2. Choisis la plateforme sur laquelle tu veux jouer</p> : ""}
					<div className="platform-content">
						{plateforms.map(function(el:SelectPlateform,index:number){
							return (
								<Link to ="#" key={index} data-uid={el.uid} onClick={onSelectedPlateform} className={selectedPl.includes(el.uid) ? "selected" : ""}>
									<img src={el.logo} alt="playstation" width="200" />
									<i className={selectedPl.includes(el.uid) ? "checked" : "notVisible"}><FontAwesomeIcon icon={faCheckCircle} /></i>
								</Link>
							)
						})}
					</div>
				</div>
			</div>
			<div className="infos-text">
				{history.location.pathname === "/game" ? <p>Ne t'inquiète pas, tu pourras mettre à jour cette liste après ton inscription</p> : ""}
				<p className="submit-btn">
					<Link to="#" onClick={sendGamePlateform}>Valider mes choix</Link>
				</p>
			</div>
		</div>
	)
}

export default GameList;
