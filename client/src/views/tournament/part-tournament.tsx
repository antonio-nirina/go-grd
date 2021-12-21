import React,{useState,useEffect} from "react"
import {useMutation} from "@apollo/client"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from "react-loader-spinner"

import {LEAVE_PART_TOURNAMENT} from "../../gql/participate/mutation"
import {Tournament} from "../models/tournament"
import {ParticipateTournament} from "../models/participate"
import ContentPaiement from "../commons/contentPaiement"
import {checkInTeam} from "../league/utils"
import {RootState} from "../../reducer"
import { NameRoutes } from "../commons/route-list"
import PopupTeam,{TeamPopup} from "../commons/check-team"


export type PartTournamentType = {
	tournament:Tournament|undefined,
	parts:ParticipateTournament[]|undefined,
}


const PartTournament:React.FC<PartTournamentType> = function ({tournament,parts}) {
	const history = useHistory()
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
	const [isPart,setIsPart] = useState<boolean>(false)
	const [teamPart,setTeamPart] = useState<string>("")
	const [checkTeam,setCheckTeam] = useState<number>(0)
	const [partUid,setPartUid] = useState<string>("")
	const [partData,setPartData] = useState<string[]>([])
	const [showPaiement, setShowPaiement] = useState<boolean>(false)
	const[isOpen,setIsOpen] =useState<boolean>(false)
	const [content,setContent] = useState<string>("")
	const [isLoader, setIsLoader] = useState<boolean>(false)

	const [leavePartTournament]  = useMutation(LEAVE_PART_TOURNAMENT)

	useEffect(() => {
		if(tournament?.isTeam) {
			setTeamPart(`Equipes ${parts && parts?.length > 0 ? parts?.length : 0} / ${tournament.numberParticipate}`)
		} else if(tournament && !tournament?.isTeam) {
			setTeamPart(`${parts && parts?.length > 0 ? parts?.length : 0} / ${tournament.numberParticipate}`)
		}
		parts?.forEach(function(part:ParticipateTournament){
			if(part.user.uid === userConnectedRedux.user.uid) {
				setPartUid(part.uid)
				setIsPart(true)
			}
		})
		let arrayUser:string[] = []
		parts?.forEach(function(part:ParticipateTournament){
			if(tournament?.isTeam) {
				setIsPart(true)
				arrayUser.push(part.team.name)
			} else {
				arrayUser.push(part.user.username)
			}
		})

		if(parts && arrayUser.length < parts[0].tournament.numberParticipate){
			for (let index = arrayUser.length; index < parts[0].tournament.numberParticipate; index++) {
				arrayUser.push("Emplacement libre")
			}
		}
		setPartData(arrayUser)

	},[tournament,parts,userConnectedRedux])

	const onShowConfirmed = async function() {
		setIsLoader(true)
		const check = await checkInTeam(tournament?.uid,userConnectedRedux.user.uid)
		if(!check && tournament?.isTeam) {
			setIsLoader(false)
			setIsOpen(true)
			setContent("Vérifie que tu as une équipe")
		} else if(check  && tournament?.isTeam && check === 1) {
			setIsOpen(true)
			setIsLoader(false)
			setCheckTeam(1)
			setContent("Vérifie que tu as assez de membres")
		} else if(check  && tournament?.isTeam && check === 2) {
			setIsOpen(true)
			setCheckTeam(2)
			setIsLoader(false)
			setContent("Veuillez vérifier car tu appartient à une équipe qui participe à cette tournois.")
		} else {
			setIsLoader(false)
			history.push(`${NameRoutes.confirmedJoinTournament}?uid=${tournament?.uid}`)
		}
	}

	const handleClose = function() {
		setShowPaiement(false)
	}

	const handleLeave = async function() {
		const leave = await leavePartTournament({variables:{uid:partUid,userUid:userConnectedRedux.user.uid}})
		if(leave.data) {
			toast("Votre desincription a été effectué!")
		}
		setIsPart(false)
	}

	const handleTeam = async function() {
		setIsLoader(true)
		const check = await checkInTeam(tournament?.uid,userConnectedRedux.user.uid)
		if(!check && tournament?.isTeam) {
			setIsLoader(false)
			setIsOpen(true)
			setContent("Vérifie que tu as une équipe")
		} else if(check  && tournament?.isTeam && check === 1) {
			setIsLoader(false)
			setIsOpen(true)
			setCheckTeam(1)
			setContent("Vérifie que tu as assez de membres")
		} else if(check  && tournament?.isTeam && check === 2) {
			setIsLoader(false)
			setIsOpen(true)
			setCheckTeam(2)
			setContent("Veuillez vérifier car tu appartient à une équipe qui participe à cette tournois.")
		} else {
			setIsLoader(false)
			history.push(`${NameRoutes.confirmedJoinTournament}?uid=${tournament?.uid}`)
		}
	}

	const handlePopup = function(isclose:boolean) {
		setIsOpen(false)
	}

	const teamPopup:TeamPopup = {
		handleOpen:handlePopup,
		content:content,
		isShow:isOpen,
		checkTeam:checkTeam
	}

	return (
		<div className="item-info-right">
			<div className={isLoader ? "loader-spinner":"d-none"}>
				<Loader
					type="Oval"
					color="#dd0000"
				/>
			</div>
			<div className="join-all">
				<p className="team-bar-title">{teamPart}</p>
				<ToastContainer position="bottom-left" />
				{tournament && parseInt(tournament?.priceParticipate) ?
					<button className="btn bg-red" onClick={onShowConfirmed}>{!showPaiement && !isPart ? "Rejoindre" : (isPart ? "Quitter le tournois" : "Quitter")}</button>
					:
					(!isPart ?
						<span className="btn bg-red" onClick={handleTeam} >
							{!showPaiement && !isPart ? "Rejoindre" : "Quitter"}
						</span>
						:
						<button
							style={{"cursor":"pointer"}}
							className="btn bg-red"
							onClick={handleLeave}>Quitter le tournois
						</button>
					)
				}
				<div className="profil-join">
					{partData?.map(function(element:string,index:number){
						return (
							<p key={index}>{element}</p>
						)
					})}
				</div>
			</div>
			{isOpen ? <PopupTeam {...teamPopup} /> : <></>}
			<div className="join-all join-canal">
				<p className="team-bar-title">Rejoindre le canal discord</p>
				<button className="btn bg-red discolor">Rejoindre</button>
			</div>
			{showPaiement ? <ContentPaiement handleClosePayement={handleClose}  /> : <></>}
		</div>
	)
}

export default PartTournament
