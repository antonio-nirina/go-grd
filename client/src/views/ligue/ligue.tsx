import React,{useEffect} from "react"


const Ligue: React.FC = function() {
	useEffect(() => {
		const params = window.location.search;
		if (window.opener) {
			console.log("params", params)
		   window.opener.postMessage(params)
		   window.close()
		}
	})

  return(
  	<>Ligue</>
  )
}

export default Ligue
