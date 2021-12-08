import Faq from '../Home-Components/Faq/Faq'
import Animation from "../Animation-Component/Animation";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Faqs = () => {
	Animation();

	const [FaqSeoData, setFaqSeoData] = useState();

	var apiFaqData = useSelector((record) => record.apiReducer);

	useEffect(() => {
		async function fetchMyAPI() {
			if (apiFaqData.length !== 0) {
				setFaqSeoData(apiFaqData.acfOptionsArchiveSeo.archiveSeo.faq);
			}
		}
		fetchMyAPI();
	}, [apiFaqData]);

	return (
		<>

{FaqSeoData !== undefined ? (
				<Helmet>
					<title>{FaqSeoData.title}</title>
					<meta name="description" content={FaqSeoData.metaDesc} />
					<meta name="keywords" content={FaqSeoData.metaKeywords} />
					<meta property="og:description" content={FaqSeoData.opengraphDescription} />
					<meta property="og:image" content={FaqSeoData.opengraphImage} />
					<meta property="og:title" content={FaqSeoData.opengraphTitle} />
					<meta property="og:type" content={FaqSeoData.opengraphType} />
					<meta property="og:url" content={FaqSeoData.opengraphUrl} />
					<meta property="og:description" content={FaqSeoData.twitterDescription} />
					{/* <meta property="og:image" content={FaqSeoData.twitterImage.sourceUrl} /> */}
					<meta property="og:title" content={FaqSeoData.twitterTitle} />
				</Helmet>
			) : ""
			} 
		<Faq />
		</>
	
	)
}

export default Faqs
