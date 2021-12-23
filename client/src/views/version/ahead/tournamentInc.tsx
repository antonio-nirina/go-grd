import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {useHistory } from "react-router-dom"
import {useQuery} from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import Loader from "react-loader-spinner"
import Moment from "react-moment"
//import { useSelector } from "react-redux"

import {Tournament} from "../../models/tournament"
import {ParticipateTournamentAll} from "../../models/participate"
import { GET_TOURNAMENT_PART } from "../../../gql/participate/query"
import {dateStringToDY} from "../../tools/dateConvert"
//import {RootState} from "../../../reducer"
import {NameRoutes} from "../../commons/route-list"
import 'moment/locale/fr'


const TournamentInc: React.FC  = function() {
	const history = useHistory()
	const [tournament, setTournament] = useState<Tournament[]>([])
	const [tournamentMonth, setTournamentMonth] = useState<number>(0)
	const [isLoader, setIsLoader] = useState<boolean>(true)
	const [isOpen, setIsOpen] = useState<boolean>(true)

	// const [dateDiff,setDateDiff] = useState<string[]>([])
	const {loading,error,data} 	= useQuery(GET_TOURNAMENT_PART)

	useEffect(() => {
		if(!loading && !error && data) {
			let month = new Date().toLocaleDateString().split("/")[1]
			let count = 0
			let array:Tournament[] = []
			data.FindPartAllTournament.forEach(function(part:ParticipateTournamentAll) {
				array.push({
					uid:part.tournament.uid,
					title:part.tournament.title,
					statut:part.tournament.statut,
					description:part.tournament.description,
					numberParticipate:(part.tournament.numberParticipate - part.recordsPart),
					gameWay:part.tournament.gameWay,
					format:"",
					deadlineDate:part.tournament.deadlineDate,
					winners:[],
					tchat:"",
					dateStart:part.tournament.dateStart,
					price:part.tournament.price,
					priceParticipate:part.tournament.priceParticipate,
					rules:"",
					isTeam:part.tournament.isTeam,
					maps:"",
					laps:[],
					server:"",
					isPublic:part.tournament.isPublic,
					region:"",
					game:{
						uid:part.tournament.game.uid,
						name:part.tournament.game.name,
						image:part.tournament.game.image,
						logo:part.tournament.game.logo,
						slug:part.tournament.game.slug
					},
					plateform:[],
					spectateur:"",
				})
				if(new Date(part.tournament.dateStart).toLocaleDateString().split("/")[1] === month) {
					count++
				}
				const date1 = new Date()
				const date2 = new Date(part.tournament.deadlineDate)
				const diff = (date2.getTime() - date1.getTime())/1000/60
				if (diff < 10 || diff <= 0) setIsOpen(false)
			})
			setTournamentMonth(count)
			setTournament(array)
		}
		setIsLoader(false)
	},[loading,error,data])

	const FilterDiff = function(date:string) :string {
		if(Math.abs(parseInt(date)) >= 24) {
			const hours = Math.abs(parseInt(date))/24
			return hours > 1 ? Math.floor(hours)+" jours" : Math.floor(hours) + " jour"
		}

		return Math.abs(parseInt(date))+" heures"
	}

	const handleJoinMatch = function(element:Tournament) {
		history.push(`${NameRoutes.joingame}?uid=${element.uid}`)

	}

	return (
		<>
			<div className="annonce undertitle">
				<div className={isLoader ? "loader-spinner":"d-none"}>
					<Loader
						type="Oval"
						color="#dd0000"
					/>
				</div>
				<h2>En ce moment {tournamentMonth > 0 && isOpen ? `(${tournamentMonth} tournois ce mois-ci)`: "Accun tournois pour l'instant"} </h2>
				<p>{tournamentMonth > 0 && isOpen ? "Les prochains tournois à venir" : ""} </p>
			</div>
			<div className="tournament_wall">
			{
				tournament && tournament.length > 0 && isOpen ?
					tournament.map(function(element:Tournament,index:number){
						return (
							<div className="list_tournament" key={index}>
								<Link to={`${NameRoutes.joinTournament}?uid=${element.uid}`} >
									<img src={element.game.logo} width="40" height="30" alt=""/>
									<p className="game_name">{element.title}<span>{dateStringToDY(element.dateStart)} - {<Moment filter={FilterDiff}  diff={element.dateStart} locale={"fr"} unit="hours">{new Date()}</Moment>} </span></p>
									<p className="cashprize">Cashprize<span>{`${element.price.reduce((prev,cur)=>(parseInt(prev.toString())+parseInt(cur)),0)}`} G-Coins</span></p>
									<p className="arena">{element.gameWay} Arène</p>
									<p className="place">
										<i><FontAwesomeIcon icon={faUsers}/></i><span>{element.numberParticipate} places restantes</span>
										<button style={{"cursor":"pointer"}} onClick={()=>{handleJoinMatch(element)}} className="btn bg-red">{"Rejoindre"}</button>
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
