import React, { useState, useEffect } from "react";
import "./Feature.css";
import FeatureMain from "./FeatureMain";
import Animation from "../Animation-Component/Animation";
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import Loader from '../Loader-Components/Loader'
import axios from "axios";
import { useDispatch } from "react-redux";
import {  GET_FEATURE_SEO_API } from "../Redux/constants";
import { GRAPHQL_API,  Feature_SEO_QUERY } from "../Api/Client";

function App() {

	//  Api Calls 
	var dispatch = useDispatch();


	useEffect(() => {
		const fetchFeatureSeoQuery = () => {
			axios
				.post(GRAPHQL_API, { query: Feature_SEO_QUERY })
				.then((res) => {
					if (res.status === 200) {
						dispatch({ type: GET_FEATURE_SEO_API, payload: res.data.data });
					}
				})
				.catch((error) => {
					console.log("error", error);
				});
		}
		fetchFeatureSeoQuery();
	}, [dispatch]);

	 Animation();
	const [FeaturesData, setFeaturesData] = useState();
	var ApiFeatureData = useSelector((record) => record.FeatureSeoReducer)
	useEffect(() => {
		async function fetchMyAPI() {
		if (ApiFeatureData.length !== 0){ 
			setFeaturesData(ApiFeatureData.page.seo)
		}
	}
	fetchMyAPI()
	}, [ApiFeatureData])
	return (

		<>
			 {FeaturesData !== undefined ? (
				<Helmet>
					<title>{FeaturesData.title}</title>
					<meta name="description" content={FeaturesData.metaDesc} />
					<meta name="keywords" content={FeaturesData.metaKeywords} />
					<meta property="og:description" content={FeaturesData.opengraphDescription} />
					<meta property="og:image" content={FeaturesData.opengraphImage} />
					<meta property="og:title" content={FeaturesData.opengraphTitle} />
					<meta property="og:type" content={FeaturesData.opengraphType} />
					<meta property="og:url" content={FeaturesData.opengraphUrl} />
					<meta property="og:description" content={FeaturesData.twitterDescription} />
					<meta property="og:image" content={FeaturesData.twitterImage.sourceUrl} />
					<meta property="og:title" content={FeaturesData.twitterTitle} />
				</Helmet>
			) : <Loader />
			} 
			<FeatureMain />
		</>
	);
}

export default App;