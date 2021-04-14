import React from "react"
import { useForm } from "react-hook-form"

import {FR} from "../../lang/lang-fr"
import Header from "../header/header"
import "./assistant.css"

type Inputs = {
	name: string,
	firstname: string,
	email:string,
	message:string
  }

const Assistant: React.FC = function() {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
	const onSubmit = function(data:any){
		console.log(data)
	}
  return(
  	<div>
		  <Header />
		<div className="contact">
			{FR.assistant.contact}
		</div>
		<div className="contact-assist">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("name", { required: true })} />
				<input {...register("firstname", { required: true })} />
				<input {...register("email", { required: true })} />
				<textarea {...register("message")} rows={30} ></textarea>
				{errors.name && <span>This field is required</span>}
				<button>{FR.assistant.send}</button>
			</form>
		</div>
  	</div>
  )
}

export default Assistant
