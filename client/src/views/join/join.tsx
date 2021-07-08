import React from "react"
import { useSelector } from "react-redux"

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../join/join.css"


const Join: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="join">
      <h2>
	  	{
			Object.keys(userConnectedRedux.user).length > 0 ?
			Translation(userConnectedRedux.user.language).participHome.joincomunity
			:
			Translation("fr").participHome.joincomunity
		}
	  </h2>
      <div className="email">
        <p><input
			type="text"
			placeholder={Object.keys(userConnectedRedux.user).length > 0 ? Translation(userConnectedRedux.user.language).participHome.yourmail : Translation("fr").participHome.yourmail}/>
		<>
		<button className="btn bg-red">
		{
			Object.keys(userConnectedRedux.user).length > 0 ?
			Translation(userConnectedRedux.user.language).participHome.createaccount
			:
			Translation("fr").participHome.createaccount
		}
		</button>
		</>
		</p>
      </div>
    </div>
  );
}

export default Join;
