import React, { useState, useEffect } from "react";
import "./MoneyBack.css";
import { useSelector } from 'react-redux';

const MoneyBack = () => {

let [title, settitle] = useState();
let [subtext, setsubtext] = useState();
let [guaranteeCard, setguaranteeCard] = useState();
let [guaranteeCardImage, setguaranteeCardImage] = useState();
let [beforeImage1, setbeforeImage1] = useState();

var ApiMoneyBackData = useSelector((record) => record.MoneyBackReducer)
useEffect(() => {
   async function fetchMyAPI() {
	  if (ApiMoneyBackData.length !== 0){ 
		setguaranteeCardImage(ApiMoneyBackData.loginpressThemeSettings.loginpressGeneralSettings.guarantee.guaranteeCard.image);
		setbeforeImage1(ApiMoneyBackData.loginpressThemeSettings.loginpressGeneralSettings.guarantee.beforeImage.image);
		settitle(ApiMoneyBackData.loginpressThemeSettings.loginpressGeneralSettings.guarantee.title);
		setsubtext(ApiMoneyBackData.loginpressThemeSettings.loginpressGeneralSettings.guarantee.subtext);
		setguaranteeCard(ApiMoneyBackData.loginpressThemeSettings.loginpressGeneralSettings.guarantee.guaranteeCard);
  }
}
 fetchMyAPI()
  }, [ApiMoneyBackData])

	return (
		<section className="guarantee">
			<div className="inner-wrap">
				<div className="guarantee-info" dangerouslySetInnerHTML={{ __html: title }}>
				</div>
				<div className="guarantee-desc"  dangerouslySetInnerHTML={{ __html: subtext }}>
				</div>
				<div className="money-back-guarantee">
					<div className="money-back-before fade-me ">
						<svg viewBox="0 0 40 40">
							<path
								id="Rectangle_322"
								data-name="Rectangle 322"
								d="M20.968,0h.323A18.71,18.71,0,0,1,40,18.71V40a0,0,0,0,1,0,0H19.032A19.032,19.032,0,0,1,0,20.968v0A20.968,20.968,0,0,1,20.968,0Z"
								fill="#ff5670"
								opacity="0.3"
							/>
						</svg>
					</div>
					 <div className="money-back-details">
						<div className="money-back-thumbnail">
							 <img src={ guaranteeCardImage !== undefined ?  guaranteeCardImage.sourceUrl : ""}
								alt={  guaranteeCardImage !== undefined ? guaranteeCardImage.title : ""} />
						</div> 
					 <div className="money-back-info">
							<h4 dangerouslySetInnerHTML={{ __html:  guaranteeCard !== undefined ?  guaranteeCard.heading  : "" }}></h4>
							<div className="money-back-desc" dangerouslySetInnerHTML={{ __html: guaranteeCard !== undefined ? guaranteeCard.subtext : "" }}>
							</div>
						</div>
					</div> 
                	
					 <div className="money-back-after fade-me">
					<img 	src={ beforeImage1 !== undefined ? beforeImage1.sourceUrl : ""}
									alt={ beforeImage1 !== undefined ? beforeImage1.title : ""} /> 
					</div>  

				</div>
			</div>
		</section>
	);
};

export default MoneyBack;
