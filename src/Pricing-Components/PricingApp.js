import React, { useState, useEffect } from "react";
import "./Pricing.css";
import Faq from "../Home-Components/Faq/Faq";
import Testimonials from "../Home-Components/Testimonials/Testimonials";
import MoneyBack from "./MoneyBack";
import PricingDetail from "./PricingDetail";
import Animation from "../Animation-Component/Animation";
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import Loader from "../Loader-Components/Loader";


function App() {
	Animation();

const [seoData, setSeoData] = useState();
var ApiPricingData = useSelector((record) => record.PricingReducer)
useEffect(() => {
	async function fetchMyAPI() {
	if (ApiPricingData.length !== 0){ 
		setSeoData(ApiPricingData.page.seo)
	}
}
fetchMyAPI()
}, [ApiPricingData])

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
	<meta  property="og:image"  content={seoData.twitterImage} />
	<meta  property="og:title" content={seoData.twitterTitle} />
	</Helmet>   
	)  : <Loader />
	} 
			<PricingDetail />
			<MoneyBack />
			<Testimonials />
			<Faq /> 
		</>
	);
}

export default App;
