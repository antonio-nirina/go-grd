import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import {useQuery} from "@apollo/client"

import {Translation} from "../../../lang/translation"
import {RootState} from "../../../reducer"
import home from "../../../assets/image/gogrind-bg.jpg"
import Lead from "../../../assets/image/icons/king.png"
import TournamentInc from "./tournamentInc"
import {GET_ALL_BOARD,GET_ALL_BOARD_WEEK} from "../../../gql/leadboard/query"
import { LeadBoard } from "../../models/leadboard"
import "../../../assets/css/style.css"
import "../ahead/ahead.css"


const Ahead: React.FC = function() {
	const [leadBoard, setLeadBoard] = useState<LeadBoard[]>([])
	const [leadBoardWeek, setLeadBoardWeek] = useState<LeadBoard[]>([])
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const {loading,error,data} 	= useQuery(GET_ALL_BOARD)
	const {loading:ldgWeek,error:errWeek,data:dataWeek} 	= useQuery(GET_ALL_BOARD_WEEK)

	useEffect(() => {
		if(!loading && !error && data) {
			setLeadBoard(data.FindAllRate)
		}
		let arrayLead:LeadBoard[] = []
		if(!ldgWeek && !errWeek && dataWeek) {
			dataWeek.FindRateInWeek.forEach(function(lead:LeadBoard,index:number){
				const check = arrayLead.find((e:LeadBoard) => {return e.user.uid === lead.user.uid})
				if(check) {
					arrayLead.forEach((e:LeadBoard,i:number) => {
						if(e.user.uid === check.user.uid){
							arrayLead.splice(i,1,{user:e.user,score:e.score + lead.score})
						}
					})
				} else {arrayLead.push(lead)}
			})
			arrayLead.sort(function(a:LeadBoard,b:LeadBoard){
				return a.score - b.score
			})
			setLeadBoardWeek(arrayLead)
		}
	},[loading,error,data,ldgWeek,errWeek,dataWeek])

  return(
    <div className="ahead">
    	<img src={home} alt="Grid" className="Imgresp"/>
    	<div className = "full connected">
	    	<div className="Left">
	      		<div className="slogan">
	      			<h2 className="title">{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.plateform
						:
						Translation("fr").participHome.plateform
					}</h2>
					<p>Rejoins plus de 10 000 joueurs quotidien</p>
	      			<button className="btn bg-red">
					  {
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.run
						:
						Translation("fr").participHome.run
						}
					</button>
	      		</div>
      		</div>
      		<div className="Right">
				<TournamentInc />
				<div className="annonce undertitle">
				<h2>Les meilleurs joueurs de la saison</h2>
				<p>Saison 1</p>
				</div>
				<div className="best-gamer">
					<div className="global">
						<p>Classement mondial (Général)</p>
						<Link to="/leaderboard" className="best_content">
							{leadBoard ? leadBoard.map(function(lead:LeadBoard,index:number){
								 return (
									<div key={index}>
										<span className="first">{index + 1}</span>
										<span className="self">
											{index === 0 ? <img src={Lead} alt="#" width="15"/> : <></>}
										</span>
										<span className="middle">{lead.user.username}</span>
										<span>{lead.score} pts</span>
									</div>
								 )
								})
							:
							<></>
							}
						</Link>
					</div>
					<div className="global">
						<p>Classement de la semaine</p>
						<Link to="/leaderboard" className="best_content">
							{leadBoardWeek ? leadBoardWeek.map(function(lead:LeadBoard,index:number){
								 return (
									<div key={index}>
										<span className="first">{index + 1}</span>
										<span className="self">
											{index === 0 ? <img src={Lead} alt="#" width="15"/> : <></>}
										</span>
										<span className="middle">{lead.user.username}</span>
										<span>{lead.score} pts</span>
									</div>
								 )
								})
							:
							<></>
							}
						</Link>
					</div>
				</div>

      		</div>
      	</div>
    </div>
  );
}

export default Ahead
