import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import Loader from "react-loader-spinner"
import {Tournament} from "../../models/tournament"
import {GET_ALL_TOURNAMENT} from "../../../gql/tournament/query"
import {dateStringToDY} from "../../tools/dateConvert"

const TournamentInc = function() {
	const history = useHistory()
	const [tournament, setTournament] = useState<Tournament[]>([])
	const [sumPrice, setSumPrice] = useState<number>(0)
	const [tournamentMonth, setTournamentMonth] = useState<number>(0)
	const [isLoader, setIsLoader] = useState<boolean>(false)
	const {loading,error,data} 	= useQuery(GET_ALL_TOURNAMENT, {
		variables: {
			limit:4,
			pageNumber:0
		},
	})

	useEffect(() => {

		if(!loading && !error && data) {
			let sum = 0
			let month = new Date().toLocaleDateString().split("/")[1]
			let count = 0
			data.FindAllTournament.forEach(function(tournament:Tournament) {
				if(new Date(tournament.dateStart).toLocaleDateString().split("/")[1] === month) {
					count++
				}
				tournament.price.forEach(function(price:string){
					sum = sum + parseInt(price)
				})
			})

			setSumPrice(sum)
			setTournamentMonth(count)
			setTournament(data.FindAllTournament)
		}

	},[loading,error,data])

	return (
		<>
			<div className="annonce undertitle">
				<div className={isLoader ? "loader-spinner":"d-none"}>
					<Loader
						type="Oval"
						color="#dd0000"
					/>
				</div>
				<h2>En ce moment {tournamentMonth > 0 ? '('+tournamentMonth+" tournois ce mois-ci"+')' : "Accun tournois pour l'instant"} </h2>
				<p>{tournamentMonth > 0 ? "Les prochains tournois à venir" : ""} </p>
			</div>
			<div className="tournament_wall">
			{
				tournament.length > 0 ?
					tournament.map(function(element:Tournament,index:number){
						return (
							<div className="list_tournament" key={index}>
								<Link to={`/join-tournament?uid=${element.uid}`} >
									<img src={element.game.logo} width="40" height="30" alt=""/>
									<p className="game_name">{element.title}<span>{dateStringToDY(element.dateStart)} - 6 jours</span></p>
									<p className="cashprize">Cashprize<span>{sumPrice} G-Coins</span></p>
									<p className="arena">{element.numberTeam > 0 ? `${element.numberTeam}v${element.numberTeam}`: "1v1"} Arène</p>
									<p className="place">
										<i><FontAwesomeIcon icon={faUsers}/></i><span>{element.numberParticipate} places restantes</span>
										<button style={{"cursor":"pointer"}} onClick={()=>{history.push(`/joingame?uid=${element.uid}`)}} className="btn bg-red">Rejoindre</button>
									</p>
								</Link>
							</div>
						)
					}) : <></>
			}
		</div>
		</>
	)
}

export default TournamentInc
