import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import group from "../../assets/images/group-61.svg";
import circle from "../../assets/images/group-03.svg";
import rectangle from "../../assets/images/rectangle-1.svg";
import { Link, } from "react-router-dom";




const Activedownloads = () => {

	//function wrapNumberInSpans (number) => {

	const wrapNumberInSpans = (number) => {
    	// console.log("🚀 ~ file: Activedownloads.js ~ line 14 ~ wrapNumberInSpans ~ number", typeof number)
		return number.replace(/\D/g,'').split('');
	}

	let [currentDownloads, setcurrentDownloads] = useState('');
	let [description, setdescription] = useState();
	let [title, settitle] = useState();
	let [image, setimage] = useState();

	var apiDownloadsData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		async function fetchMyAPI() {
			if (apiDownloadsData.length !== 0) {
				const  { currentDownloads, description, title, image } = apiDownloadsData.page.homePageMeta.downloadSection;
				setcurrentDownloads(currentDownloads);
				setdescription(description);
				settitle(title);
				setimage(image);
			}
		}
		fetchMyAPI();
	}, [apiDownloadsData]);

	return (
		<section className="active-downloads">
			<div className="inner-wrap">
				<div className="active-downloads-info">
					 <h2 dangerouslySetInnerHTML={{ __html: title }}>

					</h2> 
					 <div className="active-downloads-desc" dangerouslySetInnerHTML={{ __html: description }}>
				
					</div> 
					<div className="active-downloads-after fade-me">
						<img src={group} alt="dummy" />
					</div>
				</div>
				<div className="download-addon">
					<div className="download-addon-before fade-me ">
						<img src={circle} alt="dummy" />
					</div>
					<div className="download-btn">
					{ 	image !== undefined ? ( 
						 <Link to="/#">
							<img src={image.sourceUrl} alt={image.title} />
						</Link> 
						):""
					} 
					</div>
					<div className="total-downloads">

						{ wrapNumberInSpans(currentDownloads).map((num, index )=> {
							return (<span className="single-number" key={index}>{num}</span>)
						} ) } 
					
					</div>
					<div className="download-addon-after fade-me ">
						<img src={rectangle} alt="dummy" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Activedownloads;
