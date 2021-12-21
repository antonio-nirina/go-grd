import React,{useState,useEffect} from "react"
import {useMutation,useQuery} from "@apollo/client"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from "react-hook-form"

import Header from "../header/header"
import Footer from "../footer/footer"
import Aside from "../assistance/aside"
import {Assist} from "../models/assist"
import "../../assets/css/style.css"
import "../assistance/assistance.css"
import {GET_ALL_ASSIST} from "../../gql/assist/query"
import "../../assets/css/style.css"
import "../assistance/assistance.css"
import {SAVED_SUPPORT} from "../../gql/support/mutation"


type Inputs = {
	firstname:string,
	lastname:string,
	content:string,
	email:string
}

const Contact: React.FC = function() {
	const [assists, setAssists] = useState<Assist[]>([])
	const [item, setItem] = useState<number>(0)
	const {loading,error,data} 	= useQuery(GET_ALL_ASSIST)
	const [savedSupport]  = useMutation(SAVED_SUPPORT)
	const { register, handleSubmit,setValue } = useForm<Inputs>()

	useEffect(() => {
		if(!loading && !error && data) {
			setAssists(data.FindAllAsist)
		}
	},[loading,error,data])

	const handleActive = function(item:number) {
		setItem(item)
	}

	const onSubmit = async function(data:Inputs){
		const createdSupport = await savedSupport({ variables: {
			firstname: data.firstname ? data.firstname : "",
			created:(new Date()).toISOString(),
			lastname:data.lastname ? data.lastname : "",
			content:data.content ? data.content : "",
			updated:(new Date()).toISOString(),
			email:data.email,
		} })

		if(createdSupport.data.createSupport) {
			setValue("firstname","")
			setValue("lastname","")
			setValue("content","")
			setValue("email","")
			toast("Votre demande à été envoyer")
		}
	}
  return(
	<div className="assistance">
		<div className="container">
			<Header/>
			<div className="main">
				<div className="block-center contact">
					<div className="search-container">
						<h2>Assistance</h2>
					</div>
					<ToastContainer position="bottom-left" />
					<div className="aside-menu accueil">
						<Aside
							handleList={handleActive}
							assists={assists}
						/>
					</div>
					<div className="support contact-support">
						<h3></h3>
						<div className="block-center">
							<div className="support auto-height contact-support">
								<div className="support-container">
									<div className="under-title">
										<p className="medium">Contactez-nous</p>
										<p className="light">Nous sommes à votre disposition pour répondre à vos questions</p>
									</div>
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="input-container side-by">
											<div className="input-group">
												<label htmlFor="name">Nom</label>
												<input type="text" placeholder="Votre nom" id="name" {...register("lastname")} name="lastname" />
											</div>
											<div className="input-group">
												<label htmlFor="lastname">Prénom</label>
												<input type="text" id="lastname" placeholder="Votre prénom" {...register("firstname")} name="firstname"/>
											</div>
										</div>
										<div className="input-container">
											<div className="input-container">
												<label htmlFor="email">Email</label>
												<input type="email" placeholder="Votre Email" {...register("email")} name="email" id="email"/>
											</div>
										</div>
										<div className="input-container">
											<div className="input-container">
												<label htmlFor="msg">Votre message</label>
												<textarea placeholder="Votre Message" id="msg" {...register("content")} name="content"></textarea>
											</div>
										</div>
										<div className="btn-container">
											<button className="btn bg-red">Envoyer</button>
										</div>
									</form>
								</div>
							</div>
	  					</div>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	</div>

  )
}

export default Contact;

