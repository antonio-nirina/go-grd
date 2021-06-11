import React from "react"
import { useSelector } from "react-redux"

import {Translation} from "../../lang/translation"
import {RootState} from "../../reducer"
import "../../assets/css/style.css"
import "../community/community.css"

import warzone from "../../assets/image/warzone-.png"
import rlchampionsip from "../../assets/image/rlchampionsip.png"
import thumbnail from "../../assets/image/video.png"
import promo from "../../assets/image/promo.png"

const Community: React.FC = function() {
	const userConnectedRedux = useSelector((state:RootState) => state.userConnected)
  return(
    <div className="community">
      <h2>
	  {
		Object.keys(userConnectedRedux.user).length > 0 ?
		Translation(userConnectedRedux.user.language).participHome.community
		:
		Translation("fr").participHome.community
	}
	  </h2>
      <div className="community-block">
        <div className="actuality">
          <h3>
		  {
				Object.keys(userConnectedRedux.user).length > 0 ?
				Translation(userConnectedRedux.user.language).participHome.actuality
				:
				Translation("fr").participHome.actuality
			}
		  </h3>
          <div className="artContent">
            <div className="article">
              <img src={warzone} alt="" />
              <div className="text">
                <p className="title">Warzone Patch 1.15.x</p>
                <p>
				{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).participHome.retrieve
					:
					Translation("fr").participHome.retrieve
				}
				</p>
                <a href="#">
					{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.see
						:
						Translation("fr").participHome.see
					}
				</a>
              </div>
            </div>
            <div className="article">
              <img src={rlchampionsip} alt="" />
              <div className="text">
                <p className="title">Résultats RLCS</p>
                <p>
				{
					Object.keys(userConnectedRedux.user).length > 0 ?
					Translation(userConnectedRedux.user.language).participHome.follow
					:
					Translation("fr").participHome.follow
				}
				</p>
                <a href="#">
					{
						Object.keys(userConnectedRedux.user).length > 0 ?
						Translation(userConnectedRedux.user.language).participHome.see
						:
						Translation("fr").participHome.see
					}
				</a>
              </div>
            </div>
          </div>
        </div>
        <div className="clip">
          <h3>
		   {
				Object.keys(userConnectedRedux.user).length > 0 ?
				Translation(userConnectedRedux.user.language).participHome.clipMonth
				:
				Translation("fr").participHome.clipMonth
			}
		  </h3>
          <div className="video">
            <video controls poster={thumbnail} width="477" height="268">
              <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
            </video>
          </div>
        </div>
        <div className="shop">
          <h3>
		  {
				Object.keys(userConnectedRedux.user).length > 0 ?
				Translation(userConnectedRedux.user.language).participHome.shop
				:
				Translation("fr").participHome.shop
			}
		  </h3>
          <div className="shop">
            <a href="#"><img src={promo} alt=""/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community
