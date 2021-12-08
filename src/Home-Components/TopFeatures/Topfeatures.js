import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Topfeatures = () => {

	let [description, setdescription] = useState();
	let [title, settitle] = useState();
	let [features, setfeatures] = useState();

	var apiTopFeaturesData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		async function fetchMyAPI() {
			if (apiTopFeaturesData.length !== 0) {
				const  { description, title, features } = apiTopFeaturesData.page.homePageMeta.topFeaturesSection;
				setdescription(description);
				settitle(title);
				setfeatures(features);
			}
		}
		fetchMyAPI();
	}, [apiTopFeaturesData]);

	return (
		<section className="top-features" id="FeatureSection">
			<div className="inner-wrap">
				<div className="top-features-info">
					<div className="features-info-before fade-me">
						<img
							src={require("../../assets/images/rectangle-321.svg").default}
							alt="dummy"
						/>
					</div>
					<h2>{title}</h2>
					<div className="top-features-desc" dangerouslySetInnerHTML={{ __html: description }}>
						
					</div>
				</div>
				<div className="top-features-cards">
					<div className="features-cards-before fade-me">
						<img
							src={require("../../assets/images/path-121.svg").default}
							alt="dummy"
						/>
					</div>
					<div className="feature-posts">
	
					{features !== undefined
							? features.map((item, index) => {
												return (
						<div className="feature-card" key={index}>
							<div className="feature-card-thumbnail">
								<img
									src={item.image.sourceUrl}
									alt={item.image.title}
								/>
							</div>
							<div className="feature-card-body">
								<h3 className="h6">{item.title}</h3>
								<p>
									{item.description}
								</p>
							</div>
						</div>
						);
		}) : ""}  
					</div>
					<div className="features-cards-after fade-me">
						<img
							src={require("../../assets/images/rectangle-316.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Topfeatures;
