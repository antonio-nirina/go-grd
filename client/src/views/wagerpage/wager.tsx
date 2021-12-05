import React,{useState,useEffect} from "react"
import { Link } from 'react-router-dom'
import {useQuery} from "@apollo/client"

import Header from "../header/header"
import Footer from "../footer/footer"
import { GET_ALL_GAMES } from "../../gql/games/query"
import {GameType} from "../models/game"
import Joystick from "../../assets/image/white-joystick.png"
import { faUser} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../wagerpage/wager.css"
import "../../assets/css/style.css"
import {Wagger} from "../models/wagger"
import {LIMIT,PAGE_NUMBER} from "../commons/constante"
import {dateStringToDHStringEN} from "../tools/dateConvert"
import {GET_PART_ALL_USER_WAGGER} from "../../gql/participate/query"



const WagerPage: React.FC = function() {
	const [waggers, setWaggers] = useState<Wagger[]>([])
	const [games,setGames] = useState<GameType[]>([])

	const {loading:ldPart,error:errPart,data:dataPart} 	= useQuery(GET_PART_ALL_USER_WAGGER, {
		variables: {
			limit:LIMIT,
			pageNumber:PAGE_NUMBER
		},
	})
	const {loading,error,data} 	= useQuery(GET_ALL_GAMES)


	useEffect(() => {
		if(!loading && !error && data) {
			setGames(data.FindAllGame)
		}

		if(!ldPart && !errPart && dataPart) {
			if(dataPart && dataPart.FindAllPart > 0) {
				setWaggers(dataPart.FindAllPart)
			}
		}

	},[loading,error,data,ldPart,errPart,dataPart])
  return(
	<div className="wager">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="undertitle">
					<h2>Wagers</h2>
					<span>Derniers Wagers disponible</span>
				</div>
				<div className="containt">
					<p>Choisis ton jeux</p>
					<div className="favorite">
						<div className="game-list-container">
						<div className="favorite-game" >
								{games.map(function(e:GameType,index:number){
									return(
										<Link to ={`/waggers-game?game=${e.name}&slug=${e.slug}`} key={index}><img src={e.image} alt={e.slug} width="200"/></Link>
									)
								})}
						</div>
						</div>
					</div>
				</div>
				<div className="right-list">
				{waggers ? waggers.map(function(el:Wagger,index:number){
					return (
						<Link to ="#" key={index}>
							<div className="apex block">
								<div className="top-icon"><p className="legend">{el.title}</p><i className="iconGame">
									<img src={Joystick} alt="" width="15"/></i></div>
								<div className="info">
									<p className="price inblock"><i><FontAwesomeIcon icon={faUser}/></i><span></span></p>
									<p className="price inblock"><i className="sprite cup"></i><span>{el.price} Cash Prize</span></p>
									<p className="date inblock"><i className="sprite ticket"></i><span>{dateStringToDHStringEN(el.date)}</span></p>
								</div>
							</div>
						</Link>
					)
				})
				:
				<></>
				}

				</div>
			</div>
			<Footer/>
		</div>
	</div>

	);
}

export default WagerPage
