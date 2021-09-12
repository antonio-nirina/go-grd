import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom"
import {useQuery} from "@apollo/client"
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSort, faChevronUp, faChevronDown, faChevronRight, faChevronLeft, faSearch} from "@fortawesome/free-solid-svg-icons"

import SideBar from "../header/sidebar"
import Nav from "../header/nav"
import Pagination from "../common/pagination"
import {NUMBER_PER_PAGE} from "../common/constante"
import {GET_ALL_WAGER} from "../gql/wagger/query"

interface Item {
	item:number
}

const ListWagger : React.FC = function() {
	const [showList, setShowList] = useState<Boolean>(false)
	const [waggers, setWaggers] = useState<any>([])
	const [item, setItem] = useState<Item>({item:1})
	const [isLoader, setIsLoader] = useState<Boolean>(true)

	const {loading,error,data} 	= useQuery(GET_ALL_WAGER, {
		variables: {
			limit:NUMBER_PER_PAGE,
			pageNumber:(item.item)*NUMBER_PER_PAGE - NUMBER_PER_PAGE
		},
	})

	useEffect(() => {
		console.log(data)
		if(!loading && !error && data) {
			setIsLoader(false)
			setWaggers(data.FindAllWagger)
		}

	},[loading,error,data,isLoader])

    const onShow = function(){
		setShowList(!showList)
	}

	const handleItemsPage = function(item:number) {
		setIsLoader(true)
    	setItem({item:item})
    }

	return (
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
						<div className="response-filter">
							<div className="response-filter-search">
								<span className="ant-input-affix-wrapper">
									<span className="ant-input-prefix">
										<i><FontAwesomeIcon icon={faSearch} size="lg"/></i>
									</span>
									<input placeholder="Rechercher ..." type="text" className="ant-input" />
								</span>
							</div>
							<div className="response-filter-flag">
								<div className="response-status">
									<span>
										<label htmlFor="status">Statut :</label>
										<input placeholder="" type="text" className="ant-input" onClick={onShow} id="status"/>
										<i onClick={onShow}><FontAwesomeIcon icon={!showList ? faChevronUp : faChevronDown} size="lg"/></i>
									</span>

									<div className={!showList ? "hide-status" :"show-status"}>
										<p>Tous les status</p>
										<p>Actif</p>
										<p>Inactif</p>
									</div>
								</div>
							</div>
							<div className="response-filter-avis">
								<p><span>2</span> ligues dont <span>1 </span>actif</p>
							</div>
						</div>
						<div className="create-game">
							<Link to="/admin/create-wagger"><button className="btn bg-red"><FontAwesomeIcon icon={faPlus} /> Créer Wagger</button></Link>
						</div>
					</div>
					<div className={isLoader ? "loader-spinner":"d-none"}>
						<Loader
							type="Oval"
							color="#dd0000"
						/>
					</div>
					<div className="body-card">
						<div className="card-title">
							<p>Horraire <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
						<div className="card-title">
							<p>Rank <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
						<div className="card-title">
							<div className="card-title">
								<p>Inscription <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
							</div>
						</div>
						<div className="card-title">
							<div className="card-title">
							<p>Format <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
						</div>
						</div>
						<div className="card-title">
							<div className="card-title">
								<p>Mode de jeux <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
							</div>
						</div>
						<div className="card-title">
							<div className="card-title">
								<p>Entrée <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
							</div>
						</div>
						<div className="card-title">
							<div className="card-title">
								<p>Joueur <i><FontAwesomeIcon icon={faSort} size="lg"/></i></p>
							</div>
						</div>
					</div>
					<div className="body-card">
						<div className="card-result">
							<p>23 Jul - 12h30</p>
						</div>
						<div className="card-result">
							<p>Platine</p>
						</div>
						<div className="card-result">
							<p>30</p>
						</div>
						<div className="card-result">
							<p>B03</p>
						</div>
						<div className="card-result">
							<p>3v3 Arène</p>
						</div>
						<div className="card-result">
							<p>Public</p>
						</div>
						<div className="card-result">
							<p>6</p>
						</div>
					</div>
					<div className="filter-game-result">
					<Pagination
							handlePage={handleItemsPage}
							records={waggers.length > 0 ? waggers[0].records : 0}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default ListWagger
