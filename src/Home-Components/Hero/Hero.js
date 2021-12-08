import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Hero = () => {


	let [description, setdescription] = useState();
	let [title, settitle] = useState();
	let [features, setfeatures] = useState();
	let [goProCta, setgoProCta] = useState();
	let [videoCta, setvideoCta] = useState();
	let [bannerImage, setbannerImage] = useState();


	var apiHeroData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		async function fetchMyAPI() {
			if (apiHeroData.length !== 0) {
				const  { description, title, features, goProCta , videoCta,  bannerImage } = apiHeroData.page.homePageMeta.heroSection;
				setdescription(description);
				settitle(title);
				setfeatures(features);
				setgoProCta(goProCta);
				setvideoCta(videoCta);
				setbannerImage(bannerImage);
			}
		}
		fetchMyAPI();
	}, [apiHeroData]);

	return (
		<section className="hero-section">
			<div className="inner-wrap">
				<div className="title-bar">
					<div className="title-shapes-before fade-me ">
						<svg width={40} height={40} viewBox="0 0 40 40">
							<path
								id="Rectangle_322"
								data-name="Rectangle 322"
								d="M20.968,0h.323A18.71,18.71,0,0,1,40,18.71V40a0,0,0,0,1,0,0H19.032A19.032,19.032,0,0,1,0,20.968v0A20.968,20.968,0,0,1,20.968,0Z"
								fill="#3c50e0"
								opacity="0.3"
							/>
						</svg>
						{/* <img src={require('../../assets/images/rectangle-322.svg').default} alt="dummy"> */}
					</div>
					<div className="page-info">
						  <h1 dangerouslySetInnerHTML={{ __html: title }}>
							
						</h1>  
						<div className="page-info-desc">
							 <p >
				  {description}
							</p> 
						</div>
						<div className="get-btns">
					{ 	goProCta !== undefined ? ( 
							  <a href={goProCta.link} className="btn-large" target={goProCta.openInNewTab.toString()}>
							{goProCta.text}
							</a> 
					):""
					} 
					{ 	videoCta !== undefined ? ( 

							<button className="play-btn"
								onClick={(e) => {
									e.preventDefault();
									 var getLink = `${videoCta.videoLink}` ;
									document.querySelector("#lp-video").setAttribute("src", getLink);
									document.querySelector("html").classList.add("lp-video-play");
								}}
							>
								 <i className="fas fa-play" aria-hidden="true" /> {videoCta.text} 
							</button>
							):""
					}
						</div>
					</div>
					<div className="title-shapes-after fade-me ">
						<svg width={40} height={40} viewBox="0 0 40 40">
							<path
								id="Rectangle_316"
								data-name="Rectangle 316"
								d="M0,0H40a0,0,0,0,1,0,0V0A40,40,0,0,1,0,40H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
								fill="#fdb400"
								opacity="0.3"
							/>
						</svg>
						{/* <img src={require('../../assets/images/rectangle-316.svg').default} alt="dummy"> */}
					</div>
				</div>
				{/* Addon Features */}
				<div className="addon-features">
				{features !== undefined
							? features.map((item, index) => {
												return (
					<div className="single-feature" key={index}>
						<div className="feature-thumbnail">
							<img
								src={item.image.sourceUrl}
								alt="dummy"
							/>
						</div>
						<p>{item.title}</p>
					</div>
					);
		}) : ""}  
				</div>
				{/* Login Screen */}
				<div className="login-screen-bar">
					<div className="login-shapes-before fade-me ">
						<svg viewBox="0 0 283.431 566.431">
							<g
								id="Group_368"
								data-name="Group 368"
								transform="translate(-2914.999 -143)"
							>
								<path
									id="Path_122"
									data-name="Path 122"
									d="M0,0,283.215,283.215H0Z"
									transform="translate(2914.999 426.215) rotate(-90)"
									fill="#ff5670"
								/>
								<path
									id="Path_123"
									data-name="Path 123"
									d="M0,0,141.608,141.608H0Z"
									transform="translate(2914.999 284.607) rotate(-90)"
									fill="#ff5670"
									opacity="0.3"
								/>
								<path
									id="Rectangle_318"
									data-name="Rectangle 318"
									d="M0,0H141.5A141.5,141.5,0,0,1,283,141.5v0A141.5,141.5,0,0,1,141.5,283H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
									transform="translate(3198.43 709.431) rotate(-180)"
									fill="#3c50e0"
								/>
							</g>
						</svg>
						{/* <img src={require('../../assets/images/group-368.svg').default} alt="dummy"=""> */}
					</div>
					<div className="login-screen">	
					{ 	bannerImage !== undefined ? ( 
						 <img src={bannerImage.sourceUrl} alt={bannerImage.title} /> 
						 ):""
					} 
					</div>
					<div className="login-shapes-after fade-me ">
						<svg viewBox="0 0 232 463">
							<g
								id="Group_367"
								data-name="Group 367"
								transform="translate(-4194.43 -583)"
							>
								<path
									id="Path_124"
									data-name="Path 124"
									d="M0,0,232,232H0Z"
									transform="translate(4194.43 1046) rotate(-90)"
									fill="#ff5670"
									opacity="0.3"
								/>
								<path
									id="Rectangle_316"
									data-name="Rectangle 316"
									d="M0,0H232a0,0,0,0,1,0,0V0A232,232,0,0,1,0,232H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z"
									transform="translate(4194.43 815) rotate(-90)"
									fill="#fdb400"
								/>
							</g>
						</svg>
						{/* <img src={require('../../assets/images/group-367.svg').default} alt="dummy"> */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
