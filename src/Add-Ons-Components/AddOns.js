import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';



const AddOns = () => {

	const [AddOnsData, setAddOnsData] = useState();
var ApiAddOnsData = useSelector((record) => record.AddonsReducer)
useEffect(() => {
	async function fetchMyAPI() {
		if (ApiAddOnsData.length !== 0){ 
	setAddOnsData(ApiAddOnsData.page.addons)
		}
	}
	fetchMyAPI()
}, [ApiAddOnsData])


	return (
		<section className="feature">
			<div className="inner-wrap">
				<div className="feature-info">
					<div className="feature-before fade-me">
						<img
							src={require("../assets/images/faq-before.svg").default}
							alt="dummy"
						/>
					</div>
					<div className="feature-head">
					{AddOnsData !== undefined
							? ( 
						<h1>{AddOnsData.title}</h1>
							): "" }
							{AddOnsData !== undefined
							? ( 
							<div className="feature-desc" dangerouslySetInnerHTML={{ __html: AddOnsData.description }}>
						</div>
						): "" }
					</div>
					<div className="feature-after fade-me">
						<img
							src={require("../assets/images/faq-after.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
				<div className="all-features">

				{AddOnsData !== undefined
							? AddOnsData.addonDetails.map((item, index) => {
												return (
					<div className="single-feature-details" key={index}>
						<div className="single-feature-info">
							<h4>{item.name}</h4>
							<div className="single-feature-desc" dangerouslySetInnerHTML={{ __html: item.description }}>
						
							</div>
							<button className="play-btn"
								onClick={(e) => {
									e.preventDefault();
									var getLink = `${item.youtubeLink}`;
									document.querySelector("#lp-video").setAttribute("src", getLink);
									document.querySelector("html").classList.add("lp-video-play");
								}}
							>
								<i className="fas fa-play" aria-hidden="true" /> Watch Video Now
							</button>
						</div>
						<div className="single-feature-screens">
							<div className={"single-feature-before " + item.background.animationClass}>
								<img
									src={item.background.background.sourceUrl}
									alt="dummy"
								/>
							</div>
							<div className={"single-feature-thumbnail " + item.image.animationClass}>
								<img
									src={item.image.image.sourceUrl}
									alt={item.image.image.title}
								/>
							</div>
						</div>
					</div>
		 );
	}) : ""}  
				</div>
			</div>
		</section>
	);
};

export default AddOns;
