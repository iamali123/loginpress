import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";



const Activebrands = () => {

	const [BrandsData, setBrandsData] = useState();
	var apiBrandsData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		async function fetchMyAPI() {
			if (apiBrandsData.length !== 0) {
				setBrandsData(apiBrandsData.page.homePageMeta.brandsSection);
			}
		}
		fetchMyAPI();
	}, [apiBrandsData]);


	return (
		<section className="active-brands">
			<div className="inner-wrap">
				<div className="brands-shapes-before fade-me ">
					<svg viewBox="0 0 188 376">
						<g
							id="Group_367"
							data-name="Group 367"
							transform="translate(240 -1116)"
						>
							<path
								id="Rectangle_316"
								data-name="Rectangle 316"
								d="M0,0H188a0,0,0,0,1,0,0V0A188,188,0,0,1,0,188H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
								transform="translate(-240 1116)"
								fill="#ffccd4"
							/>
							<path
								id="Rectangle_325"
								data-name="Rectangle 325"
								d="M0,0H188a0,0,0,0,1,0,0V0A188,188,0,0,1,0,188H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
								transform="translate(-240 1492) rotate(-90)"
								fill="#f6366a"
							/>
						</g>
					</svg>
					{/* <img src={require('../../assets/images/group-2.svg').default} alt="dummy"=""> */}
				</div>
				  <h2 className="h3" dangerouslySetInnerHTML={{ __html: BrandsData !== undefined ? BrandsData.title !== undefined ? BrandsData.title : null :null}}>
					
				</h2>  
				<div className="brands">
					<div className="brands-logos">
					 {BrandsData !== undefined
							? BrandsData.logos.map((item, index) => {
												return (
						<div className="single-brand" key={index}>
							<img src={item.image.sourceUrl} alt={item.image.title} />
						</div>
		 );
		}) : ""}  
					</div>
					<div className="brands-shapes-after fade-me">
						<img
							src={require("../../assets/images/rectangle-322.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Activebrands;
