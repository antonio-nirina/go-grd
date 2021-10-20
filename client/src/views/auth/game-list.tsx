import React,{useEffect,useState,SyntheticEvent} from "react"
import { Link } from 'react-router-dom'
import {useQuery,useMutation} from "@apollo/client"
import { useSelector } from "react-redux"
import {useHistory } from "react-router-dom"

import { GET_ALL_GAMES,GET_ALL_PLATEFORM } from "../../gql/games/query"
import {UPDATED_USER_GAME} from "../../gql/user/mutation"
import {RootState} from "../../reducer"
import "../auth/inscription.css"
import "../../assets/css/style.css"
import {GameType} from "../models/game"

interface SelectImg {
	uid:string|unknown
}

interface SelectPlateform {
	uid:string
	description:string
	name:string
	logo:string
}


const GameList: React.FC = function() {
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [games,setGames] = useState<GameType[]>([])
	const [plateforms,setPlateforms] = useState<SelectPlateform[]>([])
	const [selected, setSelected] = useState<SelectImg>({uid:""})
	const [selectedPl, setSelectedPl] = useState<SelectImg>({uid:""})
	const [gamesSelected,setGamesSelected] = useState<string[]>([])
	const [plateformSelected,setPlateformSelected] = useState<string[]>([])
	const {loading,error,data} 	= useQuery(GET_ALL_GAMES)
	const {loading:ldg,error:err,data:plateformsData} 	= useQuery(GET_ALL_PLATEFORM)
	const [updatedUserGame] = useMutation(UPDATED_USER_GAME)

	useEffect(() => {
		if(!loading && !error && data) {
			setGames(data.FindAllGame)
		}

		if(!ldg && !err && plateformsData) {
			setPlateforms(plateformsData.FindAllPlateform)
		}
	},[loading,error,data,ldg,err,plateformsData])

	const onSelected = function(event:SyntheticEvent){
		const element = event.currentTarget.getAttribute("data-uid")
		setSelected({uid:element?.valueOf()})
		if(element) setGamesSelected([...gamesSelected,element.valueOf()])
	}

	const onSelectedPlateform = function(event:SyntheticEvent) {
		const elementPlat = event.currentTarget.getAttribute("data-uid")
		setSelectedPl({uid:elementPlat?.valueOf()})
		if(elementPlat) setPlateformSelected([...plateformSelected,elementPlat.valueOf()])
	}

	const sendGamePlateform = async function() {

		const result = await updatedUserGame({ variables: {
			games:games,
			plateforms:plateforms,
			uidUser:userConnectedRedux.user.uid,
		} })
		if (result.data.createdPlateform) {
			history.push("/account")
		}
	}
  	return(
		<div>
			<div className="favorite">
				<div className="game-list-container">
					<p>1. Choisis tes jeux favoris</p>
					<div className="favorite-game" >
						{games.map(function(e:GameType,index:number){
							return(
								<Link to ="#" key={index} data-uid={e.uid} onClick={onSelected} className={selected.uid !== e.uid  ? "" : "selected"}>
									<img src={e.image} alt={e.slug} width="200"/>
								</Link>
							)
						})}
					</div>
				</div>
				<div className="platform">
					<p>2. Choisis la plateforme sur laquelle tu veux jouer</p>
					<div className="platform-content">
						{plateforms.map(function(el:SelectPlateform,index:number){
							return (
								<Link to ="#" key={index} data-uid={el.uid} onClick={onSelectedPlateform} className={selectedPl.uid !== el.uid  ? "" : "selected"}>
									<img src={el.logo} alt="playstation" width="200" />
								</Link>
							)
						})}
					</div>
				</div>
			</div>
			<div className="infos-text">
				<p>Ne t'inquiète pas, tu pourras mettre à jour cette liste après ton inscription</p>
				<p className="submit-btn">
					<Link to="#" onClick={sendGamePlateform}>Valider mes choix</Link>
				</p>
			</div>
		</div>
	)
}

export default GameList;
