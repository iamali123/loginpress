import "./HomeApp.css";
import Hero from "./Hero/Hero";
import Activebrands from "./ActiveBrands/Activebrands";
import Activedownloads from "./ActiveDownloads/Activedownloads";
import Topfeatures from "./TopFeatures/Topfeatures";
import Testimonials from "./Testimonials/Testimonials";
import Faq from "./Faq/Faq";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Animation from "../Animation-Component/Animation";
import { Helmet } from "react-helmet";
import Pricing from './Pricing/Pricing';

function HomeApp() {
	Animation();
const [HomeData, setHomeData] = useState();
var apiHomeData = useSelector((record) => record.apiReducer);
useEffect(() => {
	async function fetchMyAPI() {
		if (apiHomeData.length !== 0) {
			setHomeData(apiHomeData.page.seo);
		}
	}
	fetchMyAPI();
}, [apiHomeData]);


	return (
		<>

{ 	HomeData !== undefined ? ( 
	  <Helmet>
	<title>{HomeData.title}</title>
	<meta name="description" content={HomeData.metaDesc} />
	<meta  name="keywords" content={HomeData.metaKeywords} />
	<meta  property="og:description" content={HomeData.opengraphDescription} />
	<meta  property="og:image" content={HomeData.opengraphImage} />
	<meta  property="og:title" content={HomeData.opengraphTitle} />
	<meta  property="og:type" content={HomeData.opengraphType} />
	<meta  property="og:url" content={HomeData.opengraphUrl} />
	<meta  property="og:description" content={HomeData.twitterDescription} />
	<meta  property="og:image"  content={HomeData.twitterImage.sourceUrl} />
	<meta  property="og:title" content={HomeData.twitterTitle} />
	</Helmet>   
	)  : ""
	}
			<Hero />
			<Activebrands />
			<Activedownloads />
			<Topfeatures />
			<Pricing />
			<Testimonials />
			<Faq />
		</>
	);
}

export default HomeApp;
