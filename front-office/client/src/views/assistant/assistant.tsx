import React,{useState,useRef} from "react"
import { useForm } from "react-hook-form"
// import 'bootstrap/dist/css/bootstrap.min.css'

import {FR} from "../../lang/lang-fr"
import Header from "../header/header"
import "./assistant.css"

type Inputs = {
	name: string,
	firstname: string,
	email:string,
	message:string
}

const NAME_VALUE 		= 1
const FIRST_NAME_VALUE 	= 2
const EMAIL_VALUE 		= 3
const MESSAGE_VALUE 	= 4

const Assistant: React.FC = function() {
	const [emailLabel,setEmailLabel] = useState<string>("")
	const [nameLabel,setNameLabel] = useState<string>("")
	const [firstNameLabel,setFirstNameLabel] = useState<string>("")
	const [messageLabel,setMessageLabel] = useState<string>("")
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
	const lastnameChild = useRef(null)
    const firstNameChild = useRef(null)
	const emailChild = useRef(null)
	const messageChild = useRef(null)

	const onSubmit = function(data:any){
		console.log(data)
	}

	function handleFocus(e:number){
		if (e === NAME_VALUE) {
			setNameLabel("d-none")
		} else if(e === FIRST_NAME_VALUE) {
			setFirstNameLabel("d-none")
		} else if (e === EMAIL_VALUE) {
			setEmailLabel("d-none")
		} else if (e === MESSAGE_VALUE) {
			setMessageLabel("d-none")
		}
	}

	function handleBlur(e:number,id:string) {
		if (e === NAME_VALUE) {
			setNameLabel("")
		} else if(e === FIRST_NAME_VALUE) {
			setFirstNameLabel("")
		} else if (e === EMAIL_VALUE) {
			setEmailLabel("")
		} else if (e === MESSAGE_VALUE) {
			setMessageLabel("")
		}
	}

  return(
  	<div className="assist-main">
		<Header />
		<div className="contact-wrap">
			<div className="swrap"></div>
			<div className="contact-arround">
				<div className="contact">
					{FR.assistant.contact}
				</div>
				<div className="contact-assist">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="cnt-name block-info">
							<div className="wrap-name wrap-info">
								<span className={`focus-name ${nameLabel}`}>{FR.assistant.name}</span>
								<input id="lastname" className="lastname" onFocus={() => handleFocus(NAME_VALUE)} {...register("name", { required: true })} onBlur={() => handleBlur(1,"lastname")} ref={lastnameChild} name="lastname" />
							</div>
							<div>{errors.name && <span>This field is required</span>}</div>
							<div className="wrap-first-name wrap-info">
								<span className={`focus-first ${firstNameLabel}`}>{FR.assistant.firstname}</span>
								<input id="first-name" className="first-lastname" onFocus={() => handleFocus(FIRST_NAME_VALUE)} {...register("firstname", { required: true })} onBlur={() => handleBlur(2,"first-name")} ref={firstNameChild } name="first-name" />
							</div>
						</div>
						<div className="cnt-email wrap-info">
							<span className={`focus-email ${emailLabel}`}>{FR.assistant.email}</span>
							<input id="email" className="email" onFocus={() => handleFocus(EMAIL_VALUE)}  {...register("email", { required: true })} onBlur={() => handleBlur(3,"email")} ref={emailChild} name="email" />
						</div>
						<div className="cnt-message wrap-info">
							<span className={`focus-message ${messageLabel}`}>{FR.assistant.message}</span>
							<textarea
							 	id="message"
								className="message"
								onFocus={() => handleFocus(MESSAGE_VALUE)}
								{...register("message")} rows={30}
								onBlur={() => handleBlur(4,"message")}
								ref={messageChild}
								name="message"
							>
								</textarea>
						</div>
						<div className="btn-send">
							<button>{FR.assistant.send}</button>
						</div>
					</form>
				</div>
			</div>
			<div className="swrap"></div>
		</div>
  	</div>
  )
}

export default Assistant
