import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const PricingDetail = () => {

	// const history = useLocation();

     let [prices, setprices] = useState();
	 let [subTitle, setsubTitle] = useState();
	//  let [features, setfeatures] = useState();

     var ApiPricingData = useSelector((record) => record.PricingReducer)
    useEffect(() => {
	   async function fetchMyAPI() {
	      if (ApiPricingData.length !== 0){ 
		setsubTitle(ApiPricingData.page.pricingPage.subTitle)
		setprices(ApiPricingData.page.pricingPage.prices);
		// setfeatures(ApiPricingData.page.pricingPage.prices.features)
	  }
   }
     fetchMyAPI()
      }, [ApiPricingData])

	return (

		<section className="affordable-pricing pricing-title-bar">
			<div className="inner-wrap">
				<div className="pircing-info">
					<div className="pricing-before fade-me ">
						<img
							src={require("../assets/images/rectangle-03.svg").default}
							alt="dummy"
						/>
					</div>
					<div className="pricing-head">
						<h1>Pricing</h1>
						<div className="pricing-desc">
							<p>{subTitle}</p>
						</div>
					</div>
					<div className="pricing-after fade-me ">
						<img
							src={require("../assets/images/rectangle-01.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
				<div className="pricing-packages">
					<div className="packages-before fade-me">
						<svg viewBox="0 0 500.73 501.139">
							<g
								id="Group_368"
								data-name="Group 368"
								transform="translate(-33.635 -2986.86)"
							>
								<path
									id="Rectangle_322"
									data-name="Rectangle 322"
									d="M130,0h4.161a116,116,0,0,1,116,116V250.161a0,0,0,0,1,0,0H118a118,118,0,0,1-118-118V130A130,130,0,0,1,130,0Z"
									transform="translate(284.204 3237.838) rotate(90)"
									fill="#fdb400"
								/>
								<rect
									id="Rectangle_315"
									data-name="Rectangle 315"
									width="250.161"
									height="250.161"
									rx={125}
									transform="translate(284.204 3237.838)"
									fill="#fdb400"
									opacity="0.3"
								/>
								<path
									id="Path_122"
									data-name="Path 122"
									d="M0,0,250.569,250.569H0Z"
									transform="translate(33.635 2986.86)"
									fill="#ff5670"
								/>
							</g>
						</svg>
						{/* <img src={require('../assets/images/pricing-before.svg').default} alt="dummy"> */}
					</div>
					<div className="all-packages">
					{prices !== undefined
							? prices.map((item, index) => {	
								let externallink = item.buyNowCta.openInNewTab === true ? "_blank" : "";
					return (
						<div className="pricing-package" key={index}>
						<div className={"pricing-package " + item.highlighted}>
						<div className="pricing-package-top">
								<h3 className="h6">{item.title}</h3>
								<div className="package-info-head">
									<span className="price">
										<sup>{item.currency}</sup>{item.amount}<sub>{item.amountFraction}</sub>
									</span>
									<span className="duration">{item.renewal}</span>
								</div>
								<div className="package-btns">
									<a href={item.buyNowCta.link} target={externallink} className="btn-small">
									{item.buyNowCta.text}
									</a>
								</div>
							</div>
					
							<div className="package-details">
								<ul className="package-features">
								{item.features !== undefined
						         	? item.features.map((subitem, index) => {
	                       	return (
			                         <div key={index}>
									<li>{subitem.feature}</li>
									 </div>
									);
								}) :
							""} 
								</ul>	
							</div>
				
						</div>
					</div>
					); }) : 
					""} 
				</div></div>
			</div>
		</section>
	);
};

export default PricingDetail;
