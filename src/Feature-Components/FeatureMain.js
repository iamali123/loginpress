import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const FeatureMain = () => {

const [FeaturesData, setFeaturesData] = useState();
var ApiFeatureData = useSelector((record) => record.FeatureSeoReducer)
useEffect(() => {
	async function fetchMyAPI() {
	if (ApiFeatureData.length !== 0){ 
		setFeaturesData(ApiFeatureData.page.features)
	}
}
fetchMyAPI()
}, [ApiFeatureData])

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
						{FeaturesData !== undefined
							? (
								<h1>{FeaturesData.featureMainHeading}</h1>
							) : ""}
						{FeaturesData !== undefined
							? (
								<div className="feature-desc" dangerouslySetInnerHTML={{ __html: FeaturesData.featurePageSubtext }}>
								</div>
							) : ""}
					</div>
					<div className="feature-after fade-me">
						<img
							src={require("../assets/images/faq-after.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
				<div className="all-features">
					{FeaturesData !== undefined
						? FeaturesData.featureDetails.map((item, index) => {
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
										<div className={"single-feature-before " + item.beforeImage.animationClass}>
											<img
												src={item.beforeImage.image.sourceUrl}
												alt={item.beforeImage.image.title}
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

export default FeatureMain;