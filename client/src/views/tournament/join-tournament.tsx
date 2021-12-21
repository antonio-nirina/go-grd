import React,{useState,useEffect} from "react"
import {useQuery} from "@apollo/client"


import Header from "../header/header"
import Footer from "../footer/footer"
//import {Translation} from "../../lang/translation"
import {GET_PART_ONE_TOURNAMENT} from "../../gql/participate/query"
import "../../assets/css/style.css"
import "../tournament/tournament.css"
import "../waggers/waggers.css"
import "../participate/participate.css"
import Apex from "../../assets/image/apex-legends.png"
import Fifa21 from "../../assets/image/fifa21.png"
import Fortnite from "../../assets/image/fortnite.png"
import CodL from "../../assets/image/cod-coldwar.png"
import CodVanguard from "../../assets/image/cod-vanguard.png"
import Warzone from "../../assets/image/warzone.png"
import Rocketleague from "../../assets/image/rocketleague.png"
import Rainbowsix from "../../assets/image/rainbowsix.png"
import {dateStringToDHString} from "../tools/dateConvert"
import {Tournament,Platform} from "../models/tournament"
import {ParticipateTournament} from "../models/participate"
import PartTournament,{PartTournamentType} from "./part-tournament"
import HeaderTournament,{HeaderTournamentType} from "./common/headerTournament"


const Joingame: React.FC = function(props:any) {
  	const [tournament, setTournament] = useState<Tournament>()
	const [parts, setParts] = useState<ParticipateTournament[]>()

	const [plateform, setPlateform] = useState<string>("")
	const [sumPrice, setSumPrice] = useState<number>(0)
	const params = new URLSearchParams(props.location.search)
	const uid:string|null = params.get("uid")

	const {loading,error,data} 	= useQuery(GET_PART_ONE_TOURNAMENT, {
		variables: {
			uid:uid,
		},
	})

	useEffect(() => {
		if(!loading && !error && data) {
			let arrayPl:string[] = []
			let sum = 0
			setParts(data.FindTournamentParticipate)
			setTournament(data.FindTournamentParticipate[0].tournament)
			data.FindTournamentParticipate[0].tournament?.plateform.forEach(function(platef:Platform){
				arrayPl.push(platef.name)
			})
			data.FindTournamentParticipate[0].tournament.price.forEach(function(price:string){
				sum = sum + parseInt(price)
			})
			setSumPrice(sum)
			setPlateform(arrayPl.length > 0 ? arrayPl.join("/") : arrayPl[0])
		}

	},[loading,error,data])

	const HeaderProps:HeaderTournamentType = {
		data:tournament,
		isTournament:true,
		isWagger:false,
	}

	const partTournament:PartTournamentType = {
		tournament:tournament,
		parts:parts,
	}
  return(
  	<div className="container">
      	<Header />
      	<div className="participate league joingame general">
        <div style={{ backgroundImage: 'url(' + tournament?.game.image + ')', backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }} className="obj"></div>
        <div className="marg">
			<HeaderTournament {...HeaderProps} />
          	<div className="in-container">
          	<div className="information-game">
            <div className="item-info-left">
              	<div className="item-img-info">
                	<img src={tournament?.game.slug === "vanguard" ? CodVanguard : (tournament?.game.slug === "fortnite" ? Fortnite : (tournament?.game.slug ==="fifa21" ? Fifa21 : (tournament?.game.slug ==="ops" ? CodL : (tournament?.game.slug ==="warzone" ? Warzone : (tournament?.game.slug ==="rainbows" ? Rainbowsix : (tournament?.game.slug ==="apexlegends"?Apex:Rocketleague))))) )} alt=""/>
              	</div>
            	<div className="item-all-content">
                <div className="item-all-info">
                  	<p><span>Format</span></p>
                  	<p className="item-text-left">{tournament?.format}</p>
                  	<p><span>Début des inscriptions</span></p>
                  	<p>{dateStringToDHString(tournament?.dateStart).replace(","," -")}</p>
                </div>
                <div className="item-all-info">
                  	<p><span>Spectateurs</span></p>
                  	<p className="item-text-left">{tournament?.spectateur}</p>
                  	<p><span>Fin des inscriptions</span></p>
                  	<p>{dateStringToDHString(tournament?.deadlineDate).replace(","," -")}</p>
                </div>
                <div className="item-all-info">
                  	<p><span>Map(s)</span></p>
                  	<p className="item-text-left">Map(s)</p>
					{tournament?.laps.map(function(lap:string,index:number){
						return (
							<div key={index}>
								<p><span>Tour {index+1}</span></p>
								<p>{dateStringToDHString(lap).replace(","," -")}</p>
							</div>
						)
					})}
                </div>
                <div className="item-all-info">
                  <p><span>Serveur</span></p>
                  <p className="item-text-left">{tournament?.server}</p>
                </div>
                <div className="item-all-info">
                  <p><span>Console(s)</span></p>
                  <p>{plateform}</p>
                </div>
              </div>
            </div>
            <PartTournament {...partTournament} />
          </div>
          <div className="information-game">
            <div className="item-info-left apart">
              <div className="item-img-info"></div>
              <div className="item-all-content">
                <div className="item-all-info">
					<p><span>Frais d'entrée</span></p>
					<p className="item-text-left">Invitation</p>
					<p><span>Cash prize</span></p>
					<p>{sumPrice}</p>
                </div>
                <div className="item-all-info">
                  <p><span>Région</span></p>
                  <p className="item-text-left">{tournament?.region}</p>
          				{tournament?.price.map(function(price:string,index:number) {
          					return (
          						<div key={index}>
          							<p><span>Position {index+1}</span></p>
          							<p>{price} €</p>
          						</div>
          					)
          				})}
                </div>
                <div className="item-all-info">
                  <p><span>Tchat Vocal</span></p>
                  <p className="item-text-left">Discord</p>
                </div>
              </div>
            </div>

          </div>
          </div>
          <div className="clear"></div>
          	<Footer/>
		</div>
      </div>
  	</div>
  )
}

export default Joingame
