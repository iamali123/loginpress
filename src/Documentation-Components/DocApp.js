
import "./Doc.css";
import Faq from "../Home-Components/Faq/Faq";
import DocHero from "../Documentation-Components/Dochero";
import DocListBox from "../Documentation-Components/DocListBox";
import Animation from "../Animation-Component/Animation";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

function App() {
	Animation();
	const [seoData, setseoData] = useState();
	var apiseoData = useSelector((record) => record.apiReducer);

	useEffect(() => {
		async function fetchMyAPI() {
			if (apiseoData.length !== 0) {
				setseoData(apiseoData.acfOptionsArchiveSeo.archiveSeo.documentation);
			}
		}
		fetchMyAPI()
	}, [apiseoData]);

	
	return (
		<>
 { 	seoData !== undefined ? ( 
	  <Helmet>
	<title>{seoData.title}</title>
	<meta name="description" content={seoData.metaDesc} />
	<meta  name="keywords" content={seoData.metaKeywords} />
	<meta  property="og:description" content={seoData.opengraphDescription} />
	<meta  property="og:image" content={seoData.opengraphImage} />
	<meta  property="og:title" content={seoData.opengraphTitle} />
	<meta  property="og:type" content={seoData.opengraphType} />
	<meta  property="og:url" content={seoData.opengraphUrl} />
	<meta  property="og:description" content={seoData.twitterDescription} />
	{/* <meta  property="og:image"  content={seoData.twitterImage.sourceUrl} /> */}
	<meta  property="og:title" content={seoData.twitterTitle} />
	</Helmet>   
	)  : ""
	} 
			<DocHero />
			<DocListBox />
			<Faq />
		</>
	);
}

export default App;
