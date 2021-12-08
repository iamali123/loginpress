import "./AddOns.css";
import React, { useState, useEffect } from "react";
import MoneyBack from "./../Pricing-Components/MoneyBack";
import Pricing from "./../Home-Components/Pricing/Pricing";
import AddOns from "./AddOns";
import Animation from "../Animation-Component/Animation";
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import axios from "axios";
import { useDispatch } from "react-redux";
import {  GET_ADDONS_API} from "../Redux/constants";
import { GRAPHQL_API, ADDONS_QUERY } from "../Api/Client";
import Loader from "../Loader-Components/Loader";

function App() {

	Animation();

	var dispatch = useDispatch();

			useEffect(() => {
				const fetchAddonsQuery = () => {
					axios
						.post(GRAPHQL_API, { query: ADDONS_QUERY })
						.then((res) => {
							if (res.status === 200) {
								dispatch({ type: GET_ADDONS_API, payload: res.data.data });
							}
						})
						.catch((error) => {
							console.log("error", error);
						});
				}
				fetchAddonsQuery();
			},[dispatch]);


			const [AddOnsData, setAddOnsData] = useState();
			var ApiAddOnsData = useSelector((record) => record.AddonsReducer)
			useEffect(() => {
				async function fetchMyAPI() {
					if (ApiAddOnsData.length !== 0){ 
				setAddOnsData(ApiAddOnsData.page.seo)
					}
				}
				fetchMyAPI()
			}, [ApiAddOnsData])


return (
		<>
	{ 	AddOnsData !== undefined ? ( 
	  <Helmet>
	<title>{AddOnsData.title}</title>
	<meta name="description" content={AddOnsData.metaDesc} />
	<meta  name="keywords" content={AddOnsData.metaKeywords} />
	<meta  property="og:description" content={AddOnsData.opengraphDescription} />
	<meta  property="og:image" content={AddOnsData.opengraphImage} />
	<meta  property="og:title" content={AddOnsData.opengraphTitle} />
	<meta  property="og:type" content={AddOnsData.opengraphType} />
	<meta  property="og:url" content={AddOnsData.opengraphUrl} />
	<meta  property="og:description" content={AddOnsData.twitterDescription} />
	<meta  property="og:image"  content={AddOnsData.twitterImage} />
	<meta  property="og:title" content={AddOnsData.twitterTitle} />
	</Helmet>   
	)  : <Loader />
	}
			<AddOns />
			<Pricing />
			<MoneyBack />
	
		</>
	);
}

export default App;
